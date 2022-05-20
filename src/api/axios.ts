import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { ResultEnum } from "@/enums/httpEnum"
import { ErrorPageNameMap } from "@/enums/pageEnum"
import { redirectErrorPage } from '@/utils'
import { axiosPre } from '@/settings/httpSetting'

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
    config.headers = {}
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
    if (code === ResultEnum.DATA_SUCCESS) return Promise.resolve(res.data)
    // 重定向
    if (ErrorPageNameMap.get(code)) redirectErrorPage(code)
    return Promise.resolve(res.data)
  },
  (err: AxiosResponse) => {
    const { code } = err.data as { code: number }
    if (ErrorPageNameMap.get(code)) redirectErrorPage(code)
    window['$message'].error('接口异常，请检查！')
    Promise.reject(err)
  }
)

export default axiosInstance
