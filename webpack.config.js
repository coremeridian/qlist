const { ProvidePlugin, HotModuleReplacementPlugin } = require("webpack");
const { ModuleFederationPlugin } = require("webpack").container;
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
const pkg = require("./package.json");

function NoncePlaceholder() { }
Object.setPrototypeOf(
    NoncePlaceholder.prototype,
    Object.create({
        apply(compiler) {
            compiler.hooks.thisCompilation.tap(
                "NoncePlaceholder",
                (compilation) => {
                    HtmlWebpackPlugin.getHooks(
                        compilation
                    ).afterTemplateExecution.tapAsync(
                        "NoncePlaceholder",
                        (data, callbackify) => {
                            const { headTags, bodyTags } = data;
                            headTags.forEach(
                                (x) =>
                                    x.tagName === "script" &&
                                    (x.attributes.nonce = "CSP_NONCE")
                            );
                            bodyTags.forEach(
                                (x) =>
                                    x.tagName === "script" &&
                                    (x.attributes.nonce = "CSP_NONCE")
                            );
                            callbackify(null, data);
                        }
                    );
                }
            );
        },
    })
);

module.exports = (env, args) => {
    const isProduction = process.env.NODE_ENV === "production";
    const outputPath = path.resolve(__dirname, "build/dist");
    const preconfig = {
        name: "web",
        mode: args.mode,
        entry: "./src/frontend/index",
        output: {
            path: outputPath,
            filename: isProduction
                ? "static/js/[name].[contenthash].js"
                : "static/js/[name].[fullhash].js",
            chunkFilename: isProduction
                ? "static/js/[name].chunk.[contenthash].js"
                : "static/js/[name].chunk.[fullhash].js",
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

            new NoncePlaceholder(),
            new CopyPlugin({
                patterns: [
                    path.resolve(
                        __dirname,
                        "src/frontend",
                        "silent-check-sso.html"
                    ),
                ],
            }),
            new WebpackManifestPlugin({
                basePath: outputPath,
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
