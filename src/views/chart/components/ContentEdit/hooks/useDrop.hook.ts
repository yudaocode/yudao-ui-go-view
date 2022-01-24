import { toRefs } from 'vue'
import { useThrottleFn } from '@vueuse/core'
import { getChartEditStore } from './useStore.hook'
import { EditCanvasTypeEnum } from '@/store/modules/chartEditStore/chartEditStore.d'
import { DragKeyEnum } from '@/enums/editPageEnum'

const chartEditStore = getChartEditStore()
const { scale } = toRefs(chartEditStore.getEditCanvas)

// * 拖拽中
export const handleDrop = (e: DragEvent) => {
  e.preventDefault()
  const Loading = window['$loading']
  try {
    Loading.start()

    const chartName = e!.dataTransfer!.getData(DragKeyEnum.DROG_KEY)
    console.log(chartName)
    chartEditStore.setMousePosition(e.offsetX, e.offsetY)

    setTimeout(() => {
      Loading.finish()
    })
  } catch (error) {
    Loading.error()
    window['$message'].success(`添加图表失败，请保存数据后刷新重试`)
  }
}

// * 拖拽结束
export const handleDragOver = (e: DragEvent) => {
  e.preventDefault()
  e.stopPropagation()
  if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy'
}
