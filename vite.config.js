import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://52.74.26.144:9000',  // Your backend server
        changeOrigin: true,  // Ensure proper host headers are sent to the target
        rewrite: (path) => path.replace(/^\/api/, ''),  // Remove the '/api' prefix before forwarding
        secure: false,  // Set to false if using HTTP, true for HTTPS
      },
    },
  },
})
