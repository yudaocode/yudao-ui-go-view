import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { ResultEnum, RequestHttpHeaderEnum } from "@/enums/httpEnum"
import { PageEnum, ErrorPageNameMap } from "@/enums/pageEnum"
import { StorageEnum } from '@/enums/storageEnum'
import { axiosPre } from '@/settings/httpSetting'
import { SystemStoreEnum, SystemStoreUserInfoEnum } from '@/store/modules/systemStore/systemStore.d'
import { redirectErrorPage, getLocalStorage, routerTurnByName } from '@/utils'
import { fetchAllowList } from './axios.config'
import includes from 'lodash/includes'

interface MyResponseType {
  code: number;
  msg: string;
  data: any;
}

const axiosInstance = axios.create({
  baseURL: axiosPre,
  timeout: ResultEnum.TIMEOUT,
})

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 白名单校验
    if (includes(fetchAllowList, config.url)) return config
    // 获取 token
    const info = getLocalStorage(StorageEnum.GO_SYSTEM_STORE)
    // 重新登录
    if (!info) return routerTurnByName(PageEnum.BASE_LOGIN_NAME)
    config.headers = {
      [RequestHttpHeaderEnum.TOKEN]: info[SystemStoreEnum.USER_INFO][SystemStoreUserInfoEnum.USER_TOKEN] || ''
    }
    return config
  },
  (error: AxiosRequestConfig) => {
    Promise.reject(error)
  }
)

// 响应拦截器
axiosInstance.interceptors.response.use(
  (res: AxiosResponse) => {
    const { code } = res.data as { code: number }

    // 成功
    if (code === ResultEnum.SUCCESS) {
      return Promise.resolve(res.data)
    }

    // 登录过期
    if (code === ResultEnum.TOKEN_OVERDUE) {
      window['$message'].error(window['$t']('http.token_overdue_message'))
      routerTurnByName(PageEnum.BASE_LOGIN_NAME)
      return
    }

    // 固定错误码重定向
    if (ErrorPageNameMap.get(code)) {
      redirectErrorPage(code)
      return
    }
    
    // 提示错误
    window['$message'].error(window['$t']((res.data as any).msg))
    return Promise.resolve(res.data)
  },
  (err: AxiosResponse) => {
    const { code } = err.data as { code: number }
    if (ErrorPageNameMap.get(code)) redirectErrorPage(code)
    window['$message'].error(window['$t']('http.error_message'))
    Promise.reject(err)
  }
)

export default axiosInstance
