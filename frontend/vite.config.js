import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true
  },
  build: {
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          // Keep WebP images in their original structure
          if (assetInfo.name && assetInfo.name.endsWith('.webp')) {
            return 'assets/webp/[name].[hash][extname]'
          }
          return 'assets/[name].[hash][extname]'
        }
      }
    }
  },
  assetsInclude: ['**/*.webp']
})
