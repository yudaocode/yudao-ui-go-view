<template>
  <v-chart ref="vChartRef" :theme="themeColor" :option="option.value" :manual-update="isPreview()" autoresize></v-chart>
</template>

<script setup lang="ts">
import {computed, PropType, reactive, watch} from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import { mergeTheme } from '@/packages/public/chart'
import config, { includes } from './config'
import { useChartDataFetch } from '@/hooks'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { isPreview } from '@/utils'
import {
  DatasetComponent,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
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
  PieChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent
])

const option = reactive({
  value: {}
})

watch(
    () => props.chartConfig.option.dataset,
    (newData) => {
      // console.log('update:'+newData)
      const d = parseFloat(`${newData}`) * 100
      let config = props.chartConfig.option
      config.title.text = d.toFixed(2) + "%"
      config.series[0].data[0].value[0] = d
      config.series[0].data[1].value[0] = 100 - d
      option.value = mergeTheme(config, props.themeSetting, includes)
      option.value = config
    },
    {
      immediate: true,
    }
)

const { vChartRef } = useChartDataFetch(props.chartConfig, useChartEditStore)
</script>
