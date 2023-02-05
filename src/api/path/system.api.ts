import { http } from '@/api/http'
import { httpErrorHandle } from '@/utils'
import { RequestHttpEnum, ModuleTypeEnum } from '@/enums/httpEnum'
import { AuthLoginRespVO } from './system'

// * 登录
export const loginApi = async (data: object) => {
  try {
    const res = await http(RequestHttpEnum.POST)<AuthLoginRespVO>(`${ModuleTypeEnum.SYSTEM}/auth/login`, data)
    console.log(res)
    return res
  } catch (err) {
    httpErrorHandle()
  }
}

// * 登出
export const logoutApi = async () => {
  try {
    const res = await http(RequestHttpEnum.POST)(`${ModuleTypeEnum.SYSTEM}/auth/logout`)
    return res
  } catch (err) {
    httpErrorHandle()
  }
}

// * 获取 oss 上传接口
export const ossUrlApi = async (data: object) => {
  try {
    const res = await http(RequestHttpEnum.GET)<{
      /**
       * bucket 地址
       */
      bucketURL?: string
    }>(`${ModuleTypeEnum.SYSTEM}/getOssInfo`, data)
    return res
  } catch (err) {
    httpErrorHandle()
  }
}
