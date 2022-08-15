import { toRaw } from 'vue'
import { DragKeyEnum, MouseEventButton, WinKeyboard, MacKeyboard } from '@/enums/editPageEnum'
import { createComponent } from '@/packages'
import { ConfigType } from '@/packages/index.d'
import { CreateComponentType, CreateComponentGroupType, PickCreateComponentType } from '@/packages/index.d'
import { useContextMenu } from '@/views/chart/hooks/useContextMenu.hook'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { EditCanvasTypeEnum } from '@/store/modules/chartEditStore/chartEditStore.d'
import { loadingStart, loadingFinish, loadingError } from '@/utils'
import throttle from 'lodash/throttle'

const chartEditStore = useChartEditStore()
const { onClickOutSide } = useContextMenu()

// * 拖拽到编辑区域里
export const dragHandle = async (e: DragEvent) => {
  e.preventDefault()

  try {
    loadingStart()

    // 获取拖拽数据
    const drayDataString = e!.dataTransfer!.getData(DragKeyEnum.DROG_KEY)
    if (!drayDataString) {
      loadingFinish()
      return
    }

    // 修改状态
    chartEditStore.setEditCanvas(EditCanvasTypeEnum.IS_CREATE, false)
    const dropData: Exclude<ConfigType, ['image']> = JSON.parse(drayDataString)

    // 创建新图表组件
    let newComponent: CreateComponentType = await createComponent(dropData)

    newComponent.setPosition(e.offsetX - newComponent.attr.w / 2, e.offsetY - newComponent.attr.h / 2)
    chartEditStore.addComponentList(newComponent, false, true)
    chartEditStore.setTargetSelectChart(newComponent.id)
    loadingFinish()
  } catch (error) {
    loadingError()
    window['$message'].warning(`图表正在研发中, 敬请期待...`)
  }
}

// * 进入拖拽区域
export const dragoverHandle = (e: DragEvent) => {
  e.preventDefault()
  e.stopPropagation()

  if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy'
}

// * 不拦截默认行为点击
export const mousedownHandleUnStop = (e: MouseEvent, item?: CreateComponentType | CreateComponentGroupType) => {
  if (item) {
    chartEditStore.setTargetSelectChart(item.id)
    return
  }
  chartEditStore.setTargetSelectChart(undefined)
}

