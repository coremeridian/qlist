import { Context } from "koa";
import { WebAppPolicy } from "./policies";

const setHeaders = (ctx: Context, reportOnly: boolean) => {
    ctx.set({
        "Cache-Control": "public, max-age=604800",
        [reportOnly
            ? "Content-Security-Policy-Report-Only"
            : "Content-Security-Policy"]:
            WebAppPolicy.generateContentSecurityPolicy(),
        "Strict-Transport-Security":
            "max-age=31536000; includeSubDomains; preload",
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
        "X-XSS-Protection": "1; mode=block",
        "Referrer-Policy": "same-origin",
    });
};

export { setHeaders };
