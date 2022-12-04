import { default as Koa } from "koa";
import serverless from "serverless-http";
import { default as ssr } from "../routes/ssr";

const originUrl = process.env.ORIGIN_SOURCE;

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

const getRedirect = (host, request) => {
    host = host.replace(/^www\./, "");
    const [_, dir] = host.split(".")[0].split("-");
    const entryPoint = dir ? `/${dir}` : "";

    request.origin = {
        domainName: originUrl,
        port: 80,
        protocol: "http",
        sslProtocols: ["TLSv1.1", "TLSV1.2"],
        path: entryPoint,
        readTimeout: 5,
        keepaliveTimeout: 5,
        customHeaders: {
            referer: [{ key: "referer", value: `http://${host}/` }],
        },
    };
    request.headers["host"] = [{ key: "host", value: originUrl }];
    return request;
};

export const handler = async (event, context) => {
    let result;
    const request = event.Records[0].cf.request;
    const host = request.headers.host[0].value;

    try {
        const tld = ".xyz/";
        if (
            host.match(tld) &&
            host.substring(host.indexOf(tld) + tld.length).length > 0
        ) {
            result = await run(event, context);
        } else {
            result = await getRedirect(host, request);
        }
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
