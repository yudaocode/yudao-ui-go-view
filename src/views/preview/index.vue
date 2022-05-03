<template>
  <div class="go-preview">
    <!-- 缩放层 -->
    <div ref="previewRef">
      <!-- 展示层 -->
      <div :style="previewRefStyle" v-if="show">
        <!-- 渲染层 -->
        <preview-render-list
          :localStorageInfo="localStorageInfo"
        ></preview-render-list>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { PreviewRenderList } from './components/PreviewRenderList'
import { getEditCanvasConfigStyle, getFilterStyle, getSessionStorageInfo } from './utils'
import { useComInstall } from './hooks/useComInstall.hook'
import { useScale } from './hooks/useScale.hook'
import { useStore } from './hooks/useStore.hook'
import type { ChartEditStorageType } from './index.d'

const localStorageInfo: ChartEditStorageType = getSessionStorageInfo() as ChartEditStorageType

const previewRefStyle = computed(() => {
  return { ...getEditCanvasConfigStyle(localStorageInfo.editCanvasConfig), ...getFilterStyle(localStorageInfo.editCanvasConfig) }
})

useStore(localStorageInfo)
const { previewRef } = useScale(localStorageInfo)
const { show } = useComInstall(localStorageInfo)
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
