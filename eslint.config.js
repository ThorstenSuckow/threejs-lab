// eslint.config.js
import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

export default [
    js.configs.recommended,
    prettierConfig,
    {
        files: ["**/*.js"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                window: "readonly",
                document: "readonly",
                requestAnimationFrame: "readonly",
            },
        },
        plugins: {
            import: importPlugin,
            prettier: prettierPlugin,
        },
        rules: {
            "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
            "no-console": "off",
            "import/no-unresolved": "error",
            // Prettier
            "prettier/prettier": "warn",
        },
    },
];
