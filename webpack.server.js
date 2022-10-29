const { ModuleFederationPlugin } = require("webpack").container;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const InterpolateHtmlPlugin = require("react-dev-utils/InterpolateHtmlPlugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { mergeWithRules } = require("webpack-merge");
const nodeExternals = require("webpack-node-externals");
const WebpackShellPluginNext = require("webpack-shell-plugin-next");
const path = require("path");
const pkg = require("./package.json");

module.exports = (env, args) => {
    const isProduction = args.mode === "production";
    const serverHandlerPath = "./src/backend/server/handler/";
    const preconfig = {
        name: "serverless-backend",
        mode: args.mode,
        entry: isProduction
            ? path.resolve(serverHandlerPath, "lambda")
            : path.resolve(serverHandlerPath, "local"),
        target: "node",
        output: {
            path: path.resolve(__dirname, "build/server-dist"),
            filename: "index.js",
            library: { name: "server", type: "commonjs2" },
            publicPath: "/",
            clean: true,
        },
        optimization: {
            minimizer: [],
        },
        module: {
            rules: [
                {
                    test: /\.node$/,
                    loader: "node-loader",
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        !isProduction
                            ? "style-loader"
                            : {
                                loader: MiniCssExtractPlugin.loader,
                                options: {
                                    emit: false,
                                },
                            },
                        {
                            loader: "css-loader",
                            options: {
                                modules: {
                                    exportOnlyLocals: true,
                                    exportLocalsConvention: "camelCase",
                                    localIdentName:
                                        "[local]_[contenthash:base64:5]",
                                },
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            /*new WebpackShellPluginNext({
                onBuildStart: {
                    scripts: [" echo 'Starting Webpack'"],
                    blocking: true,
                    parallel: false,
                },
            }),*/
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, "./public/index.html"),
            }),
            new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
                PUBLIC_URL: "/public",
            }),
            new CopyPlugin({
                patterns: [
                    path.resolve(
                        __dirname,
                        "src",
                        "backend/proto/test_integrator.link.proto"
                    ),
                ],
            }),
        ],
    };

    /*if (!isProduction) {
        preconfig.plugins.push(
            new ModuleFederationPlugin({
                name: "[name]",
                remotes: {
                    web: "web@http://localhost:3100/remoteEntry.js",
                },
                shared: {
                    ...pkg.dependencies,
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
            })
        );
    }*/

    const mergedConfig = mergeWithRules({
        module: {
            rules: {
                test: "match",
                use: "replace",
            },
        },
    })(require("./webpack.shared"), preconfig);

    return mergedConfig;
};
