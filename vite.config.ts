import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path"
import { OUTPUT_DIR } from './build/constant';

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

export default defineConfig({
  base: "./",
  resolve: {
    alias: [
      {
        find: /\/#\//,
        replacement: pathResolve('types') + '/',
      },
      {
        find: '@',
        replacement: pathResolve('src') + '/',
      }
    ],
    dedupe: ['vue'],
  },
  css: {
    preprocessorOptions: {
      scss: {
        modifyVars: {},
        javascriptEnabled: true,
        additionalData: `@import "src/styles/global/var.scss";`,
      },
    },
  },
  plugins: [
    vue()
  ],
  build: {
    target: 'es2015',
    outDir: OUTPUT_DIR,
    terserOptions: {
      compress: {
        keep_infinity: true,
      },
    },
    brotliSize: false,
    chunkSizeWarningLimit: 2000,
  },
})