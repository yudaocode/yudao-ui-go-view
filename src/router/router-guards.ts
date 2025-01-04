import { Router } from 'vue-router';
import { PageEnum, PreviewEnum } from '@/enums/pageEnum'
import {getLocalStorage, loginCheck, setSessionStorage} from '@/utils'
import {useSystemStore} from "@/store/modules/systemStore/systemStore";
const viteRouter = import.meta.env.VITE_ROUTER_DEFAULT
import { SystemStoreUserInfoEnum, SystemStoreEnum } from '@/store/modules/systemStore/systemStore.d'
import {pinia} from "@/store/index"
import {StorageEnum} from "@/enums/storageEnum";
const systemStore = useSystemStore(pinia)
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
    // 如果外部参数中存在accessToken与refreshToken就存储令牌
    // @ts-ignore
    if(window.route.params.accessToken){
      systemStore.setItem(SystemStoreEnum.USER_INFO, {
        // @ts-ignore
        [SystemStoreUserInfoEnum.USER_TOKEN]: window.route.params.accessToken,
        // 如果有刷新令牌就存储刷新令牌如果没有就随便放一个什么等到令牌过去后就会重新登录从而不刷新令牌
        // @ts-ignore
        [SystemStoreUserInfoEnum.USER_REFRESH_TOKEN]: window.route.params.refreshToken?window.route.params.refreshToken:'null',
        [SystemStoreUserInfoEnum.TOKEN_NAME]: "Authorization",
      })
    }
    const Loading = window['$loading'];
    Loading && Loading.start();
    const isErrorPage = router.getRoutes().findIndex((item) => item.name === to.name);
    if (isErrorPage === -1) {
      next({ name: PageEnum.ERROR_PAGE_NAME_404 })
      return
    }
    if (!routerAllowList.includes(<PageEnum>to.name)&&!loginCheck()) {
        if(PreviewEnum.CHART_PREVIEW_NAME === to.name&& viteRouter==='false'){
          setSessionStorage('setRedirectPath','/chart/preview')
          setSessionStorage('setRedirectPathId',to.params.id[0])
        }
        next({ name: PageEnum.BASE_LOGIN_NAME })
    }
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