import { ref } from 'vue'
import throttle from 'lodash/throttle'

export const usePreviewScale = (
  width: number,
  height: number,
  scaleDom: HTMLElement | null
) => {
  // * 指向最外层容器（没生效不知道为啥）
  const appRef = ref()

  // * 屏幕尺寸（px）
  const baseWidth = width
  const baseHeight = height

  // * 默认缩放值
  const scale = {
    width: '1',
    height: '1',
  }

  // * 需保持的比例
  const baseProportion = parseFloat((baseWidth / baseHeight).toFixed(5))
  const calcRate = () => {
    // 当前宽高比
    const currentRate = parseFloat(
      (window.innerWidth / window.innerHeight).toFixed(5)
    )
    if (scaleDom) {
      if (currentRate > baseProportion) {
        // 表示更宽
        scale.width = (
          (window.innerHeight * baseProportion) /
          baseWidth
        ).toFixed(5)
        scale.height = (window.innerHeight / baseHeight).toFixed(5)
        scaleDom.style.transform = `scale(${scale.width}, ${scale.height}) translate(-50%, -50%)`
      } else {
        // 表示更高
        scale.height = (
          window.innerWidth /
          baseProportion /
          baseHeight
        ).toFixed(5)
        scale.width = (window.innerWidth / baseWidth).toFixed(5)
        scaleDom.style.transform = `scale(${scale.width}, ${scale.height}) translate(-50%, -50%)`
      }
    }
  }

  const resize = throttle(() => {
    calcRate()
  }, 200)

  // * 改变窗口大小重新绘制
  const windowResize = () => {
    window.addEventListener('resize', resize)
  }

  // * 改变窗口大小重新绘制
  const unWindowResize = () => {
    window.removeEventListener('resize', resize)
  }

  return {
    appRef,
    calcRate,
    windowResize,
    unWindowResize,
  }
}
