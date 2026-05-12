import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  return {
    base: '/qurbanApps-vue/',  // for build result folder name
    plugins: [
      vue(),
      vueDevTools(),
      {
        name: 'mpa-rewrite',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            // Jika request diawali /admin tapi bukan file statis (punya titik), arahkan ke admin.html
            if (req.url && req.url.startsWith('/admin') && !req.url.includes('.')) {
              req.url = '/admin.html';
            }
            next();
          });
        }
      }
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    build: {
      rollupOptions: {
        input: {
          main: fileURLToPath(new URL('./index.html', import.meta.url)),
          admin: fileURLToPath(new URL('./admin.html', import.meta.url)),
        }
      }
    }
  }
})
