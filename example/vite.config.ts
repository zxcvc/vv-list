import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vitejsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), vitejsx()],
});
