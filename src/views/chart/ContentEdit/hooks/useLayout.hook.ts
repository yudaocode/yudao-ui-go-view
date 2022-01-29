import { onUnmounted, onMounted } from 'vue'
import { getChartEditStore } from './useStore.hook'
import { EditCanvasTypeEnum } from '@/store/modules/chartEditStore/chartEditStore.d'
import { CreateComponentType } from '@/packages/index.d'

const chartEditStore = getChartEditStore()

// 布局处理
export const useLayout = () => {
  onMounted(() => {
    // 设置 Dom 值(ref 不生效先用 document)
    chartEditStore.setEditCanvasItem(
      EditCanvasTypeEnum.EDIT_LAYOUT_DOM,
      document.getElementById('go-chart-edit-layout')
    )
    chartEditStore.setEditCanvasItem(
      EditCanvasTypeEnum.EDIT_CONTENT_DOM,
      document.getElementById('go-chart-edit-content')
    )

    // 大小初始化
    chartEditStore.setPageSize()

    // 监听初始化
    const removeScale = chartEditStore.listenerScale()

    onUnmounted(() => {
      removeScale()
    })
  })
}

// 点击事件
export const mousedownHandle = (e: MouseEvent, item?: CreateComponentType) => {
  e.preventDefault()
  e.stopPropagation()
  if (item) {
    chartEditStore.setTargetSelectChart(item.id)
    return
  }
  chartEditStore.setTargetSelectChart(item)
}

// 进入事件
export const mouseenterHandle = (e: MouseEvent, item: CreateComponentType) => {
  e.preventDefault()
  e.stopPropagation()
  chartEditStore.setTargetHoverChart(item.id)
}

// 移出事件
export const mouseleaveHandle = (e: MouseEvent, item: CreateComponentType) => {
  e.preventDefault()
  e.stopPropagation()
  chartEditStore.setTargetHoverChart(undefined)
}
