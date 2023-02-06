import { http } from '@/api/http'
import { httpErrorHandle } from '@/utils'
import { RequestHttpEnum, ModuleTypeEnum } from '@/enums/httpEnum'
import {AuthLoginRespVO, ProfileVO} from './system'

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

// 查询用户个人信息
export const getUserProfileApi = async () => {
  try {
    const res = await http(RequestHttpEnum.GET)<ProfileVO>(`${ModuleTypeEnum.SYSTEM}/user/profile/get`)
    return res
  } catch (err) {
    httpErrorHandle()
  }
}


// 获取验证图片  以及token
export const getCodeApi = async (data: any) => {
  try {
    const res = await http(RequestHttpEnum.POST)(`${ModuleTypeEnum.SYSTEM}/captcha/get`, data)
    return res.data
  } catch (err) {
    httpErrorHandle()
  }
}

// 滑动或者点选验证
export const reqCheckApi = async (data: any) => {
  try {
    const res = await http(RequestHttpEnum.POST)(`${ModuleTypeEnum.SYSTEM}/captcha/check`, data)
    return res.data
  } catch (err) {
    httpErrorHandle()
  }
}

// 使用租户名，获得租户编号
export const getTenantIdByNameApi = async (name: string) => {
  try {
    const res = await http(RequestHttpEnum.GET)(`${ModuleTypeEnum.SYSTEM}/tenant/get-id-by-name?name=` + name)
    return res
  } catch (err) {
    httpErrorHandle()
  }
}
