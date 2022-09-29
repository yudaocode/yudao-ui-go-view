<template>
  <div class="go-decorates-more-countdown">
    <n-countdown :duration="50000" :active="true" />
    <n-space :gap="10">
      <flipper
        :front-text="9"
        :width="flipperWidth"
        :height="flipperHeight"
        :front-color="flipperTextColor"
        :back-color="flipperBgColor"
        :radius="flipperRadius"
        :duration="flipperSpeed"
        ref="flipperRef"
      />
      <flipper
        :front-text="9"
        :back-text="8"
        :width="flipperWidth"
        :height="flipperHeight"
        :front-color="flipperTextColor"
        :back-color="flipperBgColor"
        :radius="flipperRadius"
        :duration="flipperSpeed"
        ref="flipperRef2"
      />
      <flipper
        :front-text="8"
        :back-text="7"
        :width="flipperWidth"
        :height="flipperHeight"
        :front-color="flipperTextColor"
        :back-color="flipperBgColor"
        :radius="flipperRadius"
        :duration="flipperSpeed"
        ref="flipperRef3"
      />
      <flipper
        :front-text="7"
        :back-text="7"
        :width="flipperWidth"
        :height="flipperHeight"
        :front-color="flipperTextColor"
        :back-color="flipperBgColor"
        :radius="flipperRadius"
        :duration="flipperSpeed"
        ref="flipperRef4"
      />
      <flipper
        :front-text="6"
        :back-text="5"
        :width="flipperWidth"
        :height="flipperHeight"
        :front-color="flipperTextColor"
        :back-color="flipperBgColor"
        :radius="flipperRadius"
        :duration="flipperSpeed"
        ref="flipperRef5"
      />
      <flipper
        :front-text="5"
        :back-text="4"
        :width="flipperWidth"
        :height="flipperHeight"
        :front-color="flipperTextColor"
        :back-color="flipperBgColor"
        :radius="flipperRadius"
        :duration="flipperSpeed"
        ref="flipperRef6"
      />
    </n-space>
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

let { flipperBgColor, flipperTextColor, flipperWidth, flipperHeight, flipperRadius, flipperSpeed } = toRefs(
  props.chartConfig.option
)

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
    if (COUNT <= 1) window.clearInterval(interval)
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
