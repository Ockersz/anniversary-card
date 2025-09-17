import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    port: 8080,                // must match DO health check
    allowedHosts: ['*'], // add your DO domain here
  },
})
