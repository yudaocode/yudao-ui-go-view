import { reactive, ref, nextTick } from 'vue'
import { useChartEditStoreStore } from '@/store/modules/chartEditStore/chartEditStore'
import { loadingError } from '@/utils'

const chartEditStore = useChartEditStoreStore()

enum MenuEnum {
  DELETE = 'delete'
}

export const useContextMenu = () => {
  const targetIndex = ref<number>(0)

  // * 右键选项
  const menuOptions = reactive([
    {
      label: '删除',
      key: MenuEnum.DELETE
    }
  ])

  // * 右键处理
  const handleContextMenu = (e: MouseEvent, index: number) => {
    e.stopPropagation()
    e.preventDefault()
    targetIndex.value = index
    let target = e.target
    while (target instanceof SVGElement) {
      target = target.parentNode
    }
    chartEditStore.setRightMenuShow(false)
    nextTick().then(() => {
      chartEditStore.setMousePosition(e.clientX, e.clientY)
      chartEditStore.setRightMenuShow(true)
    })
  }

  // * 失焦
  const onClickoutside = (e: MouseEvent) => {
    chartEditStore.setRightMenuShow(false)
  }

  // * 事件处理
  const handleMenuSelect = (key: string) => {
    chartEditStore.setRightMenuShow(false)
    switch (key) {
      case MenuEnum.DELETE:
        chartEditStore.removeComponentList(targetIndex.value)
        break
      default: loadingError()
    }
  }

  return {
    menuOptions,
    handleContextMenu,
    onClickoutside,
    handleMenuSelect,
    mousePosition: chartEditStore.getMousePosition
  }
}
