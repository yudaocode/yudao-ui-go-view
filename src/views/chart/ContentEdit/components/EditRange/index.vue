<template>
  <div
    class="go-edit-range"
    :style="rangeStyle"
    @mousedown="mousedownHandleUnStop($event, undefined)"
  >
    <slot></slot>
  </div>
  <div class="go-edit-range-model" :style="rangeModelStyle"></div>
</template>

<script setup lang="ts">
import { toRefs, computed } from 'vue'
import { useChartEditStoreStore } from '@/store/modules/chartEditStore/chartEditStore'
import { useSizeStyle } from '../../hooks/useStyle.hook'
import { mousedownHandleUnStop } from '../../hooks/useDrag.hook'

const chartEditStoreStore = useChartEditStoreStore()

const { getEditCanvasConfig, getEditCanvas } = toRefs(chartEditStoreStore)

const size = computed(() => {
  return {
    w: getEditCanvasConfig.value.width,
    h: getEditCanvasConfig.value.height
  }
})

const rangeStyle = computed(() => {
  const background = getEditCanvasConfig.value.background
  const backgroundImage = getEditCanvasConfig.value.backgroundImage
  const selectColor = getEditCanvasConfig.value.selectColor
  const backgroundColor = background ? background : null
  const computedBackground = selectColor
    ? { background: backgroundColor }
    : { background: `url(${backgroundImage}) no-repeat center/100% !important` }
  // @ts-ignore
  return { ...useSizeStyle(size.value), ...computedBackground }
})

// 模态层
const rangeModelStyle = computed(() => {
  const dragStyle = getEditCanvas.value.isDrag && {'z-index': 99999 }
  // @ts-ignore
  return { ...useSizeStyle(size.value), ...dragStyle}
})
</script>

<style lang="scss" scoped>
@include go(edit-range) {
  position: relative;
  border: 1px solid;
  border-radius: 15px;
  background: url('@/assets/images/canvas/pageBg.png');
  @include fetch-theme('box-shadow');
  @include filter-border-color('hover-border-color');
  @include fetch-theme-custom('border-color', 'background-color4');
}
@include go(edit-range-model) {
  z-index: -1;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 15px;
  border: 1px solid rgba(0, 0, 0, 0);
}
</style>
