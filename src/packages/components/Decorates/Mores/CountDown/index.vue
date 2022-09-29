<template>
  <div class="go-decorates-more-countdown">
    <!-- <n-countdown :duration="50000" :active="true" /> -->
    <n-space :gap="10">
      <flipper
        flip-type="down"
        :count="item"
        :width="flipperWidth"
        :height="flipperHeight"
        :front-color="flipperTextColor"
        :back-color="flipperBgColor"
        :radius="flipperRadius"
        :duration="flipperSpeed"
        v-for="(item, index) in flipperData"
        :key="index"
      />
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { PropType, toRefs, watch, computed } from 'vue'
import { CreateComponentType } from '@/packages/index.d'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { useChartDataFetch } from '@/hooks'
import { Flipper } from '@/components/Flipper/index'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

const { w, h } = toRefs(props.chartConfig.attr)

const {
  dataset,
  flipperLength,
  flipperBgColor,
  flipperTextColor,
  flipperWidth,
  flipperHeight,
  flipperRadius,
  flipperSpeed
} = toRefs(props.chartConfig.option)

const updateDatasetHandler = (newVal: number) => {
  let datasetVal = dataset?.value as Number
  datasetVal !== undefined && (datasetVal = newVal)
}

watch(
  props.chartConfig.option.dataset,
  (newVal: number) => {
    updateDatasetHandler(newVal)
  },
  {
    immediate: true
  }
)

const flipperData = computed(() => {
  const datasetVal: Number = dataset?.value || 0
  return datasetVal
    .toString()
    .padStart(flipperLength.value, '0')
    .split('')
    .slice(flipperLength.value * -1)
})

useChartDataFetch(props.chartConfig, useChartEditStore, (newVal: number) => {
  updateDatasetHandler(newVal)
})
</script>

<style lang="scss" scoped>
@include go('decorates-more-countdown') {
  width: v-bind('`${w}px`');
  height: v-bind('`${h}px`');
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
