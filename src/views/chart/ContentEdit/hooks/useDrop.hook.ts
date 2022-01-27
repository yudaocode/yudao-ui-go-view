import { toRefs } from 'vue'
import { getChartEditStore } from './useStore.hook'
import { DragKeyEnum } from '@/enums/editPageEnum'
import { createComponent } from '@/packages'
import { ConfigType } from '@/packages/index.d'
import { loadingStart, loadingFinish, loadingError } from '@/utils'

const chartEditStore = getChartEditStore()
const { scale } = toRefs(chartEditStore.getEditCanvas)

// * 拖拽中
export const handleDrop = async (e: DragEvent) => {
  e.preventDefault()

  try {
    loadingStart()

    // 获取拖拽数据
    const drayDataString = e!.dataTransfer!.getData(DragKeyEnum.DROG_KEY)
    const dropData: Exclude<ConfigType, ['node', 'image']> = JSON.parse(
      drayDataString
    )
    // 创建新图表组件
    let newComponent = await createComponent(dropData)

    const { w, h } = dropData.chartData.chartSize
    newComponent.setPosition(e.offsetX - w / 2, e.offsetY - h / 2)
    chartEditStore.addComponentList(newComponent)

    loadingFinish()
  } catch (error) {
    loadingError()
    window['$message'].warning(`图表正在研发中, 敬请期待...`)
  }
}

// * 拖拽结束
export const handleDragOver = (e: DragEvent) => {
  e.preventDefault()
  e.stopPropagation()
  if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy'
}
