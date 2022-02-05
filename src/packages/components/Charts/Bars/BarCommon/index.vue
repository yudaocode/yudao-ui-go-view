<template>
  <VChart :theme="themeData" :option="option" autoresize />
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components'
import config from './config'

const props = defineProps({
  themeData: {
    type: Object || String,
    default: 'dark',
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
  LegendComponent
])

const option = computed(() => {
  return props.chartData.option
})
</script>
