const { merge } = require("webpack-merge");
const parts = require("./webpack.frontend.parts");
const preconfig = require("./webpack.config");

const pages = ["Landing", "App"];

module.exports = (env, args) => {
    const pre = preconfig(env, args);
    const partsConfig = [];
    const m = merge(
        {
            ...pre,
            entry: pages.reduce((config, page) => {
                let path = "";
                if (page === "App") path = `components/${page}`;
                else path = `components/areas/${page}`;
                config[
                    page.toLocaleLowerCase()
                ] = `./src/frontend/${path}/index`;
                return config;
            }, {}),
            optimization: {
                splitChunks: {
                    chunks: "all",
                },
            },
        },
        ...(pages.reduce((additional, page) => {
            const part = parts.page({
                title: page,
                url: `${page.toLowerCase()}`,
                chunk: page,
                additional: { plugins: additional.plugins ?? [] },
            });
            partsConfig.push(part);
            additional.plugins = part.plugins;
            console.log(additional.plugins);
            return { plugins: additional.plugins };
        }, {}),
            partsConfig)
    );
    console.log(m);
    return m;
};
