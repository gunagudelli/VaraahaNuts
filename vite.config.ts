import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // /api calls from the frontend go to the local Express server in dev.
    // In production both are served from the same Vercel deployment, so no
    // proxy is needed there - relative /api/... URLs just work.
    proxy: {
      '/api': 'http://localhost:5001',
    },
  },
})
