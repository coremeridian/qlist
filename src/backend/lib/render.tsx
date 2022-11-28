import React from "react";
import * as Koa from "koa";
import Root from "@App";
import renderFromStream from "./renderStream";
import { StaticRouter } from "react-router-dom/server";
import { ServerStyleSheet } from "styled-components";
import { files } from "../config";
import { reduxPersistStore } from "./reduxPersist";
import { fetchAuthConfig } from "@App/config";
import { injectApplicationState } from "./helpers";
import type { ConfigReader } from "@App/config";

const { readFile } = require("fs/promises");
const redisClient = (async () =>
    await require("../server/db/redis/conn").connect("app-redis-access"))();

interface ApplicationState {
    markup: string;
    markupState?: string;
    dataState: { [key: string]: string };
    stylesheets: ServerStyleSheet;
    //    context: { [key: string]: string };
}

const configReader: ConfigReader = fetchAuthConfig(true);

const htmlFile = readFile(files.index, { encoding: "utf8" });
export const render = async (
    ctx: Koa.Context,
    Tree: React.FC
): Promise<String> => {
    let html;
    const markupStateKey = `page:${ctx.req.url}:${process.env.ETAG ?? "developement"
        }`;
    try {
        const cache = await redisClient;
        if (!(html = await cache.get(markupStateKey))) {
            const context = {};
            const stylesheets = new ServerStyleSheet();
            global.window = {} as Window & typeof globalThis;

            html = await htmlFile;
            const { store, preloadedState } = await reduxPersistStore(ctx);
            const markupState = await renderFromStream(
                stylesheets.collectStyles(
                    <Root
                        store={store}
                        configReader={configReader}
                        helmetContext={context}
                    >
                        <StaticRouter location={ctx.req.url ?? "/"}>
                            <Tree />
                        </StaticRouter>
                    </Root>
                )
            );

            html = injectApplicationState(ctx, {
                markup: html,
                dataState: preloadedState,
                markupState,
                stylesheets,
            });
            cache.setex(markupStateKey, html, 604800);
        }
    } catch (error) {
        console.error("Render Error:", error);
    } finally {
        return html;
    }
};

export type { ApplicationState };
export default render;
