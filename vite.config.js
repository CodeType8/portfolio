import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  preview: {
    port: 4174,
    strictPort: true,
    allowedHosts: ['codetypeweb.com', 'www.codetypeweb.com'],
  }
})
