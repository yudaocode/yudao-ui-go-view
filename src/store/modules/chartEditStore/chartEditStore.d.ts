import { CreateComponentType } from '@/packages/index.d'
import { HistoryActionTypeEnum } from '@/store/modules/chartHistoryStore/chartHistoryStore.d'
import type {
  ChartColorsNameType,
  GlobalThemeJsonType
} from '@/settings/chartThemes/index'

// 编辑画布属性
export enum EditCanvasTypeEnum {
  EDIT_LAYOUT_DOM = 'editLayoutDom',
  EDIT_CONTENT_DOM = 'editContentDom',
  OFFSET = 'offset',
  SCALE = 'scale',
  USER_SCALE = 'userScale',
  LOCK_SCALE = 'lockScale',
  IS_DRAG = 'isDrag'
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
  // 拖拽中
  [EditCanvasTypeEnum.IS_DRAG]: boolean
}

// 滤镜/背景色/宽高主题等
export enum EditCanvasConfigEnum {
  WIDTH = 'width',
  HEIGHT = 'height',
  HUE_ROTATE = 'hueRotate',
  SATURATE = 'saturate',
  BRIGHTNESS = 'brightness',
  CONTRAST = 'contrast',
  UN_OPACITY = 'unOpacity',
  CHART_THEME_COLOR = 'chartThemeColor',
  CHART_THEME_SETTING = 'chartThemeSetting',
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
  [EditCanvasConfigEnum.BACKGROUND_IAMGE]?: string | null
  // 图表主题颜色
  [EditCanvasConfigEnum.CHART_THEME_COLOR]: ChartColorsNameType
  // 图表全局配置
  [EditCanvasConfigEnum.CHART_THEME_SETTING]: GlobalThemeJsonType
  // 图表主题颜色
  [EditCanvasConfigEnum.SELECT_COLOR]: boolean
}

// 坐标轴信息
export enum EditCanvasTypeEnum {
  START_X = 'startX',
  START_Y = 'startY',
  X = 'x',
  Y = 'y'
}

// 鼠标位置
export type MousePositionType = {
  // 开始 X
  [EditCanvasTypeEnum.START_X]: number
  // 开始 Y
  [EditCanvasTypeEnum.START_Y]: number
  // X
  [EditCanvasTypeEnum.X]: number
  // y
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
  RIGHT_MENU_SHOW = 'rightMenuShow',
  MOUSE_POSITION = 'mousePosition',
  TARGET_CHART = 'targetChart',
  RECORD_CHART = 'recordChart',
  // 以下需要存储
  EDIT_CANVAS_CONFIG = 'editCanvasConfig',
  REQUEST_CONFIG = 'requestConfig',
  COMPONENT_LIST = 'componentList'
}

// 数据相关
export enum RequestDataTypeEnum {
  // 静态数据
  STATIC,
  // 请求数据
  AJAX
}

// 数据配置
export type RequestConfigType = {
  // 获取数据的方式
  requestDataType: RequestDataTypeEnum
  // 请求源地址
  requestUrl?: string
  requestInterval?: number
}

// Store 类型
export interface ChartEditStoreType {
  [ChartEditStoreEnum.EDIT_CANVAS]: EditCanvasType
  [ChartEditStoreEnum.EDIT_CANVAS_CONFIG]: EditCanvasConfigType
  [ChartEditStoreEnum.RIGHT_MENU_SHOW]: boolean
  [ChartEditStoreEnum.MOUSE_POSITION]: MousePositionType
  [ChartEditStoreEnum.TARGET_CHART]: TargetChartType
  [ChartEditStoreEnum.RECORD_CHART]?: RecordChartType
  [ChartEditStoreEnum.REQUEST_CONFIG]: RequestConfigType
  [ChartEditStoreEnum.COMPONENT_LIST]: CreateComponentType[]
}

export interface ChartEditStorage {
  [ChartEditStoreEnum.EDIT_CANVAS_CONFIG]: EditCanvasConfigType
  [ChartEditStoreEnum.REQUEST_CONFIG]: RequestConfigType
  [ChartEditStoreEnum.COMPONENT_LIST]: CreateComponentType[]
}
