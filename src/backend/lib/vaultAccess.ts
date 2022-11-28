const { default: axios, Axios } = require("axios");
const Mutex = require("async-mutex").Mutex;
const aws4 = require("aws4");
const { defaultProvider } = require("@aws-sdk/credential-provider-node");

interface DBCredentials {
    readonly username: string;
    readonly password: string;
    readonly name: string;
}

type APIDBCredentials = {
    prodInstance: string;
    devInstance?: string;
    [key: string]: DBCredentials;
};

const mutex = new Mutex();
const credsCache: { [key: string]: APIDBCredentials } = {};

const awsRequestUrl = "https://sts.amazonaws.com/";
const awsRequestBody = "Action=GetCallerIdentity&Version=2011-06-15";

const getSignedRequest = (creds) => {
    let awsCreds = {
        accessKeyId: creds.accessKeyId,
        secretAccessKey: creds.secretAccessKey,
    };
    if (creds.sessionToken) {
        awsCreds.sessionToken = creds.sessionToken;
    }

    return aws4.sign(
        {
            service: "sts",
            headers: {
                "X-Vault-AWS-IAM-Server-ID": "secrets.coremeridian.xyz",
            },
            body: awsRequestBody,
        },
        awsCreds
    );
};

const getSignedHeaders = (creds) => {
    let signedRequest = getSignedRequest(creds);
    let headers = signedRequest.headers;
    for (let header in headers) {
        if (typeof headers[header] === "number") {
            headers[header] = headers[header].toString();
        }
        headers[header] = [headers[header]];
    }
    return headers;
};

const getVaultToken = async (http: typeof Axios) => {
    if (process.env.NODE_ENV === "development") {
        return await http.post("/auth/approle/login", {
            role_id: process.env.VAULT_ROLE_ID,
            secret_id: process.env.VAULT_SECRET_ID,
        });
    } else {
        console.log("Getting secrets access token");
        const providerChain = defaultProvider();
        const awsCreds = await providerChain();
        console.log("Obtained provider chain");
        const signedHeaders = getSignedHeaders(awsCreds);
        return await http.post("/auth/aws/login", {
            role: "lambda-backend",
            iam_http_request_method: "POST",
            iam_request_url: Buffer.from(awsRequestUrl).toString("base64"),
            iam_request_body: Buffer.from(awsRequestBody).toString("base64"),
            iam_request_headers: Buffer.from(
                JSON.stringify(signedHeaders)
            ).toString("base64"),
        });
    }
};

const requestRedis = async (db, http): APIDBCredentials => {
    const results = await http.get(`/secret/data/${db}`);
    return {
        prodInstance: results.url,
        [db]: {
            username: results.username,
            password: results.password,
        },
    };
};

const requestMongodb = async (http): APIDBCredentials => {
    const results = await Promise.all([
        http.get("/mongodb/creds/blog-rw"),
        http.get("/mongodb/creds/payment-rw"),
        ((http.defaults.headers.get["X-Vault-Control"] = "manual"),
        http.get("/url/data/databases/frontend")),
    ]);
    return {
        prodInstance: results[2].data.data.data.proddb,
        devInstance: results[2].data.data.data.devdb,
        blogdb: {
            ...results[0].data,
            name: results[2].data.data.data.blogdb,
        },
        paymentdb: {
            ...results[1].data,
            name: results[2].data.data.data.paymentdb,
        },
    };
};

export const getCredentials = (db: string) =>
    mutex.runExclusive(async (): Promise<APIDBCredentials> => {
        if (!credsCache[db]) {
            const headers: { [key: string]: string } = {
                "X-API-Key": process.env.API_KEY ?? "",
            };
            const http = axios.create({
                baseURL: process.env.VAULT_URL,
                headers,
            });

            try {
                let vaultToken = (await getVaultToken(http)).data.auth
                    .client_token;

                console.log("Getting secrets");

                http.defaults.headers.get["X-Vault-Control"] = "auto";
                http.defaults.headers.get["X-Vault-Token"] = vaultToken ?? "";

                let creds = {};
                if (db === "mongodb") creds = await requestMongodb(http);
                if (db === "app-redis-access")
                    creds = await requestRedis(db, http);
                credsCache[db] = creds;
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.log("HTTP Error");
                    if (error.response) {
                        console.log("Response error");
                        console.log(error.response.status, error.response.data);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        if (error.request.status || error.request.data)
                            console.log(
                                "Request error",
                                error.request.status,
                                error.request.data
                            );
                        else console.log(error.request);
                    } else {
                        console.log(error.config);
                    }
                    console.log("Error", error.message);
                } else {
                    console.log("Error in vault access", error);
                }
                throw "Vault access denied";
            }
        }
        console.log("Receiving credentials");
        return credsCache[db];
    });

export type { APIDBCredentials };
