import { defineConfig, loadEnv,normalizePath} from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { OUTPUT_DIR, brotliSize, chunkSizeWarningLimit, terserOptions, rollupOptions } from './build/constant'
import viteCompression from 'vite-plugin-compression'
import {axiosPre, cesiumApi} from './src/settings/httpSetting'
import { viteMockServe } from 'vite-plugin-mock'
import  monacoEditorPlugin  from 'vite-plugin-monaco-editor'
import { viteExternalsPlugin } from 'vite-plugin-externals'
import  { viteStaticCopy }  from 'vite-plugin-static-copy'
import path from 'path'
import cesium from 'vite-plugin-cesium'
function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

export default ({ mode }) => defineConfig({
  base: process.env.NODE_ENV === 'production' ? './' : '/',
  // 路径重定向
  resolve: {
    alias: [
      {
        find: /\/#\//,
        replacement: pathResolve('types')
      },
      {
        find: '@',
        replacement: pathResolve('src')
      },
      {
        find: 'vue-i18n',
        replacement: 'vue-i18n/dist/vue-i18n.cjs.js', //解决i8n警告
      }
    ],
    dedupe: ['vue']
  },
  // 全局 css 注册
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        additionalData: `@import "src/styles/common/style.scss";`
      }
    }
  },
  // 开发服务器配置
  server: {
    host: true,
    open: true,
    port: 3000,
    proxy: {
      [axiosPre]: {
        // @ts-ignore
        target: loadEnv(mode, process.cwd()).VITE_DEV_PATH,
        changeOrigin: true,
        ws: true,
        secure: true,
      },
      [cesiumApi]: {
        target: 'http://192.168.2.249:9033',
        changeOrigin: true,
        ws: true,
        secure: true
      }
    }
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // 排除 iconify 图标影子组件编译报错
          isCustomElement: tag => tag.startsWith('iconify-icon')
        }
      }
    }),
    cesium(),
    viteExternalsPlugin({
      'cesium': 'Cesium',

      'xbsj-renderer/dist-node/xr-base-utils': 'xbsj["xr-base-utils"]',
      'xbsj-renderer/dist-node/xr-math': 'xbsj["xr-math"]',
      'xbsj-renderer/dist-node/xr-utils': 'xbsj["xr-utils"]',
      'xbsj-renderer/dist-node/xr-cesium': 'xbsj["xr-cesium"]',

      'xbsj-xe2/dist-node/xe2': 'XE2["xe2"]',
      'xbsj-xe2/dist-node/xe2-base': 'XE2["xe2-base"]',
      'xbsj-xe2/dist-node/xe2-base-utils': 'XE2["xe2-base-utils"]',
      'xbsj-xe2/dist-node/xe2-utils': 'XE2["xe2-utils"]',
      'xbsj-xe2/dist-node/xe2-cesium': 'XE2["xe2-cesium"]',
      'xbsj-xe2/dist-node/xe2-mapbox': 'XE2["xe2-mapbox"]',
      'xbsj-xe2/dist-node/xe2-ue': 'XE2["xe2-ue"]',
      'xbsj-xe2/dist-node/utility-xe2-plugin': 'XE2["utility-xe2-plugin"]',
      'xbsj-xe2/dist-node/xe2-all-in-one': 'XE2["xe2-all-in-one"]',
      'xbsj-xe2/dist-node/xe2-base-objects': 'XE2["xe2-base-objects"]',
      'xbsj-xe2/dist-node/xe2-objects': 'XE2["xe2-objects"]',
      'xbsj-xe2/dist-node/xe2-cesium-objects': 'XE2["xe2-cesium-objects"]',
      'xbsj-xe2/dist-node/xe2-ue-objects': 'XE2["xe2-ue-objects"]',
      'xbsj-xe2/dist-node/xe2-openlayers': 'XE2["xe2-openlayers"]',
      'xbsj-xe2/dist-node/xe2-openlayers-objects': 'XE2["xe2-openlayers-objects"]',

      'smplotting-xe2-plugin/dist-node/smplotting-xe2-plugin': 'XE2["smplotting-xe2-plugin"]',
      'smplotting-xe2-plugin/dist-node/smplotting-xe2-plugin-main': 'XE2["smplotting-xe2-plugin-main"]',
      'esobjs-xe2-plugin/dist-node/esobjs-xe2-plugin': 'XE2["esobjs-xe2-plugin"]',
      'esobjs-xe2-plugin/dist-node/esobjs-xe2-plugin-main': 'XE2["esobjs-xe2-plugin-main"]',
    }, { useWindow: false }),
    // 运行和构建时copy
    viteStaticCopy({
      targets: [
        {
          src: normalizePath(path.resolve(__dirname, './node_modules/xbsj-xe2/dist-web')),//wu
          dest: './js/xbsj-xe2'
        },
        {
          src: normalizePath(path.resolve(__dirname, './node_modules/xbsj-xe2-assets/dist-web')),//w
          dest: './js/xbsj-xe2-assets'
        },
        {
          src: normalizePath(path.resolve(__dirname, './node_modules/smplotting-xe2-plugin/dist-web')),//wu
          dest: './js/smplotting-xe2-plugin'
        },
        {
          src: normalizePath(path.resolve(__dirname, './node_modules/esobjs-xe2-plugin/dist-web')),
          dest: './js/esobjs-xe2-plugin'
        },
        {
          src: normalizePath(path.resolve(__dirname, './node_modules/esobjs-xe2-plugin-assets/dist-web')),//wu
          dest: './js/esobjs-xe2-plugin-assets'
        },
        {
          src: normalizePath(path.resolve(__dirname, './node_modules/vue-xe2-plugin/dist-web')),
          dest: './js/vue-xe2-plugin'
        }
      ]
    }),
    (monacoEditorPlugin as any).default({
      languageWorkers: ['editorWorkerService', 'typescript', 'json', 'html']
    }),
    viteMockServe({
      mockPath: '/src/api/mock',
      // 开发打包开关
      localEnabled: true,
      // 生产打包开关
      prodEnabled: true,
      // 打开后，可以读取 ts 文件模块。 请注意，打开后将无法监视.js 文件
      supportTs: true,
      // 监视文件更改
      watchFiles: true
    }),
    // 压缩
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz'
    })
  ],
  build: {
    target: 'es2020',
    outDir: OUTPUT_DIR,
    // minify: 'terser', // 如果需要用terser混淆，可打开这两行
    // terserOptions: terserOptions,
    rollupOptions: rollupOptions,
    reportCompressedSize: brotliSize,
    chunkSizeWarningLimit: chunkSizeWarningLimit
  }
})
