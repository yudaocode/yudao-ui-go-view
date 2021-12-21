import { ResultEnum } from '@/enums/httpEnum'
import { ErrorPageNameMap, PageEnum } from '@/enums/pageEnum'
import router from '@/router'
import { docPath, giteeSourceCodePath } from '@/settings/pathConst'

/**
 * * 根据名字跳转路由
 * @param pageName
 */
export const routerTurnByName = (pageName: string, isReplace?: boolean, windowOpen?: boolean) => {
  if (windowOpen) {
    const path = router.resolve({
      name: pageName
    })
    openNewWindow(path.href)
    return
  }
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
 * * 新开页面
 * @param url
 */
 export const openNewWindow = (url: string) => {
  window.open(url, 'blank')
}

/**
 * * 打开项目文档
 * @param url
 */
export const openDoc = () => {
  openNewWindow(docPath)
}

/**
 * * 打开码云仓库地址
 * @param url
 */
export const openGiteeSourceCode = () => {
  openNewWindow(giteeSourceCodePath)
}

