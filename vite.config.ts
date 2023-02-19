import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig(async ({ command, mode }) => {
  return {
    build: {
      lib: {
        entry: path.resolve(__dirname, "src/lib/index.ts"),
        name: "Vue-Moon",
        fileName: (format) => `vue-moon.${format}.js`,
      },
      rollupOptions: {
        // make sure to externalize deps that shouldn't be bundled
        // into your library
        external: ["vue"],
        output: {
          // Provide global variables to use in the UMD build
          // for externalized deps
          globals: {
            vue: "Vue",
          },
        },
      },
    },
    plugins: [
      vue(),
      dts({
        insertTypesEntry: true,
      }),
    ],
  };
});
