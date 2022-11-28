const App = require("@App").default;
const render = require("../../lib/render").default;
const crypto = require("crypto");
const { setHeaders } = require("../../lib/helpers");

const ssr = new require("@koa/router")();

ssr.use(async (ctx, next) => {
    ctx.requestId = crypto
        .createHash("sha1")
        .update(crypto.randomUUID())
        .digest("base64");
    await next();
}).use(async (ctx, next) => {
    setHeaders(ctx);
    await next();
});

ssr.get("/(.*)", async (ctx) => {
    ctx.body = await render(ctx, App);
});

module.exports = ssr.use(ssr.allowedMethods());
