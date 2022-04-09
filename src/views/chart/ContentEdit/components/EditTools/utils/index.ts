import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { canvasCut, downloadTextFile } from '@/utils'
const chartEditStore = useChartEditStore()

// 导入
export const importHandle = () => { }

// 导出
export const exportHandle = () => {
  // 导出数据
  downloadTextFile(JSON.stringify(chartEditStore.getStorageInfo || []), undefined, 'json')

  // 导出图片
  const ruler = document.getElementById('mb-ruler')
  const range = document.querySelector('.go-edit-range') as HTMLElement
  const watermark = document.getElementById('go-edit-watermark')
  // 隐藏边距线
  if (!ruler || !range || !watermark) {
    window['$message'].error('导出失败！')
    return
  }
  // 记录缩放比例
  const scaleTemp = chartEditStore.getEditCanvas.scale
  // 去除标尺Dom
  ruler.style.display = 'none'
  // 百分百展示页面
  chartEditStore.setScale(1, true)
  // 展示水印
  watermark.style.display = 'block'
  
  window['$message'].warning('生成截图和数据中, 请耐心等待...')
  setTimeout(() => {
    canvasCut(range, () => {
      // 隐藏水印
      if (watermark) watermark.style.display = 'none'
      // 放开边距线
      if (ruler) ruler.style.display = 'block'
      // 还原页面大小
      chartEditStore.setScale(scaleTemp, true)
    })
  }, 600)
}

// 改变工具栏展示样式
export const changeTypeHandle = () => {

}