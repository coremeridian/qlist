module.exports = {
    content: [
        "./public/**/*.html",
        "./src/frontend/**/*.js",
        "./src/frontend/**/*.jsx",
        "./src/frontend/**/*.tsx",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    100: "#858fad",
                    500: "#3d455c",
                    900: "#292e3d",
                },
            },
        },
        fontFamily: {
            Poppins: ["Poppins, sans-serif"],
        },
        container: {
            center: true,
            padding: "1rem",
            screens: {
                lg: "1124px",
                xl: "1124px",
                "2xl": "1124px",
            },
        },
    },
    plugins: [
        require("@tailwindcss/forms"),
        require("@tailwindcss/typography"),
    ],
};
