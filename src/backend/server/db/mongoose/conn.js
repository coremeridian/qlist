const mongoose = require("mongoose");

let conns = {};

const callWithRetry = async (call) => {
    let resp = null;
    for (let i = 0; i < 5; i++) {
        try {
            resp = await call();
            console.log("Call succeeded!");
            return resp;
        } catch (err) {
            console.log("Call failed: Retrying...");
            await new Promise((resolve) => setTimeout(resolve, 5000));
            if (i == 4) {
                throw err;
            }
        }
    }
};

module.exports.connect = async (model) => {
    let conn = conns[model];
    if (!conn) {
        try {
            const creds =
                await require("../../../lib/vaultAccess").getCredentials(
                    "mongodb"
                );
            const cred = {
                prodInstance: creds.prodInstance,
                devInstance: creds.devInstance,
                ...(model === "blog"
                    ? creds.blogdb
                    : model === "pricings"
                        ? creds.paymentdb
                        : {}),
            };

            console.log("Cred", cred);

            const url = new URL(cred.prodInstance);
            url.username = encodeURIComponent(cred.username);
            url.password = encodeURIComponent(cred.password);
            url.pathname = cred.name;
            url.search = url.search + "&w=majority";

            console.log(url);

            conn = await callWithRetry(() =>
                mongoose
                    .createConnection(url.href, {
                        useNewUrlParser: true,
                        useUnifiedTopology: true,
                    })
                    .asPromise()
            );
            conn.on(
                "error",
                console.error.bind(console, "MongoDB connection error:")
            );

            if (model === "blog") {
                model = require("./models/BlogPost");
            } else if (model === "pricings") {
                model = require("./models/StripePricings");
            }
            conn.model(model.name, model.schema);
            conns[model] = conn;
        } catch (error) {
            console.log(`Mongo instantiation error[${model}]:`, error);
        }
    }

    return conn;
};
