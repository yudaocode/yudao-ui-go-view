import { CreateComponentType } from '@/packages/index.d'
import { ChartLayoutType } from '@/store/modules/chartLayoutStore/chartLayoutStore.d'

// 操作类型枚举
export enum HistoryActionTypeEnum {
  // 新增
  ADD = 'add',
  // 删除
  DELETE = 'delete',
  // 更新（位置，属性）
  UPDATE = 'update',
  // 移动
  MOVE = 'move',
  // 复制
  COPY = 'copy',
  // 剪切
  CUT = 'cut',
  // 粘贴
  PASTE = 'paste',
  // 改变层级
  LARYER = 'laryer',
  // 选择历史记录
  SELECT_HISTORY = 'selectHistory'
}

// 对象类型
export enum HistoryTargetTypeEnum {
  CANVAS = 'canvas',
  CHART = 'chart'
}

// 历史栈
export enum HistoryStackEnum {
  BACK_STACK = 'backStack',
  FORWARD_STACK = 'forwardStack'
}

// 历史记录项
export enum HistoryStackItemEnum {
  ID = 'id',
  TARGET_TYPE = 'targetType',
  ACTION_TYPE = 'actionType',
  HISTORY_DATA = 'historyData'
}

// 历史记录项类型
export interface HistoryItemType {
  [HistoryStackItemEnum.ID]: string
  [HistoryStackItemEnum.TARGET_TYPE]: HistoryTargetTypeEnum
  [HistoryStackItemEnum.ACTION_TYPE]: HistoryActionTypeEnum
  [HistoryStackItemEnum.HISTORY_DATA]: CreateComponentType | ChartLayoutType
}

// 历史 Store 类型
export interface ChartHistoryStoreType {
  // 后退栈
  [HistoryStackEnum.BACK_STACK]: Array<HistoryItemType>
  // 前进栈
  [HistoryStackEnum.FORWARD_STACK]: Array<HistoryItemType>
}
