import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { OUTPUT_DIR, brotliSize, chunkSizeWarningLimit, terserOptions, rollupOptions } from './build/constant'
import viteCompression from 'vite-plugin-compression'

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

export default defineConfig({
  base: './',
  resolve: {
    alias: [
      {
        find: /\/#\//,
        replacement: pathResolve('types') + '/'
      },
      {
        find: '@',
        replacement: pathResolve('src') + '/'
      }
    ],
    dedupe: ['vue']
  },
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        additionalData: `@import "src/styles/common/style.scss";`
      }
    }
  },
  plugins: [
    vue(),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz'
    })
  ],
  build: {
    target: 'es2015',
    outDir: OUTPUT_DIR,
    terserOptions: terserOptions,
    rollupOptions: rollupOptions,
    brotliSize: brotliSize,
    chunkSizeWarningLimit: chunkSizeWarningLimit
  }
})
