const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
    experiments: { topLevelAwait: true },
    /*optimization: {
        minimizer: [
            new TerserPlugin({
                minify: TerserPlugin.esbuildMinify,
            }),
            new CssMinimizerPlugin(),
        ],
    },*/
    module: {
        rules: [
            {
                test: /\.(ts|js|mjs)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        cacheDirectory: true,
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript",
                        ],
                        plugins: [
                            [
                                "babel-plugin-module-resolver",
                                {
                                    alias: {
                                        "@server": "./src/ssr/server",
                                        "@edge": "./src/ssr/edge",
                                        "@App": "./src/components/App",
                                        components: "./src/components",
                                        "@areas": "./src/components/areas",
                                        "@features":
                                            "./src/components/features",
                                        "@CompanyTypes": "./types",
                                    },
                                },
                            ],
                        ],
                    },
                },
            },
            {
                test: /\.html$/,
                use: ["html-loader"],
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {},
                    },
                    { loader: "css-loader", options: { importLoaders: 2 } },
                    "sass-loader",
                    "postcss-loader",
                ],
            },
            {
                test: /\.(eot|ttf|woff|woff2|pdf|doc|zip)$/,
                type: "asset/resource",
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                type: "asset/inline",
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js", ".mjs"],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: devMode
                ? "static/[name].css"
                : "static/[name].[contenthash].css",
            chunkFilename: devMode
                ? "static/[id].css"
                : "static/[id].[contenthash].css",
            ignoreOrder: true,
        }),
    ],
};
