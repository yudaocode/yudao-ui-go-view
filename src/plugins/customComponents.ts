import type { App } from 'vue'
import { Skeleton } from '@/components/Skeleton'

/**
 * 全局注册自定义组件 待完善
 * @param app
 */
export function setupCustomComponents(app: App) {
  app.component('Skeleton', Skeleton)
}
