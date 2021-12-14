import type { App } from 'vue'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { RedirectRoute } from '@/router/base'
import { createRouterGuards } from './router-guards'
import { PageEnum } from '@/enums/pageEnum'
import modules from '@/router/modules'
import { HttpErrorPage, LoginRoute } from '@/router/base'

const RootRoute: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Root',
    redirect: PageEnum.BASE_HOME_NAME,
    component: () => import('@/app.vue'),
    meta: {
      title: 'Root',
    },
    children: [
      ...HttpErrorPage,
      modules.projectRoutes
    ]
  }
]


export const constantRouter: any[] = [LoginRoute, ...RootRoute, RedirectRoute];

const router = createRouter({
  history: createWebHashHistory(''),
  routes: constantRouter,
  strict: true,
})

export function setupRouter(app: App) {
  app.use(router);
  // 创建路由守卫
  createRouterGuards(router)
}
export default router
