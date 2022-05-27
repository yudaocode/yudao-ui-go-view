import { http } from '@/api/http'
import { httpErrorHandle } from '@/utils'
import { ContentTypeEnum, RequestHttpEnum, ModuleTypeEnum } from '@/enums/httpEnum'

// * 项目列表
export const projectListApi = async (data: object) => {
  try { 
    const res = await http(RequestHttpEnum.GET)(`/api/goview/${ModuleTypeEnum.PROJECT}/list`, data);
    return res;
  } catch {
    httpErrorHandle();
  }
}

// * 新增项目
export const createProjectApi = async (data: object) => {
  try { 
    const res = await http(RequestHttpEnum.POST)(`/api/goview/${ModuleTypeEnum.PROJECT}/create`, data);
    return res;
  } catch {
    httpErrorHandle();
  }
}

// * 获取项目
export const fetchProjectApi = async (data: object) => {
  try { 
    const res = await http(RequestHttpEnum.GET)(`/api/goview/${ModuleTypeEnum.PROJECT}/getData`, data);
    return res;
  } catch {
    httpErrorHandle();
  }
}

// * 保存项目
export const saveProjectApi = async (data: object) => {
  try { 
    const res = await http(RequestHttpEnum.POST)(`/api/goview/${ModuleTypeEnum.PROJECT}/save/data`, data, ContentTypeEnum.FORM_URLENCODED);
    return res;
  } catch {
    httpErrorHandle();
  }
}

// * 修改项目基础信息
export const updateProjectApi = async (data: object) => {
  try {
    const res = await http(RequestHttpEnum.POST)(`/api/goview/${ModuleTypeEnum.PROJECT}/edit`, data);
    return res;
  } catch {
    httpErrorHandle();
  }
}


// * 删除项目
export const deleteProjectApi = async (data: object) => {
  try { 
    const res = await http(RequestHttpEnum.DELETE)(`/api/goview/${ModuleTypeEnum.PROJECT}/delete`, data);
    return res;
  } catch {
    httpErrorHandle();
  }
}

// * 修改发布状态 [-1未发布,1发布]
export const changeProjectReleaseApi = async (data: object) => {
  try { 
    const res = await http(RequestHttpEnum.PUT)(`/api/goview/${ModuleTypeEnum.PROJECT}/publish`, data);
    return res;
  } catch {
    httpErrorHandle();
  }
}

// * 上传文件
export const uploadFile = async (data: object) => {
  try { 
    const res = await http(RequestHttpEnum.POST)(`oss/object/v2-cloud`, data, ContentTypeEnum.FORM_DATA);
    return res;
  } catch {
    httpErrorHandle();
  }
}