import { WebAppPolicy } from "../../lib/policies";

const path = require("path");
const mime = require("mime-types");

export const handler = async (event) => {
    const { request, response, config } = event.Records[0].cf;

    const mimeType = mime.contentType(path.extname(request.uri));
    const contentType = [
        {
            key: "Content-Type",
            value:
                mimeType ??
                response.headers["Content-Type"]["value"] ??
                "text/html",
        },
    ];

    response.headers = {
        ...response.headers,
        "cache-control": [
            { key: "Cache-Control", value: "public, max-age=604800" },
        ],
        "content-type": contentType,
        "content-security-policy": [
            {
                key: "Content-Security-Policy",
                value: WebAppPolicy.generateContentSecurityPolicy(
                    config.requestId
                ),
            },
        ],
        "strict-transport-security": [
            {
                key: "Strict-Transport-Security",
                value: "max-age=31536000; includeSubDomains; preload",
            },
        ],
        "x-content-type-options": [
            {
                key: "X-Content-Type-Options",
                value: "nosniff",
            },
        ],
        "x-frame-options": [{ key: "X-Frame-Options", value: "DENY" }],
        "x-xss-protection": [
            { key: "X-XSS-Protection", value: "1; mode=block" },
        ],
        "referrer-policy": [{ key: "Referrer-Policy", value: "same-origin" }],
    };

    return response;
};
