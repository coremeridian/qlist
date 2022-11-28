import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "@App/AppRouter";
import Root from "@App";
import { createStoreWithConfig } from "@App/store";
import { fetchAuthConfig } from "@App/config";

let skeleton;
const rootContainer = document.getElementById("root");
const configReader = fetchAuthConfig();

if (module.hot) {
    module.hot.accept();
    createRoot(rootContainer).render(
        <React.StrictMode>
            <Root
                store={createStoreWithConfig({
                    preloadedState,
                })}
                configReader={configReader}
            >
                <BrowserRouter>
                    <AppRouter />
                </BrowserRouter>
            </Root>
        </React.StrictMode>
    );
} else {
    hydrateRoot(
        rootContainer,
        <React.StrictMode>
            <Root
                store={createStoreWithConfig({
                    preloadedState,
                })}
                configReader={configReader}
            >
                <BrowserRouter>
                    <AppRouter />
                </BrowserRouter>
            </Root>
        </React.StrictMode>
    );
}

if (process.env.NODE_ENV === "development") {
    const { worker } = require("./mocks/browser");
    worker.start({
        onUnhandledRequest: "bypass",
    });
}

const preloadedState = window.__PRELOADED_STATE__ ?? {};
delete window.__PRELOADED_STATE__;

export { skeleton };
