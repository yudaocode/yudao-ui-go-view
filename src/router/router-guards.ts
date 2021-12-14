import { Router } from 'vue-router';
import { PageEnum } from '@/enums/pageEnum'

export function createRouterGuards(router: Router) {
  // 前置
  router.beforeEach(async (to, from, next) => {
    const Loading = window['$loading'] || null;
    Loading && Loading.start();

    console.log(to)
    const isErrorPage = router.getRoutes().findIndex((item) => item.name === to.name);
    if (isErrorPage === -1) {
      next({ name: PageEnum.ERROR_PAGE_NAME_404 })
    }
    next()
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