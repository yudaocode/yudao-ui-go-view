import { reactive, nextTick } from 'vue'
import { useChartEditStoreStore } from '@/store/modules/chartEditStore/chartEditStore'
import { CreateComponentType } from '@/packages/index.d'
import { renderIcon, loadingError } from '@/utils'
import { icon } from '@/plugins'

const {
  CopyIcon,
  CutIcon,
  ClipboardOutlineIcon,
  TrashIcon,
  ChevronDownIcon,
  ChevronUpIcon
} = icon.ionicons5
const { UpToTopIcon, DownToBottomIcon, PaintBrushIcon } = icon.carbon

const chartEditStore = useChartEditStoreStore()

export enum MenuEnum {
  DELETE = 'delete',
  COPY = 'copy',
  CUT = 'cut',
  PARSE = 'parse',
  TOP = 'top',
  BOTTOM = 'bottom',
  UP = 'up',
  DOWN = 'down',
  CLEAR = 'clear'
}

export interface MenuOptionsItemType {
  type?: string
  label?: string
  key: MenuEnum | string
  icon?: Function
  fnHandle?: Function
  disabled?: boolean
  hidden?: boolean
}

// * 默认选项
const defaultOptions: MenuOptionsItemType[] = [
  {
    label: '复制',
    key: MenuEnum.COPY,
    icon: renderIcon(CopyIcon),
    fnHandle: chartEditStore.setCopy,
  },
  {
    label: '剪切',
    key: MenuEnum.CUT,
    icon: renderIcon(CutIcon),
    fnHandle: chartEditStore.setCut,
  },
  {
    label: '粘贴',
    key: MenuEnum.PARSE,
    icon: renderIcon(ClipboardOutlineIcon),
    fnHandle: chartEditStore.setParse,
  },
  {
    type: 'divider',
    key: 'd1'
  },
  {
    label: '置顶',
    key: MenuEnum.TOP,
    icon: renderIcon(UpToTopIcon),
    fnHandle: chartEditStore.setTop,
  },
  {
    label: '置底',
    key: MenuEnum.BOTTOM,
    icon: renderIcon(DownToBottomIcon),
    fnHandle: chartEditStore.setBottom,
  },
  {
    label: '上移一层',
    key: MenuEnum.UP,
    icon: renderIcon(ChevronUpIcon),
    fnHandle: chartEditStore.setUp,
  },
  {
    label: '下移一层',
    key: MenuEnum.DOWN,
    icon: renderIcon(ChevronDownIcon),
    fnHandle: chartEditStore.setDown,
  },
  {
    type: 'divider',
    key: 'd2'
  },
  {
    label: '清空剪贴板',
    key: MenuEnum.CLEAR,
    icon: renderIcon(PaintBrushIcon),
    fnHandle: chartEditStore.setRecordChart,
  },
  {
    label: '删除',
    key: MenuEnum.DELETE,
    icon: renderIcon(TrashIcon),
    fnHandle: chartEditStore.removeComponentList,
  }
]

// * 去除隐藏选项
const clearHideOption = (options: MenuOptionsItemType[], hideList?: MenuEnum[]) => {
  if(!hideList) return options
  const a = options.filter((op: MenuOptionsItemType) => {
    return hideList.findIndex((e: MenuEnum) => e !== op.key)
  })
}

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

/**
 * * 右键hook
 * @param menuConfig
 * @returns
 */
export const useContextMenu = (menuConfig: {
  // 自定义右键配置
  selfOptions?: MenuOptionsItemType[]
  // 前置处理函数
  optionsHandle?: Function
  // 隐藏列表
  hideOptionsList?: MenuEnum[]
}) => {
  const selfOptions = menuConfig?.selfOptions
  const optionsHandle = menuConfig?.optionsHandle
  const hideOptionsList = menuConfig?.hideOptionsList

  // * 右键选项
  const menuOptions: MenuOptionsItemType[] = selfOptions || defaultOptions

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
    // todo 每次都重新计算的功能
    // menuOptions: clearHideOption ? clearHideOption(menuOptions, hideOptionsList) : menuOptions,
    menuOptions: menuOptions,
    handleContextMenu,
    onClickoutside,
    handleMenuSelect,
    mousePosition: chartEditStore.getMousePosition
  }
}
