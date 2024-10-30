<template>
  <!-- Echarts 全局设置 -->
  <global-setting :optionData="optionData"></global-setting>
<CollapseItem name="标签"  :expanded="true">
  <template #header>
    <n-switch v-model:value="props.optionData.lineOptions.legends.legendsVisible" size="small"></n-switch>
  </template>
  <setting-item-box name="样式">

    <setting-item name="背景颜色">
      <n-color-picker size="small" :modes="['hex']" v-model:value="props.optionData.lineOptions.background"></n-color-picker>
    </setting-item>

    <setting-item name="选项位置">
      <n-select
          v-model:value="props.optionData.lineOptions.legends.legendsOrient"
          :options="[
            { label: 'top', value: 'top' },
            { label: 'left', value: 'left' },
            { label: 'right', value: 'right' },
            { label: 'bottom', value: 'bottom' }
          ]"
      />
    </setting-item>

    <setting-item name="数值大小">
      <n-input-number v-model:value="props.optionData.lineOptions.numberSize" size="small" :min="10"></n-input-number>
    </setting-item>
    <setting-item name="文本大小">
      <n-input-number v-model:value="props.optionData.lineOptions.titleSize" size="small" :min="10"></n-input-number>
    </setting-item>

    <setting-item name="分百分比1">
      <n-input-number v-model:value="props.optionData.lineOptions.optionSize[0]" size="small" :min="1"></n-input-number>
    </setting-item>
    <setting-item name="分段颜色1">
      <n-color-picker size="small" :modes="['hex']" v-model:value="props.optionData.lineOptions.optionColors[0]"></n-color-picker>
    </setting-item>
    <setting-item name="分百分比2">
      <n-input-number v-model:value="props.optionData.lineOptions.optionSize[1]" size="small" :min="1"></n-input-number>
    </setting-item>
    <setting-item name="分段颜色2">
      <n-color-picker size="small" :modes="['hex']" v-model:value="props.optionData.lineOptions.optionColors[1]"></n-color-picker>
    </setting-item>
    <setting-item name="分百分比3">
      <n-input-number v-model:value="props.optionData.lineOptions.optionSize[2]" size="small" :min="1"></n-input-number>
    </setting-item>
    <setting-item name="分段颜色3">
      <n-color-picker size="small" :modes="['hex']" v-model:value="props.optionData.lineOptions.optionColors[2]"></n-color-picker>
    </setting-item>


  </setting-item-box>
  <setting-item-box name="数据配置">
    <setting-item name="最小值">
      <n-input-number v-model:value="props.optionData.lineOptions.minMaxNumber[0]" size="small" :min="0"></n-input-number>
    </setting-item>
    <setting-item name="最大值">
      <n-input-number v-model:value="props.optionData.lineOptions.minMaxNumber[1]" size="small" ></n-input-number>
    </setting-item>
    <setting-item name="标题文本">
      <n-input size="small"  v-model:value="props.optionData.lineOptions.optionTitle"></n-input>
    </setting-item>

  </setting-item-box>
</CollapseItem>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { GlobalSetting, CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { GlobalThemeJsonType } from '@/settings/chartThemes/index'

const props = defineProps({
  optionData: {
    type: Object as PropType<GlobalThemeJsonType>,
    required: true
  }
})

const seriesList = computed(() => {
  return props.optionData.series
})
</script>
