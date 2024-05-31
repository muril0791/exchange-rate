import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vuetify({ autoImport: true })],
  server: {
    host: "0.0.0.0",
  },
  resolve: {
    alias: {
      "vue-router": "vue-router/dist/vue-router.esm-bundler.js",
    },
  },
});
