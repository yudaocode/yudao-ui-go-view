<template>
  <div class="go-preview">
    <!-- 缩放层 -->
    <div ref="previewRef">
      <!-- 展示层 -->
      <div :style="previewRefStyle" v-if="show">
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
import { useEditCanvasConfigStyle, getSessionStorageInfo } from './utils'
import { CreateComponentType } from '@/packages/index.d'
import { fetchChartComponent } from '@/packages/index'

const previewRef = ref()

const localStorageInfo: ChartEditStorageType = getSessionStorageInfo() as ChartEditStorageType

const width = ref(localStorageInfo?.editCanvasConfig.width)
const height = ref(localStorageInfo?.editCanvasConfig.height)
const show = ref(false)

const previewRefStyle: any = computed(() => {
  return useEditCanvasConfigStyle(localStorageInfo.editCanvasConfig)
})

// 注册组件(一开始无法获取window['$vue'])
const intervalTiming = setInterval(() => {
  if (window['$vue'].component) {
    clearInterval(intervalTiming)
    show.value = true
    localStorageInfo.componentList.forEach(async (e: CreateComponentType) => {
      if (!window['$vue'].component(e.chartConfig.chartKey)) {
        window['$vue'].component(
          e.chartConfig.chartKey,
          fetchChartComponent(e.chartConfig)
        )
      }
    })
  }
}, 200)

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
