import { ref, nextTick } from 'vue'
import { useChartEditStoreStore } from '@/store/modules/chartEditStore/chartEditStore'
import { CreateComponentType } from '@/packages/index.d'
import { renderIcon, loadingError } from '@/utils'
import { icon } from '@/plugins'

const { CopyIcon, ClipboardOutlineIcon, TrashIcon, ChevronDownIcon, ChevronUpIcon } = icon.ionicons5
const { UpToTopIcon, DownToBottomIcon } = icon.carbon

const chartEditStore = useChartEditStoreStore()

enum MenuEnum {
  DELETE = 'delete',
  COPY = 'copy',
  PARSE = 'parse',
  TOP = 'top',
  BOTTOM = 'bottom',
  UP = 'up',
  DOWN = 'down'
}

export interface MenuOptionsItemType {
  type?: string
  label?: string
  key: MenuEnum | string
  icon?: Function
  fnHandle?: Function
}

// * 默认选项
const defaultOptions: MenuOptionsItemType[] = [
  {
    label: '复制',
    key: MenuEnum.COPY,
    icon: renderIcon(CopyIcon),
    fnHandle: chartEditStore.setCopy
  },
  {
    label: '粘贴',
    key: MenuEnum.PARSE,
    icon: renderIcon(ClipboardOutlineIcon),
    fnHandle: chartEditStore.setParse
  },
  {
    type: 'divider',
    key: 'd1'
  },
  {
    label: '置顶',
    key: MenuEnum.TOP,
    icon: renderIcon(UpToTopIcon),
    fnHandle: chartEditStore.setTop
  },
  {
    label: '置底',
    key: MenuEnum.BOTTOM,
    icon: renderIcon(DownToBottomIcon),
    fnHandle: chartEditStore.setBottom
  },
  {
    label: '上移一层',
    key: MenuEnum.UP,
    icon: renderIcon(ChevronUpIcon),
    fnHandle: chartEditStore.setUp
  },
  {
    label: '下移一层',
    key: MenuEnum.DOWN,
    icon: renderIcon(ChevronDownIcon),
    fnHandle: chartEditStore.setDown
  },
  {
    type: 'divider',
    key: 'd2'
  },
  {
    label: '删除',
    key: MenuEnum.DELETE,
    icon: renderIcon(TrashIcon),
    fnHandle: chartEditStore.removeComponentList
  }
]

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
  const onClickoutside = () => {
    chartEditStore.setRightMenuShow(false)
  }

  // * 事件处理
  const handleMenuSelect = (key: string) => {
    chartEditStore.setRightMenuShow(false)
    const targetItem: MenuOptionsItemType[] = menuOptions.filter(
      (e: MenuOptionsItemType) => e.key === key
    )

    menuOptions.forEach((e: MenuOptionsItemType) => {
      if (e.key === key) {
        if (e.fnHandle) {
          e.fnHandle()
          return
        }
        if (!targetItem) loadingError()
      }
    })
  }

  return {
    menuOptions: optionsHandle ? optionsHandle(menuOptions) : menuOptions,
    handleContextMenu,
    onClickoutside,
    handleMenuSelect,
    mousePosition: chartEditStore.getMousePosition
  }
}
