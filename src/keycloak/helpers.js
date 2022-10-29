const keycloakConfig = {
    url: "https://www.coremeridian.xyz/auth/",
    realm: "Qlist",
    clientId: "Web",
};

const keycloakInitConfig = {
    enableLogging: process.env.NODE_ENV === "development" ? true : false,
    onLoad: "check-sso",
    pkceMethod: "S256",
    silentCheckSsoRedirectUri: "http://localhost:8080/silent-check-sso.html",
};

export { keycloakConfig, keycloakInitConfig };
