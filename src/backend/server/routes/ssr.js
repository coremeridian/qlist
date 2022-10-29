const App = require("../../../App").default;
const render = require("../../lib/render").default;

const ssr = new require("@koa/router")();

ssr.get("/tests", async (ctx) => {
    ctx.body = await render(ctx, App);
});

module.exports = ssr.use(ssr.allowedMethods());
