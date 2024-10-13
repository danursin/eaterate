module.exports = {
    extends: [
        "plugin:@typescript-eslint/recommended",
        "next/core-web-vitals",
        "eslint:recommended",
        "plugin:prettier/recommended",
        "prettier"
    ],
    parser: "@typescript-eslint/parser",
    plugins: ["react", "prettier"],
    rules: {
        "sort-imports": "error"
    },
    settings: {
        react: {
            version: "detect"
        }
    }
};
