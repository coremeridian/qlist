const { ProvidePlugin, HotModuleReplacementPlugin } = require("webpack");
const { ModuleFederationPlugin } = require("webpack").container;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const InterpolateHtmlPlugin = require("react-dev-utils/InterpolateHtmlPlugin");
const { merge } = require("webpack-merge");
const path = require("path");
const pkg = require("./package.json");

const publicUrl = "/public";

module.exports = (env, args) => {
    const isProduction = process.env.NODE_ENV === "production";
    const outputPath = path.resolve(__dirname, "build/dist");
    const preconfig = {
        name: "web",
        mode: args.mode,
        entry: "./src/index",
        output: {
            path: outputPath,
            filename: isProduction
                ? "static/bundle.min.[contenthash].js"
                : "static/bundle.min.[fullhash].js",
            publicPath: "/",
            library: { name: "webapp", type: "umd" },
            clean: true,
        },
        devServer: {
            static: {
                directory: path.join(__dirname, "build/dist"),
            },
            port: "auto",
            hot: true,
            open: true,
            compress: true,
        },
        resolve: {
            fallback: {
                path: require.resolve("path-browserify"),
            },
        },
        plugins: [
            /*new ModuleFederationPlugin({
                name: pkg.name,
                library: { type: "var", name: pkg.name },
                filename: "remoteEntry.js",
                exposes: {
                    App: "./src/index",
                },
                shared: {
                    react: {
                        singleton: true,
                        requiredVersion: pkg.dependencies.react,
                    },
                    "react-dom": {
                        singleton: true,
                        requiredVersion: pkg.dependencies["react-dom"],
                    },
                    "react-router-dom": {
                        singleton: true,
                        requiredVersion: pkg.dependencies["react-router-dom"],
                    },
                },
            }),*/
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, "./public/index.html"),
            }),
            new CopyPlugin({
                patterns: [
                    path.resolve(
                        __dirname,
                        "src",
                        "keycloak/silent-check-sso.html"
                    ),
                ],
            }),
            new WebpackManifestPlugin({
                basePath: outputPath,
            }),
            new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
                PUBLIC_URL: publicUrl,
            }),
            new ProvidePlugin({
                process: "process/browser",
            }),
        ],
    };

    if (env.localServer) {
        preconfig.plugins.push(new HotModuleReplacementPlugin());
    }

    return merge(require("./webpack.shared"), preconfig);
};
