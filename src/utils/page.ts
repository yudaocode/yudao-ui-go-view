import { ResultEnum } from '@/enums/httpEnum'
import { ErrorPageNameMap, PageEnum } from '@/enums/pageEnum'
import router from '@/router'
import { docPath, giteeSourceCodePath } from '@/settings/pathConst'

/**
 * * 根据名字跳转路由
 * @param pageName
 */
export const routerTurnByName = (pageName: string, isReplace?: boolean) => {
  if (isReplace) {
    router.replace({
      name: pageName
    })
    return
  }
  router.push({
    name: pageName
  })
}

/**
 * * 错误页重定向
 * @param icon
 * @returns
 */
export const redirectErrorPage = (code: ResultEnum) => {
  if (!code) return false
  const pageName = ErrorPageNameMap.get(code)
  if (!pageName) return false
  routerTurnByName(pageName)
}

/**
 * * 退出
 */
export const logout = () => {
  routerTurnByName(PageEnum.BASE_LOGIN_NAME)
}

/**
 * * 打开项目文档
 * @param url
 */
export const openDoc = () => {
  window.open(docPath, 'blank')
}

/**
 * * 打开码云仓库地址
 * @param url
 */
export const openGiteeSourceCode = () => {
  window.open(giteeSourceCodePath, 'blank')
}

/**
 * * 新开页面
 * @param url
 */
export const openNewWindow = (url: string) => {
  window.open(url, 'blank')
}
