<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <video
    ref="vVideoRef"
    class="go-video"
    preload="auto"
    playsinline
    :loop="option.loop"
    :autoplay="option.autoplay"
    :muted="option.muted"
    :width="w"
    :height="h"
    :src="option.dataset"
  ></video>
</template>

<script setup lang="ts">
import { PropType, toRefs, shallowReactive, watch, ref } from 'vue'
import { useChartDataFetch } from '@/hooks'
import { CreateComponentType } from '@/packages/index.d'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { option as configOption } from './config'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

const { w, h } = toRefs(props.chartConfig.attr)
let option = shallowReactive({ ...configOption })

// 预览更新
const vVideoRef = ref(null)
useChartDataFetch(props.chartConfig, useChartEditStore, (newData: any) => {
  option = newData
})

// 编辑更新
watch(
  () => props.chartConfig.option,
  (newData: any) => {
    option = newData
    if (!vVideoRef.value) return
    const video: any = vVideoRef.value
    video.loop = option.loop
    video.autoplay = option.autoplay
    video.muted = option.muted

    // 控制是否播放还是停止在第一帧
    !option.autoplay && (video.pause(), (video.currentTime = 0))
    option.autoplay && video.play()
  },
  {
    immediate: true,
    deep: true
  }
)
</script>

<style lang="scss" scoped>
@include go('video') {
  display: block;
  object-fit: cover;
  mix-blend-mode: screen;
}
</style>
