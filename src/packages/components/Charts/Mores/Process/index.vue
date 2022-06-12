<template>
  <n-progress
    :type="type"
    :percentage="dataset"
    :indicator-placement="indicatorPlacement"
    :color="color"
  />
</template>

<script setup lang="ts">
import { PropType, toRefs, watch } from 'vue'
import { useChartDataFetch } from '@/hooks'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import config  from './config'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<config>,
    required: true,
  },
})

// 取配置数据
const { type, color, indicatorPlacement, dataset } = toRefs(props.chartConfig.option)

useChartDataFetch(props.chartConfig, useChartEditStore)
</script>