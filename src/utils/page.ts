import { useRoute } from 'vue-router'
import { ResultEnum } from '@/enums/httpEnum'
import { ErrorPageNameMap, PageEnum } from '@/enums/pageEnum'
import router from '@/router'
import { docPath, giteeSourceCodePath } from '@/settings/pathConst'
import { goDialog } from '@/utils/plugin'

/**
 * * 根据名字跳转路由
 * @param pageName
 * @param isReplace
 * @param windowOpen
 */
export const routerTurnByName = (
  pageName: string,
  isReplace?: boolean,
  windowOpen?: boolean
) => {
  if (windowOpen) {
    const path = fetchPathByName(pageName, 'href')
    openNewWindow(path)
    return
  }
  if (isReplace) {
    router.replace({
      name: pageName,
    })
    return
  }
  router.push({
    name: pageName,
  })
}

/**
 * * 根据名称获取路由信息
 * @param pageName
 * @param pageName
 */
export const fetchPathByName = (pageName: string, p?: string) => {
  const pathData = router.resolve({
    name: pageName,
  })
  return p ? (pathData as any)[p] : pathData
}

/**
 * * 根据路径跳转路由
 * @param path
 * @param query
 * @param isReplace
 * @param windowOpen
 */
export const routerTurnByPath = (
  path: string,
  query?: Array<string | number>,
  isReplace?: boolean,
  windowOpen?: boolean
) => {
  let fullPath = ''
  if (query?.length) {
    fullPath = `${path}/${query.join('/')}`
  }
  if (windowOpen) {
    openNewWindow(fullPath)
    return
  }
  if (isReplace) {
    router.replace({
      path: fullPath,
    })
    return
  }
  router.push({
    path: fullPath,
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
 * * 重新加载当前路由页面
 */
export const reloadRoutePage = () => {
  routerTurnByName(PageEnum.RELOAD_NAME)
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
  window.open(url, '_blank')
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

/**
 * * 获取当前路由下的参数
 * @returns object
 */
export const fetchRouteParams = () => {
  const route = useRoute()
  return route.params
}

/**
 * * 是否需要确认
 * @param confirm
 */
export const goHome = (confirm?: boolean, message?: string) => {
  if (confirm) {
    goDialog({
      message,
      onPositiveCallback: () => {
        routerTurnByName(PageEnum.BASE_HOME_NAME)
      },
    })
  }
}
