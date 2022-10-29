import "core-js/stable";
import { default as Koa } from "koa";
import serverless from "serverless-http";
import { default as api } from "../routes/api";

const run = serverless(new Koa().use(api.routes()));

export const handler = async (event, context) => {
    let result;
    try {
        result = await run(event, context);
    } catch (error) {
        console.log(error);
    } finally {
        return result;
    }
};
