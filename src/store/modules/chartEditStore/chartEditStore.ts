import { defineStore } from 'pinia'
import debounce from 'lodash/debounce'
import { loadingStart, loadingFinish, loadingError } from '@/utils'
import { CreateComponentType } from '@/packages/index.d'
import {
  chartEditStoreType,
  EditCanvasType,
  MousePositionType,
  TargetChartType
} from './chartEditStore.d'

// 编辑区域内容
export const useChartEditStoreStore = defineStore({
  id: 'useChartEditStoreStore',
  state: (): chartEditStoreType => ({
    // 编辑画布属性
    editCanvas: {
      // 编辑区域 Dom
      editLayoutDom: null,
      editContentDom: null,
      // 默认宽度
      width: 1920,
      // 默认高度
      height: 1080,
      // 偏移量
      offset: 20,
      // 系统控制缩放
      scale: 1,
      // 用户控制的缩放
      userScale: 1,
      // 锁定缩放
      lockScale: false,
      // 默认背景色
      background: undefined
    },
    // 右键菜单
    rightMenuShow: false,
    // 鼠标定位
    mousePosition: {
      x: 0,
      y: 0
    },
    // 目标图表
    targetChart: {
      hoverId: undefined,
      selectId: undefined
    },
    // 图表数组
    componentList: []
  }),
  getters: {
    getMousePosition(): MousePositionType {
      return this.mousePosition
    },
    getRightMenuShow(): boolean {
      return this.rightMenuShow
    },
    getEditCanvas(): EditCanvasType {
      return this.editCanvas
    },
    getTargetChart():TargetChartType {
      return this.targetChart
    },
    getComponentList(): any[] {
      return this.componentList
    }
  },
  actions: {
    // * 设置 editCanvas 数据项
    setEditCanvasItem< T extends keyof EditCanvasType,  K extends EditCanvasType[T] >(key: T, value: K) {
      this.editCanvas[key] = value
    },
    // * 设置右键菜单
    setRightMenuShow(value: boolean) {
      this.rightMenuShow = value
    },
    // * 设置目标数据 hover
    setTargetHoverChart(hoverId?:TargetChartType["hoverId"]) {
      this.targetChart.hoverId = hoverId
    },
    // * 设置目标数据 select
    setTargetSelectChart(selectId?:TargetChartType["selectId"]) {
      this.targetChart.selectId = selectId
    },
    // * 新增组件列表
    addComponentList<T>(chartData: T): void {
      this.componentList.push(chartData)
    },
    // * 删除组件列表
    removeComponentList(): void {
      loadingStart()
      try {
        const i = this.componentList.findIndex(e => e.id === this.getTargetChart.selectId)
        if (i !== -1) {
          this.componentList.splice(i, 1)
          loadingFinish()
          return
        }
        window['$message'].success(`图表删除失败，无法找到此元素`)
      } catch(value) {
        loadingError()
      }
    },
    // * 设置页面样式属性
    setPageStyle<T extends keyof CSSStyleDeclaration>(
      key: T,
      value: any
    ): void {
      const dom = this.getEditCanvas.editContentDom
      if (dom) {
        dom.style[key] = value
      }
    },
    // * 设置页面变换时候的 Class
    setPageSizeClass(): void {
      const dom = this.getEditCanvas.editContentDom
      if (dom) {
        dom.classList.add('content-resize')
        setTimeout(() => {
          dom.classList.remove('content-resize')
        }, 600)
      }
    },
    // * 设置页面大小
    setPageSize(): void {
      this.setPageStyle('height', `${this.getEditCanvas.height}px`)
      this.setPageStyle('width', `${this.getEditCanvas.width}px`)
    },
    // * 设置鼠标位置
    setMousePosition(x: number, y: number): void {
      this.mousePosition.x = x
      this.mousePosition.y = y
    },
    // * 计算缩放
    computedScale() {
      if (this.getEditCanvas.editLayoutDom) {
        // 现有展示区域
        const width =
          this.getEditCanvas.editLayoutDom.clientWidth - this.getEditCanvas.offset * 2 - 5
        const height =
          this.getEditCanvas.editLayoutDom.clientHeight - this.getEditCanvas.offset * 4

        // 用户设定大小
        const editCanvasWidth = this.getEditCanvas.width
        const editCanvasHeight = this.getEditCanvas.height

        // 需保持的比例
        const baseProportion = parseFloat(
          (editCanvasWidth / editCanvasHeight).toFixed(5)
        )
        const currentRate = parseFloat((width / height).toFixed(5))

        if (currentRate > baseProportion) {
          // 表示更宽
          const scaleWidth = parseFloat(
            ((height * baseProportion) / editCanvasWidth).toFixed(5)
          )
          this.setScale( scaleWidth > 1 ? 1 : scaleWidth)
        } else {
          // 表示更高
          const scaleHeight = parseFloat(
            (width / baseProportion / editCanvasHeight).toFixed(5)
          )
          this.setScale(scaleHeight > 1 ? 1 : scaleHeight)
        }
      } else {
        window['$message'].warning('请先创建画布，再进行缩放')
      }
    },
    // * 监听缩放
    listenerScale(): Function {
      const resize = debounce(this.computedScale, 200)
      // 默认执行一次
      resize()
      // 开始监听
      window.addEventListener('resize', resize)
      // 销毁函数
      const remove = () => {
        window.removeEventListener('resize', resize)
      }
      return remove
    },
    // * 设置缩放
    setScale(scale: number, sys = true): void {
      if (!this.getEditCanvas.lockScale) {
        this.setPageSizeClass()
        this.setPageStyle('transform', `scale(${scale})`)
        this.getEditCanvas.userScale = scale
        if (sys) {
          this.getEditCanvas.scale = scale
        }
      }
    }
  }
})