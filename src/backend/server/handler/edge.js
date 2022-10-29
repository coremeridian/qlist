import { default as Koa } from "koa";
import serverless from "serverless-http";
import { default as ssr } from "../routes/ssr";

const run = serverless(new Koa().use(ssr.routes()));

const setHeadersForCloudfront = (headers) => {
    for (const key in headers) {
        const modifiedKey = key
            .split("-")
            .map((val) => val[0].toUpperCase() + val.substring(1))
            .join("-");
        headers[key] = [{ key: modifiedKey, value: headers[key] }];
    }
    return headers;
};

export const handler = async (event, context) => {
    let result;
    try {
        result = await run(event, context);
    } catch (error) {
        console.log(error);
    } finally {
        const headers = setHeadersForCloudfront(result.headers);
        return {
            ...result,
            headers,
        };
    }
};
