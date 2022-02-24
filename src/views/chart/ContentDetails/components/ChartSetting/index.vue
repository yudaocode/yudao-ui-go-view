<template>
  <div class="go-chart-content-details">
    <GlobalSetting
      v-if="targetData"
      :data="targetData.option"
      :in-chart="true"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { loadAsyncComponent } from '@/utils'
import { useChartEditStoreStore } from '@/store/modules/chartEditStore/chartEditStore'
import { GlobalSetting } from '@/components/ChartItemSetting/index'
import { CreateComponentType } from '@/packages/index.d'

const GlobalSettingCom = loadAsyncComponent(() =>
  import('@/components/ChartItemSetting/index')
)
const chartEditStoreStore = useChartEditStoreStore()

const targetData = computed(() => {
  const list = chartEditStoreStore.getComponentList
  const targetIndex = chartEditStoreStore.fetchTargetIndex()
  return list[targetIndex]
})
</script>

<style lang="scss" scoped>
@include go('chart-content-details') {
}
</style>
