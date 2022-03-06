<template>
  <div class="go-preview">
    <div ref="previewRef">
      <h1>预览</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted, ref, nextTick } from 'vue'
import { usePreviewScale } from '@/hooks/index'
import { getLocalStorage, fetchRouteParams } from '@/utils'
import { StorageEnum } from '@/enums/storageEnum'
import { ChartEditStorage } from '@/store/modules/chartEditStore/chartEditStore.d'

interface ChartEditStorageType extends ChartEditStorage {
  id: string
}

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

const localStorageInfo: ChartEditStorageType | undefined = getLocalStorageInfo()
const width = localStorageInfo?.editCanvasConfig.width
const height = localStorageInfo?.editCanvasConfig.height

if (!localStorageInfo) {
  window['$message'].warning('获取数据失败')
}

nextTick(() => {
  const { calcRate, windowResize, unWindowResize } = usePreviewScale(width as number, height as number, previewRef.value)

  calcRate()
  windowResize()

  onUnmounted(() => {
    unWindowResize()
  })
})

</script>

<style lang="scss" scoped>
@include go("preview") {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  @include background-image("background-image");
}
</style>