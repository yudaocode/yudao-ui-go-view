import { toRefs } from 'vue'
import { useThrottleFn } from '@vueuse/core'
import { getChartEditStore } from './useStore.hook'
import { EditCanvasTypeEnum } from '@/store/modules/chartEditStore/chartEditStore.d'
import { DragKeyEnum } from '@/enums/editPageEnum'
import { createComponent } from '@/packages'
import { ConfigType } from '@/packages/index.d'

const chartEditStore = getChartEditStore()
const { scale } = toRefs(chartEditStore.getEditCanvas)

// * 拖拽中
export const handleDrop = async (e: DragEvent) => {
  e.preventDefault()
  const Loading = window['$loading']
  try {
    Loading.start()

    const drayDataString = e!.dataTransfer!.getData(DragKeyEnum.DROG_KEY)

    const dropData: Exclude<ConfigType, ['node', 'image']> = JSON.parse(
      drayDataString
    )

    let newComponent= await createComponent(dropData)
    newComponent.setPosition(e.offsetX, e.offsetY)
    
    chartEditStore.addComponentList(newComponent)

    setTimeout(() => {
      Loading.finish()
    })
  } catch (error) {
    Loading.error()
    window['$message'].success(`图表正在研发中, 敬请期待...`)
  }
}

// * 拖拽结束
export const handleDragOver = (e: DragEvent) => {
  e.preventDefault()
  e.stopPropagation()
  if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy'
}
