import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { ResultEnum } from "@/enums/httpEnum"
import { ErrorPageNameMap } from "@/enums/pageEnum"
import { redirectErrorPage } from '@/utils/page'

const axiosInstance = axios.create({
  baseURL: import.meta.env.DEV ? import.meta.env.VITE_DEV_PATH : import.meta.env.VITE_PRO_PATH,
  timeout: ResultEnum.TIMEOUT,
})

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.headers = {}
    config.data = {}
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
    return Promise.reject(res.data)
  },
  (err: AxiosResponse) => {
    const { code } = err.data as { code: number }
    if (ErrorPageNameMap.get(code)) redirectErrorPage(code)
    Promise.reject(err)
  }
)

export default axiosInstance
