<template>
  <n-progress :type="type" :percentage="option.percentage"
              :indicator-placement="indicatorPlacement"
              :color="color"
  />
</template>

<script setup lang="ts">
import { PropType, toRefs, reactive, watch } from 'vue'
import { CreateComponentType } from '@/packages/index.d'
import { useChartDataFetch } from '@/hooks'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true,
  }
})

// 取配置数据
const { type, color, indicatorPlacement } = toRefs(props.chartConfig.option)

// 应用到图表的 option
const option = reactive({
  percentage: 0,
  color: '#F8B10AFF',
})

watch(
    () => props.chartConfig.option.color,
    () => {
      option.color = props.chartConfig.option.color
    }
)

watch(
    () => props.chartConfig.option.percentage,
    (newColor) => {
      option.percentage = newColor
    }
)
// 图表回调刷新
const callback = () => {
  option.percentage = props.chartConfig.option.dataset.percentage
}
callback()

const updateDataset = (newData: string | number) => {
  let p = parseFloat(`${newData}`)
  if (p <= 0) { p = 0 }
  if (p >= 100) { p = 100 }
  props.chartConfig.option.percentage = p.toFixed(1)
  option.value = props.chartConfig.option
}

watch(
    () => props.chartConfig.option.dataset,
    newData => updateDataset(newData),
    {
      immediate: true,
    }
)

useChartDataFetch(props.chartConfig, useChartEditStore, callback)
</script>
<style lang="scss" scoped>
@include go('decorates-number') {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
