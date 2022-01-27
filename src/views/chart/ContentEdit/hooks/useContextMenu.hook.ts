import { reactive, ref, nextTick } from 'vue'
import { getChartEditStore } from './useStore.hook'
import { loadingError } from '@/utils'

const chartEditStore = getChartEditStore()

enum MenuEnum {
  DELETE = 'delete'
}

export const useContextMenu = () => {
  const showDropdownRef = ref(false)
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
    showDropdownRef.value = false
    nextTick().then(() => {
      chartEditStore.setMousePosition(e.clientX, e.clientY)
      showDropdownRef.value = true
    })
  }

  // * 失焦
  const onClickoutside = (e: MouseEvent) => {
    showDropdownRef.value = false
  }

  // * 事件处理
  const handleMenuSelect = (key: string) => {
    showDropdownRef.value = false
    switch (key) {
      case MenuEnum.DELETE:
        chartEditStore.removeComponentList(targetIndex.value)
        break
      default: loadingError()
    }
  }

  return {
    showDropdownRef,
    menuOptions,
    handleContextMenu,
    onClickoutside,
    handleMenuSelect,
    mousePosition: chartEditStore.getMousePosition
  }
}
