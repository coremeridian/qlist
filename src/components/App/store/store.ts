import { configureStore } from "@reduxjs/toolkit";
import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    persistCombineReducers,
    persistReducer,
} from "redux-persist";
import { CookieStorage } from "redux-persist-cookie-storage";
import logger from "redux-logger";
import Cookies from "js-cookie";
import rootReducer from "./reducers";
import { api } from "@features/api";
import * as mdw from "./middleware";
import { devToolsEnhancer } from "redux-devtools-extension";
import storage from "redux-persist/lib/storage";
import { Middleware } from "@reduxjs/toolkit";

export const persistConfig = {
    key: "root",
    storage: new CookieStorage(Cookies),
    whitelist: ["user"],
    version: 1,
    timeout: 1000,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const createStoreWithConfig = (
    config,
    apiMiddleware: Middleware = api.middleware
) =>
    configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) => {
            const middlewares = getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [
                        FLUSH,
                        REHYDRATE,
                        PAUSE,
                        PERSIST,
                        PURGE,
                        REGISTER,
                    ],
                },
            })
                .prepend(mdw.rtkQueryErrorHandler)
                .concat(apiMiddleware);
            if (process.env["NODE_ENV"].toLowerCase() === "development")
                middlewares.concat(logger);
            return middlewares;
        },
        devTools: devToolsEnhancer,
        ...config,
    });
export const store = createStoreWithConfig();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
