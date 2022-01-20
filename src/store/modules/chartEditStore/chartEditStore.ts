import { defineStore } from 'pinia'
import debounce from 'lodash/debounce'
import {
  chartEditStoreType,
  EditCanvasType,
  MousePositionType
} from './chartEditStore.d'

// 编辑区域内容
export const useChartEditStoreStore = defineStore({
  id: 'useChartEditStoreStore',
  state: (): chartEditStoreType => ({
    editCanvas: {
      // 编辑区域 Dom
      editLayoutDom: undefined,
      editContentDom: undefined,
      // 默认宽度
      width: 1920,
      // 默认高度
      height: 1080,
      // 偏移量
      offset: 20,
      // 默认缩放
      scale: 1,
      // 锁定缩放
      lockScale: false,
      // 默认背景色
      background: undefined
    },
    mousePosition: {
      x: 0,
      y: 0
    }
  }),
  getters: {
    getMousePosition(): MousePositionType {
      return this.mousePosition
    },
    getEditCanvas(): EditCanvasType {
      return this.editCanvas
    }
  },
  actions: {
    // * 设置数据项
    setEditCanvasItem<T extends keyof EditCanvasType>(key: T, value: any) {
      this.editCanvas[key] = value
    },
    // * 设置页面属性
    setPageAttribute<T extends keyof CSSStyleDeclaration>(
      key: T,
      value: any
    ): void {
      const dom = this.editCanvas.editContentDom
      if (dom) {
        // @ts-ignore
        dom.style[key] = value
      }
    },
    // * 设置页面大小
    setPageSize(): void {
      this.setPageAttribute('height', `${this.editCanvas.height}px`)
      this.setPageAttribute('width', `${this.editCanvas.width}px`)
    },
    // * 设置鼠标位置
    setMousePosition(x: number, y: number): void {
      this.mousePosition.x = x
      this.mousePosition.y = y
    },
    // * 计算缩放
    computedScale() {
      if (this.editCanvas.editLayoutDom) {

        // 现有展示区域
        const width = this.editCanvas.editLayoutDom.clientWidth - this.editCanvas.offset * 2
        const height = this.editCanvas.editLayoutDom.clientHeight - this.editCanvas.offset * 4

        // 用户设定大小
        const editCanvasWidth = this.editCanvas.width
        const editCanvasHeight = this.editCanvas.height

         // 需保持的比例
         const baseProportion = parseFloat((editCanvasWidth / editCanvasHeight).toFixed(5))
         const currentRate = parseFloat((width / height).toFixed(5))

        if (currentRate > baseProportion) {
          // 表示更宽
          const scaleWidth = parseFloat(((height * baseProportion) / editCanvasWidth).toFixed(5))
          this.setScale(parseFloat((scaleWidth).toFixed(5)))
        } else {
          // 表示更高
          const scaleHeight = parseFloat(((width / baseProportion) / editCanvasHeight).toFixed(5))
          this.setScale(parseFloat((scaleHeight).toFixed(5)))
        }
      } else {
        window['$message'].warning('找不到元素')
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
    setScale(scale: number): void {
      this.getEditCanvas.scale = scale
      // 设置页面元素
      this.setPageAttribute('transform', `scale(${scale})`)
    }
  }
})
