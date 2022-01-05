import { defineStore } from 'pinia'
import { store } from '@/store'
import { ChartLayoutType } from './chartLayoutStore.d'

export const useChartLayoutStore = defineStore({
  id: 'useChartLayoutStore',
  state: (): ChartLayoutType => ({
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
      hueRotate: 0,
      // 饱和度
      saturate: 0,
      // 亮度
      brightness: 100,
      // 对比度
      contrast: 100,
      // 不透明度
      unOpacity: 100
    }
  }),
  getters: {
    getLayers(e): boolean {
      return this.layers
    },
    getCharts(): boolean {
      return this.charts
    },
    getDetails(): boolean {
      return this.details
    },
    getAlignLine(): boolean {
      return this.alignLine
    },
    getFilter(): object {
      return this.filter
    }
  }
})


export function useChartLayoutSettingWithOut() {
  return useChartLayoutStore(store)
}