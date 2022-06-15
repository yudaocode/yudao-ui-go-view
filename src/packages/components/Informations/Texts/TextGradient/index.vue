<template>
  <div class="go-text-box">
    <n-gradient-text :size="size" :gradient="gradient">
      {{ option.dataset }}
    </n-gradient-text>
  </div>
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
  },
})

const option = reactive({
  dataset: ''
})

const { w, h } = toRefs(props.chartConfig.attr)

const {
  size,
  gradient
} = toRefs(props.chartConfig.option)

const callback = (newData: string) => {
  option.dataset = newData
}

watch(
  () => props.chartConfig.option.dataset,
  () => {
    option.dataset = props.chartConfig.option.dataset
  }, { immediate: true }
)

useChartDataFetch(props.chartConfig, useChartEditStore, callback)
</script>

<style lang="scss" scoped>
@include go('text-box') {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
