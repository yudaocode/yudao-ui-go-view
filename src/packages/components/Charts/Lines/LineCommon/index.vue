<template>
  <VChart :theme="themeColor" :option="option.options" autoresize />
</template>

<script setup lang="ts">
import { computed, PropType, watch, reactive, watchEffect } from 'vue';
import VChart from 'vue-echarts'
import { use, graphic } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import config, { includes } from './config'
import { mergeTheme } from '@/packages/public/chart'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { chartColorsSearch, defaultTheme } from  '@/settings/chartThemes/index'

const props = defineProps({
  themeSetting: {
    type: Object,
    required: true
  },
  themeColor: {
    type: Object,
    required: true
  },
  chartConfig: {
    type: Object as PropType<config>,
    required: true
  }
})

use([
  CanvasRenderer,
  LineChart,
  GridComponent,
  TooltipComponent,
  LegendComponent
])

const chartEditStore = useChartEditStore()
const option = reactive({
  options: {}
})

watchEffect(()=> {
  option.options = mergeTheme(props.chartConfig.option, props.themeSetting, includes)
})

// 渐变色处理
watch(()=>chartEditStore.getEditCanvasConfig.chartThemeColor, (newColor: string) => {
  const themeColor = (chartColorsSearch as any)[newColor] || chartColorsSearch[defaultTheme]
  props.chartConfig.option.series[0].lineStyle.color.colorStops[0].color = themeColor[0]
  props.chartConfig.option.series[0].lineStyle.color.colorStops[1].color = themeColor[1]
  option.options = mergeTheme(props.chartConfig.option, props.themeSetting, includes)
})
</script>
