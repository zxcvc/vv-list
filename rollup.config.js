import ts from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import noderesolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import postcss from "rollup-plugin-postcss";
import { defineConfig } from "rollup";
import { resolve } from "path";

export default defineConfig({
    input: resolve(__dirname, "./src/index.ts"),
    output: [
        {
            file: resolve(__dirname, "./dist/index.js"),
            format: "umd",
            name: "VList",
            globals: {
                vue: "Vue",
            },
        },
        {
            file: resolve(__dirname, "./dist/index.esm.js"),
            format: "esm",
        },
    ],
    plugins: [
        noderesolve(),
        ts(),
        babel({
            babelHelpers: "inline",
            exclude: "node_modules/**",
            extensions: [".tsx", ".ts", ".jsx", ".js"],
        }),
        postcss(),
        terser(),
    ],
    external: ["vue"],
});
