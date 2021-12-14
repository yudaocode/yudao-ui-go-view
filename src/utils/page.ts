import { ResultEnum } from "@/enums/httpEnum"
import { ErrorPageNameMap } from "@/enums/pageEnum"
import router from '@/router';

/**
 * * 错误页重定向
 * @param icon 
 * @returns 
 */
export const redirectErrorPage = (code: ResultEnum) => {
  if(!code) return false
  const pageName = ErrorPageNameMap.get(code)
  if(!pageName) return false
  routerTurnByName(pageName)
}

/**
 * * 根据名字跳转路由
 * @param pageName 
 */
export const routerTurnByName = (pageName: string) => {
  router.push({
    name: pageName
  })
}