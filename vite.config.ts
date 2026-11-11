import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8081,
    hmr: {
      overlay: false,
    },
    proxy: {
      "/api/asaas-sandbox": {
        target: "https://api-sandbox.asaas.com/v3",
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api\/asaas-sandbox/, ""),
        headers: {
          "User-Agent": "AutoCore-ERP/1.0",
          access_token:
            "$aact_hmlg_000MzkwODA2MWY2OGM3MWRlMDU2NWM3MzJlNzZmNGZhZGY6OjgzNjM1YjU5LWVlYmItNDg1NS05ODRjLTFhMjU5NGU0OTFmOTo6JGFhY2hfYjdmNjgyNjMtODdlNS00NWRkLTg1ZjctZTQ0ZDEwZDljN2Zi",
        },
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
