// 编辑区域大小
export enum EditCanvasTypeEnum {
  EDITLAYOUTDOM = 'editLayoutDom',
  EDITCONTENTDON = 'editContentDom',
  WIDTH = 'width',
  HEIGHT = 'height',
  OFFSET = 'offset',
  SCALE = 'scale',
  USERSCALE = 'userScale',
  LOCKSCALE = 'lockScale',
  BACKGROUND = 'background'
}
export type EditCanvasType = {
  // 编辑区域 DOM
  [EditCanvasTypeEnum.EDITLAYOUTDOM]: HTMLElement | null
  [EditCanvasTypeEnum.EDITCONTENTDON]: HTMLElement | null
  // 大屏宽度
  [EditCanvasTypeEnum.WIDTH]: number
  // 大屏高度
  [EditCanvasTypeEnum.HEIGHT]: number
  // 偏移大小
  [EditCanvasTypeEnum.OFFSET]: number
  // 缩放
  [EditCanvasTypeEnum.SCALE]: number
  // 缩放
  [EditCanvasTypeEnum.USERSCALE]: number
  // 锁定缩放
  [EditCanvasTypeEnum.LOCKSCALE]: boolean
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

// Store 类型
export enum chartEditStoreEnum {
  EDITCANVAS = 'editCanvas',
  MOUSEPOSITION = 'mousePosition'
}
export interface chartEditStoreType {
  [chartEditStoreEnum.EDITCANVAS]: EditCanvasType
  [chartEditStoreEnum.MOUSEPOSITION]: MousePositionType
}
