// 编辑区域大小
export enum EditCanvasTypeEnum {
  EDIT_LAYOUT_DOM = 'editLayoutDom',
  EDIT_CONTENT_DOM = 'editContentDom',
  WIDTH = 'width',
  HEIGHT = 'height',
  OFFSET = 'offset',
  SCALE = 'scale',
  USER_SCALE = 'userScale',
  LOCK_SCALE = 'lockScale',
  BACKGROUND = 'background',
}
export type EditCanvasType = {
  // 编辑区域 DOM
  [EditCanvasTypeEnum.EDIT_LAYOUT_DOM]: HTMLElement | null
  [EditCanvasTypeEnum.EDIT_CONTENT_DOM]: HTMLElement | null
  // 大屏宽度
  [EditCanvasTypeEnum.WIDTH]: number
  // 大屏高度
  [EditCanvasTypeEnum.HEIGHT]: number
  // 偏移大小
  [EditCanvasTypeEnum.OFFSET]: number
  // 缩放
  [EditCanvasTypeEnum.SCALE]: number
  // 缩放
  [EditCanvasTypeEnum.USER_SCALE]: number
  // 锁定缩放
  [EditCanvasTypeEnum.LOCK_SCALE]: boolean
  // 背景色
  [EditCanvasTypeEnum.BACKGROUND]?: string
}

// 坐标轴信息
export enum EditCanvasTypeEnum {
  X = 'x',
  Y = 'y'
}
export type MousePositionType = {
  // X 轴
  [EditCanvasTypeEnum.X]: number
  // y 轴
  [EditCanvasTypeEnum.Y]: number
}

// 操作目标
export type TargetChartType = {
  index: number
}

// Store 类型
export enum chartEditStoreEnum {
  EDITCANVAS = 'editCanvas',
  MOUSEPOSITION = 'mousePosition',
  COMPONENT_LIST = 'componentList',
  TARGET_CHART = 'targetChart'
}

export interface chartEditStoreType {
  [chartEditStoreEnum.EDITCANVAS]: EditCanvasType
  [chartEditStoreEnum.MOUSEPOSITION]: MousePositionType
  [chartEditStoreEnum.TARGET_CHART]: TargetChartType
  [chartEditStoreEnum.COMPONENT_LIST]: any[]
}