// * 鼠标事件
export const useMouseHandle = () => {
  // *  Click 事件, 松开鼠标触发
  const mouseClickHandle = (e: MouseEvent, item: CreateComponentType | CreateComponentGroupType) => {
    e.preventDefault()
    e.stopPropagation()
    // 若此时按下了 CTRL, 表示多选
    if (
      window.$KeyboardActive?.has(WinKeyboard.CTRL_SOURCE_KEY) ||
      window.$KeyboardActive?.has(MacKeyboard.CTRL_SOURCE_KEY)
    ) {
      // 若已选中，则去除
      if (chartEditStore.targetChart.selectId.includes(item.id)) {
        const exList = chartEditStore.targetChart.selectId.filter(e => e !== item.id)
        chartEditStore.setTargetSelectChart(exList)
      } else {
        chartEditStore.setTargetSelectChart(item.id, true)
      }
    }
  }

  // * 按下事件（包含移动事件）
  const mousedownHandle = (e: MouseEvent, item: CreateComponentType | CreateComponentGroupType) => {
    e.preventDefault()
    e.stopPropagation()
    onClickOutSide()

    // 按下左键 + CTRL
    if (
      e.buttons === MouseEventButton.LEFT &&
      (window.$KeyboardActive?.has(WinKeyboard.CTRL_SOURCE_KEY) ||
        window.$KeyboardActive?.has(MacKeyboard.CTRL_SOURCE_KEY))
    )
      return

    // 按下右键 + 选中多个 + 目标元素是多选子元素
    const selectId = chartEditStore.getTargetChart.selectId
    if (e.buttons === MouseEventButton.RIGHT && selectId.length > 1 && selectId.includes(item.id)) return

    // 选中当前目标组件
    chartEditStore.setTargetSelectChart(item.id)

    // 按下右键
    if (e.buttons === MouseEventButton.RIGHT) return

    const scale = chartEditStore.getEditCanvas.scale
    const canvasWidth = chartEditStore.getEditCanvasConfig.width
    const canvasHeight = chartEditStore.getEditCanvasConfig.height

    // 记录图表初始位置和大小
    const targetMap = new Map()
    chartEditStore.getTargetChart.selectId.forEach(id => {
      const index = chartEditStore.fetchTargetIndex(id)
      if (index !== -1) {
        const { x, y, w, h } = toRaw(chartEditStore.getComponentList[index]).attr
        targetMap.set(id, { x, y, w, h })
      }
    })

    // 记录点击初始位置
    const startX = e.screenX
    const startY = e.screenY

    // 记录初始位置
    chartEditStore.setMousePosition(startX, startY)

    // 移动-计算偏移量
    const mousemove = throttle((moveEvent: MouseEvent) => {
      chartEditStore.setEditCanvas(EditCanvasTypeEnum.IS_DRAG, true)
      chartEditStore.setMousePosition(moveEvent.screenX, moveEvent.screenY)

      // 当前偏移量，处理 scale 比例问题
      let offsetX = (moveEvent.screenX - startX) / scale
      let offsetY = (moveEvent.screenY - startY) / scale

      chartEditStore.getTargetChart.selectId.forEach(id => {
        const index = chartEditStore.fetchTargetIndex(id)
        // 拿到初始位置数据
        const { x, y, w, h } = targetMap.get(id)
        const componentInstance = chartEditStore.getComponentList[index]

        let currX = Math.round(x + offsetX)
        let currY = Math.round(y + offsetY)

        // 要预留的距离
        const distance = 50

        // 基于左上角位置检测
        currX = currX < -w + distance ? -w + distance : currX
        currY = currY < -h + distance ? -h + distance : currY

        // 基于右下角位置检测
        currX = currX > canvasWidth - distance ? canvasWidth - distance : currX
        currY = currY > canvasHeight - distance ? canvasHeight - distance : currY

        componentInstance.attr = Object.assign(componentInstance.attr, {
          x: currX,
          y: currY
        })
      })
      return
    }, 30)

    const mouseup = () => {
      chartEditStore.setEditCanvas(EditCanvasTypeEnum.IS_DRAG, false)
      chartEditStore.setMousePosition(0, 0)
      document.removeEventListener('mousemove', mousemove)
      document.removeEventListener('mouseup', mouseup)
    }

    document.addEventListener('mousemove', mousemove)
    document.addEventListener('mouseup', mouseup)
  }

  // * 进入事件
  const mouseenterHandle = (e: MouseEvent, item: CreateComponentType | CreateComponentGroupType) => {
    e.preventDefault()
    e.stopPropagation()
    chartEditStore.setTargetHoverChart(item.id)
  }

  // * 移出事件
  const mouseleaveHandle = (e: MouseEvent, item: CreateComponentType | CreateComponentGroupType) => {
    e.preventDefault()
    e.stopPropagation()
    chartEditStore.setEditCanvas(EditCanvasTypeEnum.IS_DRAG, false)
    chartEditStore.setTargetHoverChart(undefined)
  }

  return { mouseClickHandle, mousedownHandle, mouseenterHandle, mouseleaveHandle }
}

// * 移动锚点
export const useMousePointHandle = (e: MouseEvent, point: string, attr: PickCreateComponentType<'attr'>) => {
  e.stopPropagation()
  e.preventDefault()

  // 设置拖拽状态
  chartEditStore.setEditCanvas(EditCanvasTypeEnum.IS_DRAG, true)
  const scale = chartEditStore.getEditCanvas.scale

  const itemAttrX = attr.x
  const itemAttrY = attr.y
  const itemAttrW = attr.w
  const itemAttrH = attr.h

  // 记录点击初始位置
  const startX = e.screenX
  const startY = e.screenY

  // 记录初始位置
  chartEditStore.setMousePosition(startX, startY)

  const mousemove = throttle((moveEvent: MouseEvent) => {
    chartEditStore.setMousePosition(moveEvent.screenX, moveEvent.screenY)

    let currX = Math.round((moveEvent.screenX - startX) / scale)
    let currY = Math.round((moveEvent.screenY - startY) / scale)

    const isTop = /t/.test(point)
    const isBottom = /b/.test(point)
    const isLeft = /l/.test(point)
    const isRight = /r/.test(point)

    const newHeight = itemAttrH + (isTop ? -currY : isBottom ? currY : 0)
    const newWidth = itemAttrW + (isLeft ? -currX : isRight ? currX : 0)

    attr.h = newHeight > 0 ? newHeight : 0
    attr.w = newWidth > 0 ? newWidth : 0
    attr.x = itemAttrX + (isLeft ? currX : 0)
    attr.y = itemAttrY + (isTop ? currY : 0)
  }, 50)

  const mouseup = () => {
    chartEditStore.setEditCanvas(EditCanvasTypeEnum.IS_DRAG, false)
    chartEditStore.setMousePosition(0, 0)
    document.removeEventListener('mousemove', mousemove)
    document.removeEventListener('mouseup', mouseup)
  }

  document.addEventListener('mousemove', mousemove)
  document.addEventListener('mouseup', mouseup)
}
