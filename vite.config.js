import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd());
  const { VITE_APP_ENV } = env;
  return {
    base: VITE_APP_ENV === "production" ? "./" : "/",
    plugins: [vue()],
    server: {
      open: true,
      proxy: {
        "/api": {
          target: "http://140.143.139.167:8002",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""), // 不可以省略rewrite
        },
      },
    },
    resolve: {
      // 配置路径别名
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
