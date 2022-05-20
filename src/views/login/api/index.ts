import { http } from '@/api/http'
import { httpErrorHandle } from '@/utils'
import { RequestHttpEnum, ModuleTypeEnum } from '@/enums/httpEnum'

// 登录
export const loginRequest = async (data: object) => {
  try {
    const res = await http(RequestHttpEnum.POST)(`${ModuleTypeEnum.SYSTEM}/login`, data);
    return res;
  } catch {
    httpErrorHandle();
  }
}