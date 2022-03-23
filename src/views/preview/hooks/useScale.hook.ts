import { onUnmounted, ref, nextTick, computed } from 'vue'
import { usePreviewScale } from '@/hooks/index'
import type { ChartEditStorageType } from '../index.d'

export const useScale = (localStorageInfo: ChartEditStorageType) => {

  const previewRef = ref()

  const width = ref(localStorageInfo?.editCanvasConfig.width)
  const height = ref(localStorageInfo?.editCanvasConfig.height)

  // 屏幕适配
  nextTick(() => {
    const { calcRate, windowResize, unWindowResize } = usePreviewScale(
      width.value as number,
      height.value as number,
      previewRef.value
    )

    calcRate()
    windowResize()

    onUnmounted(() => {
      unWindowResize()
    })
  })

  return {
    previewRef
  }
}
