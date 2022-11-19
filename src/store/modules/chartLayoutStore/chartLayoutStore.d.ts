export enum ChartModeEnum {
  SINGLE= 'single',
  DOUBLE = 'double'
}

export enum LayerModeEnum {
  THUMBNAIL = 'thumbnail',
  TEXT = 'text'
}

export enum ChartLayoutStoreEnum {
  LAYERS = 'layers',
  CHARTS = 'charts',
  DETAILS = 'details',
  Chart_TYPE = 'chartType',
  LAYER_TYPE = 'layerType'
}

export interface ChartLayoutType {
  // 图层控制
  [ChartLayoutStoreEnum.LAYERS]: boolean
  // 图表组件
  [ChartLayoutStoreEnum.CHARTS]: boolean
  // 详情设置
  [ChartLayoutStoreEnum.DETAILS]: boolean
  // 组件展示方式
  [ChartLayoutStoreEnum.Chart_TYPE]: ChartModeEnum
  // 层级展示方式
  [ChartLayoutStoreEnum.LAYER_TYPE]: LayerModeEnum
}
