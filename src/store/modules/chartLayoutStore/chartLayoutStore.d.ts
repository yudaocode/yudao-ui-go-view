import { ThemeEnum } from '@/enums/styleEnum'

export enum ChartLayoutFilterEnum {
  HUEROTATE = 'hueRotate',
  SATURATE = 'saturate',
  BRIGHTNESS = 'brightness',
  CONTRAST = 'contrast',
  UNOPACITY = 'unOpacity',
}

export interface ChartLayoutFilterType {
  // 色相
  [ChartLayoutFilterEnum.HUEROTATE]: number
  // 饱和度
  [ChartLayoutFilterEnum.SATURATE]: number
  // 亮度
  [ChartLayoutFilterEnum.BRIGHTNESS]: number
  // 对比度
  [ChartLayoutFilterEnum.CONTRAST]: number
  // 不透明度
  [ChartLayoutFilterEnum.UNOPACITY]: number
}

export enum ChartLayoutStoreEnum {
  LAYERS = 'layers',
  CHARTS = 'charts',
  DETAILS = 'details',
  ALIGNLINE = 'alignLine',
  FILTER = 'filter',
}

export interface ChartLayoutType {
  // 图层控制
  [ChartLayoutStoreEnum.LAYERS]: boolean
  // 图表组件
  [ChartLayoutStoreEnum.CHARTS]: boolean
  // 详情设置
  [ChartLayoutStoreEnum.DETAILS]: boolean
  // 对齐线
  [ChartLayoutStoreEnum.ALIGNLINE]: boolean
  // 滤镜
  [ChartLayoutStoreEnum.FILTER]: ChartLayoutFilterType
}
