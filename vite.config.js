import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

//! Не работает для Vite с версией 5+
// import pluginPurgeCss from '@mojojoejo/vite-plugin-purgecss'

//! Для Vite с версией 5+
import pluginPurgeCss from "vite-plugin-purgecss-updated-v5";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    pluginPurgeCss({
      variables: true,
    }),
  ],
  optimizeDeps: {
    include: ["vue"],
  },
  base: "./",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      // Кэширование и сжатие JS
      output: {
        entryFileNames: "assets/[name].[hash].js",
        chunkFileNames: "assets/[name].[hash].js",
        assetFileNames: "assets/[name].[hash].[ext]",
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // ПЕРЕМЕННЫЕ SCSS + отдельный файл с mixins и функциями 👀
        additionalData:
          '@import "@/assets/styles/_variables.scss"; @import "@/assets/styles/_mixins_functions.scss";',
      },
    },
  },
});
