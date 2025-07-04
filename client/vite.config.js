import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [react(),tailwindcss()],
  server:{
    port:4000,
    proxy:{
      '/api':{
        target: 'http://127.0.0.1:5555',
        changeOrigin: true,
        secure: false,
      },
    },

  },
})
