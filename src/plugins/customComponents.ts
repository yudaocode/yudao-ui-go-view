import type { App } from 'vue'
import { GoSkeleton } from '@/components/GoSkeleton'
import { LoadingComponent } from '@/components/LoadingComponent'
import { SketchRule } from 'vue3-sketch-ruler'

/**
 * 全局注册自定义组件
 * @param app
 */
export function setupCustomComponents(app: App) {
  app.component('GoSkeleton', GoSkeleton)
  app.component('LoadingComponent', LoadingComponent)
  app.component('SketchRule', SketchRule)
}
