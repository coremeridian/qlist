const HtmlWebpackPlugin = require("html-webpack-plugin");
const InterpolateHtmlPlugin = require("react-dev-utils/InterpolateHtmlPlugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const serverConfig = require("./webpack.backend");
const path = require("path");
const { merge } = require("webpack-merge");

module.exports = (env, args) => {
    const config = merge(serverConfig(env, args), {
        name: "serverless-ssr",
        entry: {
            main: {
                filename: "request.js",
                import: "./src/backend/server/handler/edge.request",
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
    config.plugins = [
        new HtmlWebpackPlugin({
            inject: "body",
            template: path.resolve(__dirname, "./public/index.html"),
        }),
        new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
            PUBLIC_URL: "/public",
        }),
        new MiniCssExtractPlugin({
            filename:
                process.env.NODE_ENV !== "production"
                    ? "static/[name].css"
                    : "static/[name].[contenthash].css",
            chunkFilename:
                process.env.NODE_ENV !== "production"
                    ? "static/[id].css"
                    : "static/[id].[contenthash].css",
            ignoreOrder: true,
        }),
    ];
    return config;
};
