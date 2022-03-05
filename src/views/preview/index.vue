<template>
  <div class="go-preview">
    <h1>预览</h1>
  </div>
</template>

<script setup lang="ts">
import { getLocalStorage, fetchRouteParams } from '@/utils'
import { StorageEnum } from '@/enums/storageEnum'

const init = () => {
  const routeParamsRes = fetchRouteParams()
  if (!routeParamsRes) return
  const { id } = routeParamsRes

  const storageList = getLocalStorage(StorageEnum.GO_CHART_STORAGE_LIST)

  for (let i = 0; i < storageList.length; i++) {
    if (id.toString() === storageList[i]['id']) {
      console.log(storageList[i]);
      break; 
    }
  }
}

init()
</script>

<style lang="scss" scoped>
@include go("preview") {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  @include background-image("background-image");
}
</style>