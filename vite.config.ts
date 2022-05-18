import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  root: 'src/renderer',
  base: './',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src/renderer')
    }
  },
  plugins: [react()],
  build: {
    outDir: '../../public', // 相对于项目根路径
    sourcemap: true
  }
})
