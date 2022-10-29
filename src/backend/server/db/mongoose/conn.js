const mongoose = require("mongoose");

const isDevelopment = process.env.NODE_ENV !== "production";
const dbConstraint = "/?maxPoolSize=20&w=majority";

let conns = {};

module.exports.connect = async (model) => {
    let conn = conns[model];
    if (!conn) {
        try {
            let options = {
                useNewUrlParser: true,
                serverSelectionTimeoutMS: 5000,
            };
            const creds = await require("../../../lib/vaultAccess")
                .getCredentials;
            const cred =
                model === "blog"
                    ? creds.blog
                    : model === "pricings"
                        ? creds.tests
                        : {};
            const uri =
                ((options = {
                    user: cred.username,
                    pass: cred.password,
                    dbName: isDevelopment ? cred.devdb : cred.proddb,
                    ...options,
                }),
                    cred.database + dbConstraint);
            conn = await mongoose.createConnection(uri, options).asPromise();
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
            console.log("Mongo instantiation error:", error);
        }
    }

    return conn;
};
