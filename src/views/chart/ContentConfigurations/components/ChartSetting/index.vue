<template>
  <div class="go-chart-configurations-setting" v-if="targetData">
    <!-- 名称 -->
    <SettingItemBox name="名称">
      <n-input
        type="text"
        maxlength="6"
        show-count
        placeholder="请输入图表名称"
        size="small"
        v-model:value="targetData.chartConfig.title"
     ></n-input>
    </SettingItemBox>
    <!-- 尺寸 -->
    <SizeSetting :chartAttr="targetData.attr"></SizeSetting>
    <!-- 位置 -->
    <PositionSetting :chartAttr="targetData.attr" :canvasConfig="chartEditStore.getEditCanvasConfig"/>
    <!-- 样式 -->
    <StylesSetting :chartStyles="targetData.styles"></StylesSetting>
    <!-- 自定义配置项 -->
    <component :is="targetData.chartConfig.conKey" :optionData="targetData.option"></component>
    <!-- 全局设置 --> 
    <GlobalSetting :optionData="targetData.option" :in-chart="true"></GlobalSetting>
  </div>
</template>

<script setup lang="ts">
import { computed, Ref } from 'vue'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { GlobalSetting, PositionSetting, SizeSetting, StylesSetting } from '@/components/ChartItemSetting/index'
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
@include go('chart-configurations-setting') {
}
</style>
