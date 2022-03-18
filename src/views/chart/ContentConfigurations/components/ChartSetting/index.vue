<template>
  <div class="go-chart-configurations-setting" v-if="targetData">
    <!-- 名称 -->
    <setting-item-box name="名称">
      <n-input
        type="text"
        maxlength="6"
        show-count
        placeholder="请输入图表名称"
        size="small"
        v-model:value="targetData.chartConfig.title"
     ></n-input>
    </setting-item-box>
    <!-- 尺寸 -->
    <size-setting :chartAttr="targetData.attr"></size-setting>
    <!-- 位置 -->
    <position-setting :chartAttr="targetData.attr" :canvasConfig="chartEditStore.getEditCanvasConfig"/>
    <!-- 样式 -->
    <styles-setting :chartStyles="targetData.styles"></styles-setting>
    <!-- 自定义配置项 -->
    <component :is="targetData.chartConfig.conKey" :optionData="targetData.option"></component>
    <!-- 全局设置 --> 
    <global-setting :optionData="targetData.option" :in-chart="true"></global-setting>
  </div>
</template>

<script setup lang="ts">
import { GlobalSetting, PositionSetting, SizeSetting, StylesSetting } from '@/components/ChartItemSetting/index'
import { SettingItemBox } from '@/components/ChartItemSetting/index'
import { useTargetData } from '../hooks/useTargetData.hook'

const { targetData, chartEditStore } = useTargetData()

</script>

<style lang="scss" scoped>
@include go('chart-configurations-setting') {
}
</style>
