<template>
  <VChart :theme="themeColor" :option="option" autoresize></VChart>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import config, { includes } from './config'
import { mergeTheme, setData } from '@/packages/public/chart'
import dataJson from './data.json'
import {
  DatasetComponent,
  GridComponent,
  TooltipComponent,
  LegendComponent
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
  DatasetComponent,
  CanvasRenderer,
  BarChart,
  GridComponent,
  TooltipComponent,
  LegendComponent
])

const option = computed(() => {
  // TODO dataset的数据要设计一下，不能这样把数据进行监听，太耗性能
  return mergeTheme(props.chartConfig.option, props.themeSetting, includes)
})
</script>
