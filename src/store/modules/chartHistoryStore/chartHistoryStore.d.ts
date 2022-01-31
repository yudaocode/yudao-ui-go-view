import { CreateComponentType } from '@/packages/index.d'

// 操作类型枚举
export enum HistoryTypeEnum {
  ADD = 'add',
  DELETE = 'delete',
  MOVE = 'move',
  SELECT_HISTORY = 'selectHistory'
}

// 历史栈
export enum HistoryStackEnum {
  BACK_STACK= 'backStack',
  FORWARD_STACK= 'forwardStack',
}

// 历史记录项类型
export interface HistoryItemType extends  CreateComponentType {
  historyType: HistoryTypeEnum
}

// 历史 Store 类型
export interface ChartHistoryStoreType {
  // 后退栈
  [HistoryStackEnum.BACK_STACK]: Array<HistoryItemType>,
  // 前进栈
  [HistoryStackEnum.FORWARD_STACK]: Array<HistoryItemType>,
}