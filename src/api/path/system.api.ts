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
