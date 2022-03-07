import type { App } from 'vue'
import { Skeleton } from '@/components/Skeleton'
import { LoadingComponent } from '@/components/LoadingComponent'
import { getLocalStorageInfo } from '@/views/preview/utils/index'
import { fetchChartComponent } from '@/packages/index'
import { CreateComponentType } from '@/packages/index.d'

/**
 * * 预览页面动态注册 package 组件
 * @param app
 */
export const setupPreviewPackages = (app: App) => {
  if (document.location.hash.includes('preview')) {
    const localStorageInfo = getLocalStorageInfo()
    if (!localStorageInfo) return
    localStorageInfo.componentList.forEach(async (e: CreateComponentType) => {
      if (!app.component(e.key)) {
        const chart = fetchChartComponent(e.chartConfig)
        app.component(e.key, chart)
      }
    })
  }
}

/**
 * 全局注册自定义组件
 * @param app
 */
export function setupCustomComponents(app: App) {
  app.component('Skeleton', Skeleton)
  app.component('LoadingComponent', LoadingComponent)
}
