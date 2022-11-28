import { WebStorageStateStore, InMemoryWebStorage } from "oidc-client-ts";

const appConfig = {
    base: "https://qlist.coremeridian.xyz",
    auth: "https://auth.coremeridian.xyz/realms/Qlist",
    testsApi: "https://api.coremeridian.xyz/psychom",
};

const isProduction = process.env.NODE_ENV === "production";

type ConfigReader = {
    read: () => Promise<any>;
    fromServer: boolean;
};

const signInCallback = (user) => {
    globalThis?.window?.history.replaceState(
        {},
        document.title,
        window.location.pathname
    );
};

const authConfig = {
    authority: appConfig.auth,
    client_id: "Web",
    redirect_uri:
        (isProduction
            ? appConfig.base
            : module.hot
            ? process.env.HOTLOCALMAIN_URL
            : "http://localhost:3100") + "/tests",
    silent_redirect_uri:
        (isProduction
            ? appConfig.base
            : module.hot
            ? process.env.HOTLOCALMAIN_URL
            : "http://localhost:3100") + "/silent-check-sso.html",
    skipSigninCallback:
        globalThis?.window?.location.pathname !== "/tests" ?? null,
    onSigninCallback: signInCallback,
    loadUserInfo: true,
    userStore: new WebStorageStateStore({
        store: globalThis?.window?.localStorage ?? InMemoryWebStorage,
    }),
};

const fetchAuthConfig = (fromServer: boolean = false): ConfigReader => {
    let result;
    let status = "pending";
    let configPromise = new Promise((resolve) =>
        setTimeout(resolve(authConfig))
    );

    let suspender = configPromise.then(
        (r) => {
            status = "success";
            result = r;
        },
        (e) => {
            status = "error";
            result = e;
        }
    );
    return {
        read() {
            if (status === "pending") throw suspender;
            else if (status === "error") throw result;
            else if (status === "success") return result;
        },
        fromServer,
    };
};

export type { ConfigReader };
export { authConfig, appConfig, fetchAuthConfig };
