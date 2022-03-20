import axiosInstance from './axios'
import { RequestEnum, ContentTypeEnum } from '@/enums/httpEnum'

export const get = (url: string, params: object) => {
  return axiosInstance({
    url: url,
    method: RequestEnum.GET,
    params,
  })
}

export const post = (url: string, params: object, headersType: string) => {
  return axiosInstance({
    url: url,
    method: RequestEnum.POST,
    data: params,
    headers: {
      'Content-Type': headersType || ContentTypeEnum.JSON,
    },
  })
}

export const del = (url: string, params: object) => {
  return axiosInstance({
    url: url,
    method: RequestEnum.DELETE,
    params,
  })
}

export default {
  get,
  post,
  del,
}
