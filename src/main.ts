import { createApp } from 'vue'
import App from './App.vue'
import router, { setupRouter } from '@/router'
import i18n from '@/i18n/index'
import { setupStore } from '@/store'
import { setupNaive, setupDirectives, setupCustomComponents } from '@/plugins'
import { AppProvider } from '@/components/AppProvider/index'
import { setHtmlTheme } from '@/utils'

async function appInit() {
  const appProvider = createApp(AppProvider)

  const app = createApp(App)

  // 注册全局常用的 naive-ui 组件
  setupNaive(app)

  // 注册全局自定义指令
  setupDirectives(app)

  // 注册全局自定义组件
  setupCustomComponents(app)

  // 挂载状态管理
  setupStore(app)

  // 解决路由守卫，Axios中可使用，Dialog，Message 等全局组件
  appProvider.mount('#appProvider', true)

  // 挂载路由
  setupRouter(app)

  // 路由准备就绪后挂载APP实例
  await router.isReady()

  // Store 准备就绪后处理主题色
  setHtmlTheme()

  // 语言注册
  app.use(i18n)

  app.mount('#app', true)
}

void appInit()
