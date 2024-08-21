import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
    port: 5173,
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
  plugins: [react()],
});
