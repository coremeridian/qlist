require("dotenv").config({ path: "./src/backend/.env" });
const { default: app } = await import("../app");
const { default: api } = await import("../routes/api");
const { default: ssr } = await import("../routes/ssr");

const port = process.env.PORT || 3100;

export { app, api, ssr, port };
