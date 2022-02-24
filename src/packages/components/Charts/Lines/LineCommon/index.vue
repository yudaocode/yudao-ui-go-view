<template>
  <VChart :theme="themeColor" :option="option" autoresize />
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue'
import VChart from 'vue-echarts'
import { use, graphic } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import config, { includes } from './config'
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
  LegendComponent,
  TitleComponent
])

const option = computed(() => {
  return mergeTheme( props.chartConfig.option, props.themeSetting, includes)
})
</script>
