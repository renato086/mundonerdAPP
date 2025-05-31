import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  optimizeDeps: {
    include: ['firebase/app', 'firebase/firestore']
  },
  build: {
    rollupOptions: {
      external: []
      // OU
      // external: ['firebase'] (mas melhor deixar vazio pra não externalizar)
    }
  }
})
