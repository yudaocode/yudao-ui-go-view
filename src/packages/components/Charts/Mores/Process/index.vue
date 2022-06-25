<template>
  <n-progress
    :type="type"
    :height="h"
    :processing="processing"
    :percentage="dataset"
    :indicator-placement="indicatorPlacement"
    :color="color"
    :rail-color="railColor"
    :offset-degree="offsetDegree"
  >
    <n-text
      :style="{
        color: indicatorTextColor,
        fontSize: `${indicatorTextSize}px`
      }"
    >
      {{dataset}} {{unit}}
    </n-text>
  </n-progress>
</template>

<script setup lang="ts">
import { PropType, toRefs, watch } from 'vue'
import { useChartDataFetch } from '@/hooks'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import config from './config'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<config>,
    required: true
  }
})

// 取配置数据
const { w, h } = toRefs(props.chartConfig.attr)
const {
  type,
  unit,
  color,
  fontSize,
  processing,
  railColor,
  indicatorTextColor,
  indicatorPlacement,
  indicatorTextSize,
  offsetDegree,
  dataset
} = toRefs(props.chartConfig.option)

useChartDataFetch(props.chartConfig, useChartEditStore)
</script>
