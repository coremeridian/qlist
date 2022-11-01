import { Context } from "koa";
import { WebAppPolicy } from "./policies";
import { ServerStyleSheet } from "styled-components";
import type { ApplicationState } from "./render";

const setHeaders = (ctx: Context, reportOnly: boolean) => {
    ctx.set({
        "Cache-Control": "public, max-age=604800",
        [reportOnly
            ? "Content-Security-Policy-Report-Only"
            : "Content-Security-Policy"]: WebAppPolicy.generateContentSecurityPolicy(
                ctx.requestId
            ),
        "Strict-Transport-Security":
            "max-age=31536000; includeSubDomains; preload",
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
        "X-XSS-Protection": "1; mode=block",
        "Referrer-Policy": "same-origin",
    });
};

const injectApplicationState = (
    ctx: Context,
    components: ApplicationState
): string => {
    const { markup: html, markupState, dataState, stylesheets } = components;
    const modifiedHTML = html
        .replace("<title>App</title>", "<title>Qlist</title>")
        .replace(
            '<div id="root"></div>',
            `<div id="root">${markupState ?? ""}</div>`
        )
        .replaceAll("**CSP_NONCE**", ctx.requestId)
        .replace(
            "**PRELOADED_STATE**",
            JSON.stringify(dataState).replace(/</g, "\\u003c")
        )
        .replace("</head>", `${stylesheets.getStyleTags()}</head>`);

    /*if (helmetContext.helmet) {
       html.replace("<title>App</title>", context.helmet.title.toString())
       .replace("</head>", `${context.helmet.meta.toString()}</head>`)
       .replace("</head>", `${context.helmet.link.toString()}</head>`)
       .replace("</head>", `${context.helmet.script.toString()}</head>`)
       }*/
    return modifiedHTML;
};

const modifyHTMLResponse = (body: string): string => {
    return body;
};

export { setHeaders, injectApplicationState, modifyHTMLResponse };
