import { http } from '@/api/http'
import { httpErrorHandle } from '@/utils'
import { RequestHttpEnum, ModuleTypeEnum } from '@/enums/httpEnum'

// * 新增项目
export const createProjectApi = async (data: object) => {
  try { 
    const res = await http(RequestHttpEnum.POST)(`${ModuleTypeEnum.SYSTEM}/project/create`, data);
    return res;
  } catch {
    httpErrorHandle();
  }
}