<template>
  <div class="go-preview">
    <!-- 缩放层 -->
    <div ref="previewRef">
      <!-- 展示层 -->
      <div :style="previewRefStyle">
        <!-- 渲染层 -->
        <RenderList :localStorageInfo="localStorageInfo" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted, ref, nextTick, computed } from 'vue'
import { usePreviewScale } from '@/hooks/index'
import { RenderList } from './components/RenderList/index'
import { ChartEditStorageType } from './index.d'
import { getLocalStorageInfo } from './utils/index'
import { useEditCanvasConfigStyle } from './hooks/useStyle.hook'

const previewRef = ref()

const localStorageInfo: ChartEditStorageType = getLocalStorageInfo() as ChartEditStorageType

const width = ref(localStorageInfo?.editCanvasConfig.width)
const height = ref(localStorageInfo?.editCanvasConfig.height)

const previewRefStyle: any = computed(() => {
  return useEditCanvasConfigStyle(localStorageInfo.editCanvasConfig)
})

if (!localStorageInfo) {
  window['$message'].warning('获取数据失败')
}

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
</script>

<style lang="scss" scoped>
@include go('preview') {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  @include background-image('background-image');
}
</style>
