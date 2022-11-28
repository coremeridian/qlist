const { createClient } = require("redis");

const isDevelopment = process.env.NODE_ENV !== "production";

let conns = {};

module.exports.connect = async (model) => {
    let client = conns[model];
    try {
        if (isDevelopment) {
            client = createClient();
        } else if (!client) {
            const creds =
                await require("../../../lib/vaultAccess").getCredentials(model);
            conns[model] = createClient({
                url: creds.prodInstance,
                username: creds.username,
                password: creds.password,
            });
            client = conns[model];
        }
        client.on("error", (err) => console.log("Redis Client Error", err));
        console.log("Connecting to redis");
        await client.connect();
    } catch (error) {
        console.log(`Redis instantiation error[${model}]:`, error);
    }
    return client;
};
