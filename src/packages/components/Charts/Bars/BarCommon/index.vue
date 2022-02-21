<template>
  <VChart :theme="themeColor" :option="option" autoresize />
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import config from './config'
import { mergeTheme } from '@/packages/public/chart'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent
} from 'echarts/components'

const props = defineProps({
  themeSetting: {
    type: Object,
    required: true
  },
  themeColor: {
    type: Object,
    required: true
  },
  chartData: {
    type: Object as PropType<config>,
    required: true
  }
})

use([
  CanvasRenderer,
  BarChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent
])

const includes = ['title', 'legend', 'xAxis', 'yAxis']

const option = computed(() => {
  return mergeTheme( props.chartData.option, props.themeSetting, includes)
})
</script>
