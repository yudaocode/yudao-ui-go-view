<template>
  <!-- <n-countdown :duration="50000" :active="true" /> -->
  <n-space class="go-decorates-more-countdown" :size="flipperGap" align="center" justify="center">
    <flipper
      :count="item"
      :width="flipperWidth"
      :height="flipperHeight"
      :front-color="flipperTextColor"
      :back-color="flipperBgColor"
      :radius="flipperRadius"
      :flip-type="flipperType"
      :duration="flipperSpeed"
      v-for="(item, index) in flipperData"
      :key="index"
    />
  </n-space>
</template>

<script setup lang="ts">
import { PropType, toRefs, watch, ref } from 'vue'
import { CreateComponentType } from '@/packages/index.d'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { useChartDataFetch } from '@/hooks'
import { Flipper } from '@/components/Flipper'
import { OptionType } from './config'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

const { w, h } = toRefs(props.chartConfig.attr)

const {
  flipperLength,
  flipperBgColor,
  flipperTextColor,
  flipperWidth,
  flipperHeight,
  flipperRadius,
  flipperGap,
  flipperType,
  flipperSpeed
} = toRefs(props.chartConfig.option as OptionType)

const flipperData = ref<string[] | number[]>([])
const getFlipperData = (val: string | number) => {
  return val
    .toString()
    .padStart(flipperLength.value, '0') // 左侧填充|右对齐
    .split('') // 转数组
    .slice(flipperLength.value * -1) // 从右向左取
}
const updateDatasetHandler = (newVal: string | number) => {
  flipperData.value = getFlipperData(newVal)
}

watch(
  () => props.chartConfig.option,
  newVal => {
    updateDatasetHandler((newVal as OptionType).dataset)
  },
  {
    immediate: true,
    deep: true
  }
)

useChartDataFetch(props.chartConfig, useChartEditStore, (newVal: string | number) => {
  updateDatasetHandler(newVal)
})
</script>

<style lang="scss" scoped>
@include go('decorates-more-countdown') {
  width: v-bind('`${w}px`');
  height: v-bind('`${h}px`');
}
</style>
