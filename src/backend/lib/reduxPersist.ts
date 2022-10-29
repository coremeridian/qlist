import { getStoredState, persistReducer, persistStore } from "redux-persist";
import {
    CookieStorage,
    NodeCookiesWrapper,
} from "redux-persist-cookie-storage";
import { rootReducer, persistConfig, createStoreWithConfig } from "@App/store";
import { ssrApi } from "@features/api";
import * as Koa from "koa";

const completePersistStore = async (store): Promise<any> => {
    return new Promise((resolve) => {
        const persistor = persistStore(store, {}, () => {
            resolve(persistor);
        });
    });
};

export const reduxPersistStore = async (
    ctx: Koa.Context,
    callback: (() => Promise<any>) | undefined = undefined
) => {
    const config = {
        ...persistConfig,
        storage: new CookieStorage(new NodeCookiesWrapper(ctx.cookies)),
        stateReconciler(_, originalState) {
            console.log("state reconciler", originalState);
            return originalState;
        },
    };

    let storedState;
    try {
        storedState = await getStoredState(config);
    } catch (e) {
        storedState = {};
    }

    try {
        let preloadedState = {};
        if (callback) {
            preloadedState = await callback();
        }

        const persistedReducer = persistReducer(config, rootReducer);
        const combinedStates = { ...storedState, ...preloadedState };
        const store = createStoreWithConfig(
            {
                reducer: persistedReducer,
                preloadedState: combinedStates,
            },
            ssrApi.middleware
        );

        // send store dispatches to procure resources and then allow await to process
        await Promise.all(ssrApi.util.getRunningOperationPromises());

        const persistor = await completePersistStore(store);
        await persistor.flush();
        ctx.res.removeHeader("Set-Cookie");

        return {
            store,
            preloadedState: combinedStates,
        };
    } catch (error) {
        throw error;
    }
};
