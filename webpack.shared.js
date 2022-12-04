//const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
//const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

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
                                        "@server": "./src/backend/server",
                                        "@App": "./src/frontend/components/App",
                                        components: "./src/frontend/components",
                                        "@areas":
                                            "./src/frontend/components/areas",
                                        "@features":
                                            "./src/frontend/components/features",
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
    plugins: [new CleanWebpackPlugin()],
};
