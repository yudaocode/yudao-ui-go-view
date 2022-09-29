<template>
  <div class="go-decorates-more-countdown">
    <div>剩余时间</div>
    <n-countdown :duration="50000" :active="true" />
    <flipper :front-text="9" ref="flipperRef" />
    <div>。</div>
  </div>
</template>

<script setup lang="ts">
import { PropType, toRefs, ref, watch, onMounted, onUnmounted } from 'vue'
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
let boxShadow = ref('none')

const { w, h } = toRefs(props.chartConfig.attr)

let {
  timeColor,
  timeSize,
  timeLineHeight,
  timeTextIndent,
  fontWeight,
  showShadow,
  hShadow,
  vShadow,
  blurShadow,
  colorShadow
} = toRefs(props.chartConfig.option)

watch(
  props.chartConfig.option,
  () => {
    if (props.chartConfig.option.showShadow) {
      boxShadow.value = `${props.chartConfig.option.hShadow}px ${props.chartConfig.option.vShadow}px ${props.chartConfig.option.blurShadow}px ${props.chartConfig.option.colorShadow}`
    } else {
      boxShadow.value = 'none'
    }
  },
  {
    immediate: true
  }
)

const flipperRef = ref(null)

let COUNT = 9
let interval = 0
onMounted(() => {
  const interval = window.setInterval(() => {
    COUNT--
    if (COUNT === 0) window.clearInterval(interval)
    const flipperCON: any = flipperRef.value
    flipperCON?.flipDown(COUNT, COUNT - 1)
  }, 1000)
})
onUnmounted(() => {
  window.clearInterval(interval)
})
useChartDataFetch(props.chartConfig, useChartEditStore)
</script>

<style lang="scss" scoped>
@include go('decorates-more-countdown') {
  width: v-bind('`${w}px`');
  height: v-bind('`${h}px`');
}
</style>
