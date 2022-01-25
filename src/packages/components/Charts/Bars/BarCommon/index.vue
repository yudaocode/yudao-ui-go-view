<template>
  <div :style="wrapperStyle">
    <v-chart theme="dark" :option="option" autoresize />
  </div>
</template>

<script setup lang="ts">
import { computed, toRef, PropType } from 'vue'
import VChart from 'vue-echarts'
import { use, graphic } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import config from './config'

const props = defineProps({
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
])

const option = computed(() => {
  return props.chartData.config
})

const attr = toRef(props.chartData, 'attr')
const wrapperStyle = computed(() => {
  return {
    width: `${attr.value.w}px`,
    height: `${attr.value.h}px`,
  }
})
</script>

<style lang="scss" scoped></style>
