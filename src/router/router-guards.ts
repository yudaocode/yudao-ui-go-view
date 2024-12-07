import { Router } from 'vue-router';
import { PageEnum, PreviewEnum } from '@/enums/pageEnum'
import {loginCheck, setSessionStorage} from '@/utils'
const viteRouter = import.meta.env.VITE_ROUTER_DEFAULT
// 路由白名单
const routerAllowList = [
  // 登录
  PageEnum.BASE_LOGIN_NAME,
  // 预览
  // PreviewEnum.CHART_PREVIEW_NAME
]

export function createRouterGuards(router: Router) {
  // 前置
  router.beforeEach(async (to, from, next) => {
    // http://localhost:3000/#/chart/preview/792622755697790976?t=123
    // 把外部动态参数放入window.route.params，后续API动态接口可以用window.route?.params?.t来拼接参数
    // @ts-ignore
    if (!window.route) window.route = {params: {}}
    // @ts-ignore
    Object.assign(window.route.params, to.query)

    const Loading = window['$loading'];
    Loading && Loading.start();
    const isErrorPage = router.getRoutes().findIndex((item) => item.name === to.name);
    console.log(router.getRoutes())
    if (isErrorPage === -1) {
      next({ name: PageEnum.ERROR_PAGE_NAME_404 })
      return
    }
    console.log(to)
    // @ts-ignore
    console.log(!routerAllowList.includes(to.name), !loginCheck())
    // @ts-ignore
    console.log('路由开关:',viteRouter==='false')
    console.log('路由开关2:',viteRouter,!viteRouter,!!viteRouter)
    console.log(!routerAllowList.includes(<PageEnum>to.name),!loginCheck())
    if (!routerAllowList.includes(<PageEnum>to.name)&&!loginCheck()) {
        if(PreviewEnum.CHART_PREVIEW_NAME === to.name&& viteRouter==='false'){
          console.log(to.fullPath,'存储临时跳回路径与查询ID')
          setSessionStorage('setRedirectPath','/chart/preview')
          setSessionStorage('setRedirectPathId',to.params.id[0])
        }
        console.log('test...login....')
        next({ name: PageEnum.BASE_LOGIN_NAME })
    }
    console.log('test。。。next。。。')
    console.log("现地址",to.path,"重定向前地址",to.redirectedFrom?.path)
    next()
  })

  router.afterEach((to, _, failure) => {
    const Loading = window['$loading'];
    document.title = (to?.meta?.title as string) || document.title;
    Loading && Loading.finish();
  })

  // 错误
  router.onError((error) => {
    console.log(error, '路由错误');
  });
}