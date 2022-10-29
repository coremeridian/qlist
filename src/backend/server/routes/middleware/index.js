const path = require("path");
const serve = require("koa-static");
const Router = require("@koa/router");

const middleware = new Router();

if (process.env.NODE_ENV !== "development") {
    middleware.use(serve(path.join(__dirname, "../dist")));
}

module.exports = new Router()
    .use(middleware.routers)
    .use(middleware.allowedMethods);
