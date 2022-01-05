import { ThemeEnum } from '@/enums/styleEnum'

export interface ChartLayoutType {
  // 图层控制
  layers: true,
  // 图表组件
  charts: true,
  // 详情设置
  details: true,
  // 对齐线
  alignLine: true,
  // 滤镜
  filter: {
    // 色相
    // 饱和度
    // 亮度
    // 对比度
    // 不透明度
  }
}
