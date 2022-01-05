import { ThemeEnum } from '@/enums/styleEnum'

export interface ChartLayoutType {
  // 图层控制
  layers: boolean,
  // 图表组件
  charts: boolean,
  // 详情设置
  details: boolean,
  // 对齐线
  alignLine: boolean,
  // 滤镜
  filter: {
    // 色相
    hueRotate: number,
    // 饱和度
    saturate: number,
    // 亮度
    brightness: number,
    // 对比度
    contrast: number,
    // 不透明度
    unOpacity: number
  }
}
