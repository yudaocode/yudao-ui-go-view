import { defineStore } from 'pinia'
import { ChartLayoutType } from './chartLayoutStore.d'
import { setLocalStorage, getLocalStorage } from '@/utils'
import { StorageEnum } from '@/enums/storageEnum'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'

const chartEditStore = useChartEditStore()

const { GO_CHART_LAYOUT_STORE } = StorageEnum

const storageChartLayout: ChartLayoutType = getLocalStorage( GO_CHART_LAYOUT_STORE)

// 编辑区域布局和静态设置
export const useChartLayoutStore = defineStore({
  id: 'useChartLayoutStore',
  state: (): ChartLayoutType =>
    storageChartLayout || {
      // 图层控制
      layers: true,
      // 图表组件
      charts: true,
      // 详情设置
      details: true,
      // 对齐线
      alignLine: true,
    },
  getters: {
    getLayers(): boolean {
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
    }
  },
  actions: {
    setItem(key: string, value: boolean): void {
      ;(this as any)[key] = value
      setLocalStorage(GO_CHART_LAYOUT_STORE, this.$state)
      // 重新计算拖拽区域缩放比例
      setTimeout(() => {
        chartEditStore.computedScale()
      }, 500)
    }
  }
})
