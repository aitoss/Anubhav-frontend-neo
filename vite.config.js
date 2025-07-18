import { defineConfig, loadEnv } from 'vite';
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const apiDomain = env.VITE_API_DOMAIN || "https://oss-backend-staging.vercel.app";

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api/youtube": {
          target: "https://www.googleapis.com",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/youtube/, ""),
          configure: (proxy, options) => {
            proxy.on('proxyRes', (proxyRes) => {
              proxyRes.headers['cache-control'] = 'no-cache, no-store, must-revalidate';
              proxyRes.headers['pragma'] = 'no-cache';
              proxyRes.headers['expires'] = '0';
            });
          },
        },
        "/auth": {
          target: apiDomain,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
