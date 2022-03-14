<template>
  <VChart :theme="themeColor" :option="option.options" autoresize></VChart>
</template>

<script setup lang="ts">
import { reactive, watch, PropType } from 'vue'
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
  LegendComponent,
])
const chartEditStore = useChartEditStore()

const option = reactive({
  options: {}
})

// 渐变色处理
watch(()=>chartEditStore.getEditCanvasConfig.chartThemeColor, (newColor: keyof typeof chartColorsSearch) => {
    if (!document.location.hash.includes('preview')) {
      const themeColor = chartColorsSearch[newColor] || chartColorsSearch[defaultTheme]
      props.chartConfig.option.series.forEach((value: any, index: number) => {
        value.areaStyle.color = new graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: themeColor[3]
          },
          {
            offset: 1,
            color: 'rgba(0,0,0, 0)'
          }
        ])
        themeColor[index]
      })
    }
    option.options = mergeTheme(props.chartConfig.option, props.themeSetting, includes)
  }, 
  {
    immediate: true
  })
</script>
