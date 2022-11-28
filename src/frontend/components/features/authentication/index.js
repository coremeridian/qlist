export { default as AuthPortal } from "./AuthPortal";
export { default as RequiredAuth } from "./RequireAuth";

import { User } from "oidc-client-ts";

export function getUser() {
    const key = `oidc.user:${process.env.AUTH_URL}:web`;
    const oidcStorage = localStorage.getItem(key);
    if (!oidcStorage) {
        return sessionStorage.getItem(key);
    }

    return User.fromStorageString(oidcStorage);
}

export function parseJwt(token) {
    if (globalThis?.window) {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
            window
                .atob(base64)
                .split("")
                .map(function (c) {
                    return (
                        "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
                    );
                })
                .join("")
        );

        return JSON.parse(jsonPayload);
    }
    return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
}

export function extractUserPayload(token) {
    const decoded = parseJwt(token);
    const roles = decoded.realm_access.roles;
    const scope = decoded.scope.split(" ");
    return (({
        id,
        preferred_username,
        given_name,
        family_name,
        email,
        email_verified,
    }) => ({
        id,
        preferred_username,
        given_name,
        family_name,
        email,
        email_verified,
        scope,
        roles,
    }))(decoded);
}
