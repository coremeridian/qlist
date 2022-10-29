const serverConfig = require("./webpack.server");
const path = require("path");
const { merge } = require("webpack-merge");

module.exports = (env, args) => {
    return merge(serverConfig(env, args), {
        name: "serverless-ssr",
        entry: {
            main: {
                filename: "request.js",
                import: "./src/backend/server/handler/edge",
            },
            resp: {
                filename: "response.js",
                import: "./src/backend/server/handler/edge.response",
            },
        },
        output: {
            path: path.resolve(__dirname, "build/edge-dist"),
            library: { name: "edge", type: "commonjs2" },
            publicPath: "/",
            clean: true,
        },
    });
};
