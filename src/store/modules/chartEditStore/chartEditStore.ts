import { defineStore } from 'pinia'
import { getUUID, loadingStart, loadingFinish, loadingError } from '@/utils'
import { CreateComponentType } from '@/packages/index.d'
import debounce from 'lodash/debounce'
import cloneDeep from 'lodash/cloneDeep'
import {
  chartEditStoreType,
  EditCanvasType,
  MousePositionType,
  TargetChartType
} from './chartEditStore.d'

// 记录记录
import { useChartHistoryStoreStore } from '@/store/modules/chartHistoryStore/chartHistoryStore'
import { HistoryActionTypeEnum } from '@/store/modules/chartHistoryStore/chartHistoryStore.d'

const chartHistoryStoreStore = useChartHistoryStoreStore()

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
    // 记录临时数据（复制等）
    recordCharts: undefined,
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
    getRecordCharts(): CreateComponentType | CreateComponentType[] | undefined {
      return this.recordCharts
    },
    getComponentList(): CreateComponentType[] {
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
    // * 设置记录数据
    setRecordCharts(item: CreateComponentType | CreateComponentType[] | undefined) {
      this.recordCharts = cloneDeep(item)
    },
    // * 找到目标 id 数据下标位置
    fetchTargetIndex(): number {
      const index = this.componentList.findIndex(e => e.id === this.getTargetChart.selectId)
      if (index === -1) {
        window['$message'].success(`操作失败，无法找到此元素`)
        loadingError()
      }
      return index
    },
    /**
     * * 新增组件列表
     * @param chartData 新图表实例
     * @param isEnd 是否末端插入
     * @param isHistory 是否进行记录
     * @returns 
     */
    addComponentList(chartData: CreateComponentType, isEnd = false, isHistory = false): void {
      if(isHistory) {
        chartHistoryStoreStore.createAddHistory(chartData)
      }
      if(isEnd) {
        this.componentList.unshift(chartData)
        return
      }
      this.componentList.push(chartData)
    },
    // * 删除组件列表
    removeComponentList(): void {
      try {
        loadingStart()
        const index  = this.fetchTargetIndex()
        if (index !== -1) {
          chartHistoryStoreStore.createDeleteHistory(this.getComponentList[index])
          this.componentList.splice(index, 1)
          loadingFinish()
          return
        }
      } catch(value) {
        loadingError()
      }
    },
    // * 更新组件列表某一项的值
    updateComponentList(index: number, newData: CreateComponentType) {
      if(index < 1 && index > this.getComponentList.length) return
      this.componentList[index] = newData
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
    // * 移动组件列表位置到两端
    setBothEnds(isEnd = false): void {
      try {
        loadingStart()
        const length = this.getComponentList.length
        if(length < 2) { 
          loadingFinish()
          return
        }

        const index  = this.fetchTargetIndex()
        if (index !== -1) {
          // 置底排除最底层, 置顶排除最顶层
          if ((isEnd && index === 0) || (!isEnd && index === length - 1 )) { 
            loadingFinish()
            return
          }
          // 插入两端
          chartHistoryStoreStore.createLaryerHistory(this.getComponentList[index])
          this.addComponentList(this.getComponentList[index], isEnd)
          this.getComponentList.splice(isEnd ? index + 1: index, 1)
          loadingFinish()
          return
        }
      } catch(value) {
        loadingError()
      }
    },
    // * 置顶
    setTop(): void {
      this.setBothEnds()
    },
    // * 置底
    setBottom(): void {
      this.setBothEnds(true)
    },
    // * 互换图表位置
    wrap(isDown = false) {
      try {
        loadingStart()
        const length = this.getComponentList.length
        if (length < 2) { 
          loadingFinish()
          return
        }

        const index:number  = this.fetchTargetIndex()
        if (index !== -1) {

          // 下移排除最底层, 上移排除最顶层
          if ((isDown && index === 0) || (!isDown && index === length - 1)) {
            loadingFinish()
            return
          }
          // 互换位置
          const swapIndex = isDown ? index - 1 : index + 1
          const targetItem = this.getComponentList[index]
          const swapItem = this.getComponentList[swapIndex]
          
          chartHistoryStoreStore.createLaryerHistory(targetItem)
          this.updateComponentList(index, swapItem)
          this.updateComponentList(swapIndex, targetItem)

          loadingFinish()
          return
        }
      } catch(value) {
        loadingError()
      }
    },
    // * 上移
    setUp() {
      this.wrap()
    },
    // * 下移
    setDown() {
      this.wrap(true)
    },
    // * 复制
    setCopy() {
      try {
        loadingStart()
        const index:number  = this.fetchTargetIndex()
        if (index !== -1) {
          this.setRecordCharts(this.getComponentList[index])
          window['$message'].success('复制成功！')
          loadingFinish()
        }
      } catch(value) {
        loadingError()
      }
    },
    // * 粘贴
    setParse() {
      try {
        loadingStart()
        const recordCharts = this.getRecordCharts
        if (recordCharts === undefined) {
          loadingFinish()
          return
        }
        const parseHandle = (e: CreateComponentType) => {
          e = cloneDeep(e)
          // 生成新 id
          e.id = getUUID()
          // 偏移位置
          e.attr.x = e.attr.x + 30
          e.attr.y = e.attr.y + 30
          return e
        }
        if (Array.isArray(recordCharts)) {
          recordCharts.forEach((e: CreateComponentType) => {
            console.log(parseHandle(e));
            this.addComponentList(parseHandle(e), undefined, true)
          })
          loadingFinish()
          return
        }
        this.addComponentList(parseHandle(recordCharts), undefined, true)
        loadingFinish()
      } catch(value) { 
        loadingError()
      }
    },
    // * 设置鼠标位置
    setMousePosition(x: number, y: number): void {
      this.mousePosition.x = x
      this.mousePosition.y = y
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