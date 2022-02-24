<template>
  <div class="go-chart-content-details" v-if="targetData">
    <div class="chart-config">
      <SettingItemBox name="名称">
        <n-input
          type="text"
          maxlength="6"
          show-count
          placeholder="请输入图表名称"
          size="small"
          v-model:value="targetData.chartConfig.title"
        />
      </SettingItemBox>
    </div>
    <GlobalSetting :data="targetData.option" :in-chart="true" />
  </div>
</template>

<script setup lang="ts">
import { computed, Ref } from 'vue'
import { loadAsyncComponent } from '@/utils'
import { useChartEditStoreStore } from '@/store/modules/chartEditStore/chartEditStore'
import { GlobalSetting } from '@/components/ChartItemSetting/index'
import { CreateComponentType } from '@/packages/index.d'
import { SettingItemBox } from '@/components/ChartItemSetting/index'

const GlobalSettingCom = loadAsyncComponent(() =>
  import('@/components/ChartItemSetting/index')
)
const chartEditStoreStore = useChartEditStoreStore()

const targetData: Ref<CreateComponentType> = computed(() => {
  const list = chartEditStoreStore.getComponentList
  const targetIndex = chartEditStoreStore.fetchTargetIndex()
  return list[targetIndex]
})
</script>

<style lang="scss" scoped>
@include go('chart-content-details') {
  .chart-config {
    padding: 20px 0;
  }
}
</style>
