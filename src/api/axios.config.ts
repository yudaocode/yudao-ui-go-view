import { ModuleTypeEnum } from '@/enums/httpEnum'

// 接口白名单（免登录）
export const fetchAllowList = [
  `${ModuleTypeEnum.SYSTEM}/login`
]

// 接口黑名单
export const fetchBlockList = []