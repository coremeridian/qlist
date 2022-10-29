const Koa = require("koa").default;
const Router = require("@koa/router");
const send = require("koa-send");
const path = require("path");
const ssr = require("./routes/ssr");
const api = require("./routes/api");
const { setHeaders } = require("../lib/helpers");

const router = new Router();

router.use(ssr.routes());
router.use(api.routes());

const app = new Koa();

if (process.env.NODE_ENV !== "production") {
    app.use(async (ctx, next) => {
        const regex = /(.+)\.(.+)/;
        let file = "index.html";
        const result = ctx.path.match(regex);
        if (ctx.path === "/" || (result && (file = result[0].substring(1)))) {
            setHeaders(ctx, true);
            await send(ctx, file, {
                root: path.join(__dirname, "../dist"),
            });
        } else {
            await next();
        }
    });
}

app.use(router.routes());

module.exports = app;
