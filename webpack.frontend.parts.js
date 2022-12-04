const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const InterpolateHtmlPlugin = require("react-dev-utils/InterpolateHtmlPlugin");
const path = require("path");

const devMode = process.env.NODE_ENV !== "production";

module.exports.page = ({
    title,
    url = "",
    chunks,
    additional = { plugins: [] },
} = {}) => (
    (url = url && url + "/"),
    {
        plugins: additional.plugins.concat([
            new HtmlWebpackPlugin({
                chunks,
                filename: `${url}index.html`,
                context: { title },
                inject: "body",
                // template: path.resolve(__dirname, "./public/index.html"),
            }),
            new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
                PUBLIC_URL: "/public",
            }),
            new MiniCssExtractPlugin({
                filename: devMode
                    ? `static/css/${url}[name].css`
                    : `static/css/${url}[name].[contenthash].css`,
                chunkFilename: devMode
                    ? `static/css/${url}[id].css`
                    : `static/css/${url}[id].[contenthash].css`,
                ignoreOrder: true,
            }),
        ]),
    }
);
