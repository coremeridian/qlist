const management = new require("@koa/router")({ prefix: "/management" });

let accessObject = {
    id: "hub",
    date_set: Date.now(),
    blog: "maintenance",
};

management
    .get("/access", (ctx) => {
        ctx.body = accessObject;
    })
    .post("/access", (ctx) => {
        accessObject = { ...accessObject, ...req.body.constraints };
        ctx.body = { success: "Update committed" };
    });

module.exports = management.use(management.allowedMethods());
