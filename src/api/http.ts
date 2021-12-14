import axiosInstance from './axios'
import { RequestEnum, ContentTypeEnum } from '@/enums/httpEnum'

// 缓存处理
const filterUrl = (url: string) => {
  return url.indexOf('?') !== -1 ? `${url}&time=${new Date().getTime()}` : `${url}?time=${new Date().getTime()}`
}

export const get = (params: object, url: string) => {
  return axiosInstance({
    url: filterUrl(url),
    method: RequestEnum.GET,
    params
  })
}

export const post = (params: object, url: string, headersType: string) => {
  return axiosInstance({
    url: url,
    method: RequestEnum.POST,
    data: params,
    headers: {
      'Content-Type': headersType || ContentTypeEnum.JSON
    }
  })
}

export const del = (params: object, url: string) => {
  return axiosInstance({
    url: filterUrl(url),
    method: RequestEnum.DELETE,
    params
  })
}