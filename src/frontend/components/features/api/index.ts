import {
    createApi,
    buildCreateApi,
    coreModule,
    fetchBaseQuery,
    reactHooksModule,
} from "@reduxjs/toolkit/query/react";
import { getUser } from "@features/authentication";
import type { RootState } from "@App/store";
import AbortController from "abort-controller";
import { fetch, Headers, Request, Response } from "cross-fetch";
import { appConfig } from "@App/config";

global.fetch = fetch;
global.Headers = Headers;
global.Request = Request;
global.Response = Response;
global.AbortController = AbortController;

const version = ["", "v1/"];
export const apiDomain = appConfig.base + `/${version[0]}`;

const ssrCreateApi = buildCreateApi(
    coreModule(),
    reactHooksModule({ unstable__sideEffectsInRender: true })
);

const apiConfig = {
    baseQuery: fetchBaseQuery({
        baseUrl: apiDomain,
        prepareHeaders: (headers, { getState }) => {
            const user = getUser();
            const token = user?.access_token;
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        },
        fetchFn: fetch,
    }),
    tagTypes: ["UNKNOWN_ERROR"],
    endpoints: (build) => ({}),
};

export const api = createApi(apiConfig);
export const ssrApi = ssrCreateApi({ ...apiConfig, reducerPath: "ssr-api" });
