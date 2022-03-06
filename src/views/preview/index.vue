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
import { getLocalStorage, fetchRouteParams } from '@/utils'
import { StorageEnum } from '@/enums/storageEnum'
import { RenderList } from './components/RenderList/index'
import { ChartEditStorageType } from './index.d'

const previewRef = ref()

const getLocalStorageInfo: () => ChartEditStorageType | undefined = () => {
  const routeParamsRes = fetchRouteParams()
  if (!routeParamsRes) return
  const { id } = routeParamsRes

  const storageList: ChartEditStorageType[] = getLocalStorage(
    StorageEnum.GO_CHART_STORAGE_LIST
  )

  for (let i = 0; i < storageList.length; i++) {
    if (id.toString() === storageList[i]['id']) {
      return storageList[i]
    }
  }
}

const localStorageInfo: ChartEditStorageType = getLocalStorageInfo() as ChartEditStorageType

const width = ref(localStorageInfo?.editCanvasConfig.width)
const height = ref(localStorageInfo?.editCanvasConfig.height)

const previewRefStyle = computed(() => {
  return {
    position: 'relative',
    width: width.value? `${width.value || 100}px` : '100%',
    height: height.value? `${height.value}px` : '100%',
    border: '1px solid red'
  }
})

if (!localStorageInfo) {
  window['$message'].warning('获取数据失败')
}

nextTick(() => {
  const { calcRate, windowResize, unWindowResize } = usePreviewScale(width.value as number, height.value as number, previewRef.value)

  calcRate()
  windowResize()

  onUnmounted(() => {
    unWindowResize()
  })
})

</script>

<style lang="scss" scoped>
@include go("preview") {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  @include background-image("background-image");
}
</style>