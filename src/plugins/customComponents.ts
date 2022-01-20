import type { App } from 'vue'
import { Skeleton } from '@/components/Skeleton'
import { LoadingComponent } from '@/components/LoadingComponent'

/**
 * 全局注册自定义组件
 * @param app
 */
export function setupCustomComponents(app: App) {
  app.component('Skeleton', Skeleton)
  app.component('LoadingComponent', LoadingComponent)
}
