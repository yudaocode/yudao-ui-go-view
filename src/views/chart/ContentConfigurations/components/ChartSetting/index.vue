<template>
  <div class="go-chart-content-details" v-if="targetData">
    <!-- 名称 -->
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
    <!-- 尺寸 -->
    <SizeSetting :chartAttr="targetData.attr" />
    <!-- 位置 -->
    <PositionSetting :chartAttr="targetData.attr" />
    <!-- 自定义配置项 -->
    <component :is="targetData.chartConfig.conKey" :optionData="targetData.option"></component>
    <!-- 全局设置 --> 
    <GlobalSetting :optionData="targetData.option" :in-chart="true" />
  </div>
</template>

<script setup lang="ts">
import { computed, Ref } from 'vue'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { GlobalSetting, PositionSetting, SizeSetting } from '@/components/ChartItemSetting/index'
import { CreateComponentType } from '@/packages/index.d'
import { SettingItemBox } from '@/components/ChartItemSetting/index'

const chartEditStore = useChartEditStore()

const targetData: Ref<CreateComponentType> = computed(() => {
  const list = chartEditStore.getComponentList
  const targetIndex = chartEditStore.fetchTargetIndex()
  return list[targetIndex]
})
</script>

<style lang="scss" scoped>
@include go('chart-content-details') {
}
</style>
