import {
  HistoryTargetTypeEnum,
  HistoryActionTypeEnum
} from './chartHistoryStore.d'

export const historyActionTypeName = {
  [HistoryActionTypeEnum.ADD]: '新增图表',
  [HistoryActionTypeEnum.DELETE]: '删除图表',
  [HistoryActionTypeEnum.UPDATE]: '修改属性',
  [HistoryActionTypeEnum.MOVE]: '移动图表',
  [HistoryActionTypeEnum.PASTE]: '粘贴图表',
  [HistoryActionTypeEnum.LARYER]: '改变层级',
  [HistoryActionTypeEnum.SELECT_HISTORY]: '选择记录',
  
  [HistoryTargetTypeEnum.CANVAS]: '画布初始化'
}
