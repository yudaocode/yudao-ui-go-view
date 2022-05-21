import { http } from '@/api/http'
import { httpErrorHandle } from '@/utils'
import { RequestHttpEnum, ModuleTypeEnum } from '@/enums/httpEnum'

// * 登录
export const loginApi = async (data: object) => {
  try {
    const res = await http(RequestHttpEnum.POST)(`${ModuleTypeEnum.SYSTEM}/login`, data);
    return res;
  } catch {
    httpErrorHandle();
  }
}

// * 登出
export const logoutApi = async () => {
  try {
    const res = await http(RequestHttpEnum.GET)(`${ModuleTypeEnum.SYSTEM}/logout`);
    return res;
  } catch(err) {
    httpErrorHandle();
  }
}