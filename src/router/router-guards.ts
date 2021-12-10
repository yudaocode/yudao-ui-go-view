import type { RouteRecordRaw } from 'vue-router';
import { Router } from 'vue-router';
import { ErrorPageRoute } from '@/router/base';

export function createRouterGuards(router: Router) {
  // 前置
  router.beforeEach(async (to, from, next) => {
    const Loading = window['$loading'] || null;
    Loading && Loading.start();

    //添加404
    const isErrorPage = router.getRoutes().findIndex((item) => item.name === ErrorPageRoute.name);
    if (isErrorPage === -1) {
      router.addRoute(ErrorPageRoute as unknown as RouteRecordRaw);
    }

    next()
    Loading && Loading.finish();
  })

  router.afterEach((to, _, failure) => {
    document.title = (to?.meta?.title as string) || document.title;
    const Loading = window['$loading'] || null;
    Loading && Loading.finish();
  })

  // 错误
  router.onError((error) => {
    console.log(error, '路由错误');
  });
}