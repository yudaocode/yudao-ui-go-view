<template>
  <div class="go-chart-configurations-setting" v-if="targetData">
    <!-- 名称 -->
    <name-setting :chartConfig="targetData.chartConfig"></name-setting>
    <!-- 尺寸 -->
    <size-setting :chartAttr="targetData.attr"></size-setting>
    <!-- 位置 -->
    <position-setting :chartAttr="targetData.attr" :canvasConfig="chartEditStore.getEditCanvasConfig"/>
    <!-- 样式 -->
    <styles-setting :chartStyles="targetData.styles"></styles-setting>
    <!-- 自定义配置项 -->
    <component :is="targetData.chartConfig.conKey" :optionData="targetData.option"></component>
  </div>
</template>

<script setup lang="ts">
import { NameSetting, PositionSetting, SizeSetting, StylesSetting } from '@/components/ChartItemSetting/index'
import { useTargetData } from '../hooks/useTargetData.hook'
const { targetData, chartEditStore } = useTargetData()

</script>

<style lang="scss" scoped>
@include go('chart-configurations-setting') {
}
</style>
