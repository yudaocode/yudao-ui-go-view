import { createApp } from 'vue'
import App from './App.vue'
import router, { setupRouter } from '@/router'
import i18n from '@/i18n/index'
import { setupStore } from '@/store'
import { setupNaive, setupDirectives } from '@/plugins'
import { AppProvider } from '@/components/Application'
import { setHtmlTheme } from '@/utils/style'

async function appInit() {
  const appProvider = createApp(AppProvider)

  const app = createApp(App)

  // 注册全局常用的 naive-ui 组件
  setupNaive(app)

  // 注册全局自定义指令，如：v-permission权限指令
  setupDirectives(app)

  // 挂载状态管理
  setupStore(app)

  // 优先挂载一下 Provider 解决路由守卫，Axios中可使用，Dialog，Message 等之类组件
  appProvider.mount('#appProvider', true)

  // 挂载路由
  await setupRouter(app)

  // 路由准备就绪后挂载APP实例
  await router.isReady()

  // Store 准备就绪后处理主题色
  setHtmlTheme()

  // 语言注册
  app.use(i18n)

  app.mount('#app', true)
}

void appInit()
