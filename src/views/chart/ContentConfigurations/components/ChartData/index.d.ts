import { RequestDataTypeEnum } from '@/store/modules/chartEditStore/chartEditStore.d'

// 匹配结果
export enum DataResultEnum {
  NULL = 0,
  SUCCESS = 1,
  FAILURE = 2,
}

export enum TimelineTitleEnum {
  MAPPING = '数据映射',
  CONTENT = '数据内容',
}

export enum SelcetOptionsLableEnum {
  STATIC = '静态数据',
  AJAX = '动态请求',
}

export interface SelectOptionsType {
  label: SelcetOptionsLableEnum
  value: RequestDataTypeEnum
  disabled?: boolean
}
