import { ref, nextTick } from 'vue'
import { useChartEditStoreStore } from '@/store/modules/chartEditStore/chartEditStore'
import { CreateComponentType } from '@/packages/index.d'
import { loadingError } from '@/utils'

const chartEditStore = useChartEditStoreStore()

enum MenuEnum {
  DELETE = 'delete'
}

export interface MenuOptionsItemType {
  label: string
  key: MenuEnum
  fnHandle: Function
}
/**
 * * 右键hook
 * @param menuOption
 * @returns
 */
export const useContextMenu = (menuOption?: {
  // 自定义右键配置
  selfOptions: MenuOptionsItemType[]
  // 前置处理函数
  optionsHandle: Function
}) => {
  const selfOptions = menuOption?.selfOptions
  const optionsHandle = menuOption?.optionsHandle

  // * 默认选项
  const defaultOptions: MenuOptionsItemType[] = [
    {
      label: '删除',
      key: MenuEnum.DELETE,
      fnHandle: chartEditStore.removeComponentList
    }
  ]

  // * 右键选项
  const menuOptions: MenuOptionsItemType[] = selfOptions || defaultOptions

  // * 右键处理
  const handleContextMenu = (e: MouseEvent, item: CreateComponentType) => {
    e.stopPropagation()
    e.preventDefault()
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
    const targetItem: MenuOptionsItemType[] = menuOptions.filter(
      (e: MenuOptionsItemType) => e.key === key
    )
    if (!targetItem) loadingError()
    if (targetItem.length) targetItem.pop()?.fnHandle()
  }

  return {
    menuOptions: optionsHandle ? optionsHandle(menuOptions) : menuOptions,
    handleContextMenu,
    onClickoutside,
    handleMenuSelect,
    mousePosition: chartEditStore.getMousePosition
  }
}
