<template>
  <VChart :theme="themeColor" :option="option" autoresize></VChart>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue'
import VChart from 'vue-echarts'
import { use, graphic } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import { mergeTheme } from '@/packages/public/chart'
import config, { includes } from './config'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
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
  BarChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
])

const option = computed(() => {
  return mergeTheme(props.chartConfig.option, props.themeSetting, includes)
})
</script>

<style lang="scss" scoped></style>
