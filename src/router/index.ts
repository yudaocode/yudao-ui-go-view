import type { App } from 'vue';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { RedirectRoute } from '@/router/base';
import { createRouterGuards } from './router-guards';
import { PageEnum } from '@/enums/pageEnum';
import modules from '@/router/modules'

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
      modules.projectRoutes
    ]
  }
]

export const LoginRoute: RouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/login/index.vue'),
  meta: {
    title: '登录',
  },
};

export const constantRouter: any[] = [LoginRoute, ...RootRoute, RedirectRoute];

console.log(constantRouter)

const router = createRouter({
  history: createWebHashHistory(''),
  routes: constantRouter,
  strict: true,
})

export function setupRouter(app: App) {
  app.use(router);
  // 创建路由守卫
  createRouterGuards(router);
}
export default router
