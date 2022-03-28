<template>
  <v-chart
    ref="vChartRef"
    :theme="themeColor"
    :option="option"
    :manual-update="isPreview()"
    autoresize
  ></v-chart>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import 'echarts-liquidfill/src/liquidFill.js'
import { CanvasRenderer } from 'echarts/renderers'
import { GridComponent } from 'echarts/components'
import { mergeTheme } from '@/packages/public/chart'
import config, { includes } from './config'
import { isPreview } from '@/utils'

const props = defineProps({
  themeSetting: {
    type: Object,
    required: true,
  },
  themeColor: {
    type: Object,
    required: true,
  },
  chartConfig: {
    type: Object as PropType<config>,
    required: true,
  },
})

use([CanvasRenderer, GridComponent])

const option = computed(() => {
  return mergeTheme(props.chartConfig.option, props.themeSetting, includes)
})
</script>

<style lang="scss" scoped></style>
