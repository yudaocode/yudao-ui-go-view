import { CreateComponentType } from '@/packages/index.d'
import { HistoryActionTypeEnum } from '@/store/modules/chartHistoryStore/chartHistoryStore.d'

// 编辑画布属性
export enum EditCanvasTypeEnum {
  EDIT_LAYOUT_DOM = 'editLayoutDom',
  EDIT_CONTENT_DOM = 'editContentDom',
  OFFSET = 'offset',
  SCALE = 'scale',
  USER_SCALE = 'userScale',
  LOCK_SCALE = 'lockScale',
}

// 编辑区域
export type EditCanvasType = {
  // 编辑区域 DOM
  [EditCanvasTypeEnum.EDIT_LAYOUT_DOM]: HTMLElement | null
  [EditCanvasTypeEnum.EDIT_CONTENT_DOM]: HTMLElement | null
  // 偏移大小
  [EditCanvasTypeEnum.OFFSET]: number
  // 缩放
  [EditCanvasTypeEnum.SCALE]: number
  // 缩放
  [EditCanvasTypeEnum.USER_SCALE]: number
  // 锁定缩放
  [EditCanvasTypeEnum.LOCK_SCALE]: boolean
}

// 滤镜
export enum EditCanvasConfigEnum {
  WIDTH = 'width',
  HEIGHT = 'height',
  HUE_ROTATE = 'hueRotate',
  SATURATE = 'saturate',
  BRIGHTNESS = 'brightness',
  CONTRAST = 'contrast',
  UN_OPACITY = 'unOpacity',
  CHART_THEME = 'chartTheme',
  BACKGROUND = 'background',
  BACKGROUND_IAMGE = 'backgroundImage',
  SELECT_COLOR = 'selectColor'
}

export interface EditCanvasConfigType {
  // 大屏宽度
  [EditCanvasConfigEnum.WIDTH]: number
  // 大屏高度
  [EditCanvasConfigEnum.HEIGHT]: number
  // 色相
  [EditCanvasConfigEnum.HUE_ROTATE]: number
  // 饱和度
  [EditCanvasConfigEnum.SATURATE]: number
  // 亮度
  [EditCanvasConfigEnum.BRIGHTNESS]: number
  // 对比度
  [EditCanvasConfigEnum.CONTRAST]: number
  // 不透明度
  [EditCanvasConfigEnum.UN_OPACITY]: number
  // 背景色
  [EditCanvasConfigEnum.BACKGROUND]?: string
  [EditCanvasConfigEnum.BACKGROUND_IAMGE]?: string | ArrayBuffer | null
  // 图表主题颜色
  [EditCanvasConfigEnum.CHART_THEME]: string
  // 图表主题颜色
  [EditCanvasConfigEnum.SELECT_COLOR]: boolean
}

// 坐标轴信息
export enum EditCanvasTypeEnum {
  X = 'x',
  Y = 'y'
}

// 鼠标位置
export type MousePositionType = {
  // X 轴
  [EditCanvasTypeEnum.X]: number
  // y 轴
  [EditCanvasTypeEnum.Y]: number
}

// 操作目标
export type TargetChartType = {
  hoverId?: string
  selectId?: string
}

// 数据记录
export type RecordChartType = {
  charts: CreateComponentType | CreateComponentType[]
  type: HistoryActionTypeEnum.CUT | HistoryActionTypeEnum.COPY
}

// Store 枚举
export enum ChartEditStoreEnum {
  EDIT_RANGE = 'editRange',
  EDIT_CANVAS = 'editCanvas',
  EDIT_CANVAS_CONFIG = 'editCanvasConfig',
  RIGHT_MENU_SHOW = 'rightMenuShow',
  MOUSE_POSITION = 'mousePosition',
  TARGET_CHART = 'targetChart',
  RECORD_CHART = 'recordChart',
  COMPONENT_LIST = 'componentList'
}

// Store 类型
export interface chartEditStoreType {
  [ChartEditStoreEnum.EDIT_CANVAS]: EditCanvasType
  [ChartEditStoreEnum.EDIT_CANVAS_CONFIG]: EditCanvasConfigType
  [ChartEditStoreEnum.RIGHT_MENU_SHOW]: boolean
  [ChartEditStoreEnum.MOUSE_POSITION]: MousePositionType
  [ChartEditStoreEnum.TARGET_CHART]: TargetChartType
  [ChartEditStoreEnum.RECORD_CHART]?: RecordChartType
  [ChartEditStoreEnum.COMPONENT_LIST]: CreateComponentType[]
}
