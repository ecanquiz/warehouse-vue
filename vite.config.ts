import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    server: { 
      host: env.VITE_HOST,
      port: env.VITE_PORT as unknown as number
    }, 
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    define: {
      // enable hydration mismatch details in production build
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true',
      'process.env': {                    
        VITE_APP_API_URL: `${env.VITE_APP_API_URL}`,
        VITE_ARTICLE_API_URL: `${env.VITE_API_ARTICLE_URL}`,
        VITE_ARTICLE_API_SHARED_TOKEN: `${env.VITE_ARTICLE_API_SHARED_TOKEN}`
      }
    },
    test: {
      globals: true,
      environment: "jsdom",
    },
  }
})
