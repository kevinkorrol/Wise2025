import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  server: {
    proxy: {
      // Local dev calls like fetch('/api/wise/v3/quotes/')
      '/api/wise': {
        target: 'https://api.wise-sandbox.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/wise/, ''),
        // Optionally add headers here; we rely on frontend passing Authorization.
        // headers: { Authorization: `Bearer ${process.env.VITE_WISE_API_TOKEN || ''}` }
      },
        '/api/backend': {
          target: 'http://backend:8080',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/backend/, ''),
        },
    },
  },
})
