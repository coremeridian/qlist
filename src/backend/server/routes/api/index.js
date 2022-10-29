const cors = require("@koa/cors");
const path = require("path");

const api = new require("@koa/router")({ prefix: "/api" });

if (process.env.NODE_ENV !== "production") {
    api.use(require("./management").routes());
}

api.use(cors());
api.use(require("./blog").routes());
api.use(require("./payment").routes());

module.exports = api;
