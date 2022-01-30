import { onUnmounted, onMounted } from 'vue'
import { getChartEditStore } from './useStore.hook'
import { EditCanvasTypeEnum } from '@/store/modules/chartEditStore/chartEditStore.d'
import { CreateComponentType } from '@/packages/index.d'
import throttle from 'lodash/throttle'

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

// 不拦截默认行为点击
export const mousedownHandleUnStop = (
  e: MouseEvent,
  item?: CreateComponentType
) => {
  if (item) {
    chartEditStore.setTargetSelectChart(item.id)
    return
  }
  chartEditStore.setTargetSelectChart(item)
}

export const useMouseHandle = () => {
  // 点击事件（包含移动事件）
  const mousedownHandle = (e: MouseEvent, item: CreateComponentType) => {
    e.preventDefault()
    e.stopPropagation()

    chartEditStore.setTargetSelectChart(item.id)
    const scale = chartEditStore.getEditCanvas.scale
    const width = chartEditStore.getEditCanvas.width
    const height = chartEditStore.getEditCanvas.height

    // 获取编辑区域 Dom
    const editcontentDom = chartEditStore.getEditCanvas.editContentDom

    // 记录图表初始位置
    const itemAttrX = item.attr.x
    const itemAttrY = item.attr.y

    // 记录点击初始位置
    const startX = e.screenX
    const startY = e.screenY

    // 计算偏移量（处理 scale 比例问题）
    const mousemove = throttle((moveEvent: MouseEvent) => {
      let currX = itemAttrX + (moveEvent.screenX - startX) / scale
      let currY = itemAttrY + (moveEvent.screenY - startY) / scale

      // 位置检测
      currX = currX < 0 ? 0 : currX
      currY = currY < 0 ? 0 : currY

      // 预留 20px 边距
      currX = currX > width - 20 ? width - 20 : currX
      currY = currY > height - 20 ? height - 20 : currY

      item.attr.x = currX
      item.attr.y = currY
    }, 30)

    const mouseup = () => {
      editcontentDom!.removeEventListener('mousemove', mousemove)
      editcontentDom!.removeEventListener('mouseup', mouseup)
    }

    editcontentDom!.addEventListener('mousemove', mousemove)
    editcontentDom!.addEventListener('mouseup', mouseup)
  }

  // 进入事件
  const mouseenterHandle = (e: MouseEvent, item: CreateComponentType) => {
    e.preventDefault()
    e.stopPropagation()
    chartEditStore.setTargetHoverChart(item.id)
  }

  // 移出事件
  const mouseleaveHandle = (e: MouseEvent, item: CreateComponentType) => {
    e.preventDefault()
    e.stopPropagation()
    chartEditStore.setTargetHoverChart(undefined)
  }

  return { mousedownHandle, mouseenterHandle, mouseleaveHandle }
}
