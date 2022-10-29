import React from "react";
import * as Koa from "koa";
import Root from "@App";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { ServerStyleSheet } from "styled-components";
import { files } from "../config";
import { reduxPersistStore } from "./reduxPersist";
import { fetchAuthConfig } from "@App/config";
import type { ConfigReader, ServerConfigReader } from "@App/config";

const { readFile } = require("fs/promises");

const configReader: ConfigReader = fetchAuthConfig(true);

const htmlFile = readFile(files.index, { encoding: "utf8" });
export const render = async (
    ctx: Koa.Context,
    Tree: React.FC
): Promise<String> => {
    let html;
    const context = {};
    const sheets = new ServerStyleSheet();

    try {
        html = await htmlFile;
        const { store, preloadedState } = await reduxPersistStore(ctx);
        const markup = renderToPipeableStream(
            sheets.collectStyles(
                <Root store={store} configReader={configReader}>
                    <StaticRouter location={ctx.req.url ?? "/"}>
                        <Tree />
                    </StaticRouter>
                </Root>
            )
        );

        html.replace('<div id="root"></div>', `<div id="root">${markup}</div>`);
        html.replace(
            "</script>",
            `</script><script>window.__PRELOADED_STATE__ = ${JSON.stringify(
                preloadedState
            ).replace(/</g, "\\u003c")}</script>`
        );
        if (context.helmet) {
            html.replace("<title>App</title>", context.helmet.title.toString())
                .replace("</head>", `${context.helmet.meta.toString()}</head>`)
                .replace("</head>", `${context.helmet.link.toString()}</head>`)
                .replace(
                    "</head>",
                    `${context.helmet.script.toString()}</head>`
                )
                .replace("</head>", `${sheets.getStyleTags()}</head>`);
        }
    } catch (error) {
        console.error("Render Error:", error);
    } finally {
        sheets.seal();
        return html;
    }
};

export default render;
