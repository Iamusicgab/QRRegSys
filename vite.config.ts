import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: {
      key: "./server.key",
      cert: "./server.crt",
    },
  },
  base: "./",
  build: {
    minify: true,
  },
  plugins: [react()],
});
