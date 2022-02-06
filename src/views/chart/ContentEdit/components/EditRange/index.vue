<template>
  <div
    class="go-edit-range"
    :style="style"
    @mousedown="mousedownHandleUnStop($event, undefined)"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { toRefs, computed } from 'vue'
import { useChartEditStoreStore } from '@/store/modules/chartEditStore/chartEditStore'
import { useSizeStyle } from '../../hooks/useStyle.hook'
import { mousedownHandleUnStop } from '../../hooks/useDrop.hook'

const chartEditStoreStore = useChartEditStoreStore()

const { getEditCanvasConfig } = toRefs(chartEditStoreStore)

const size = computed(() => {
  return {
    w: getEditCanvasConfig.value.width,
    h: getEditCanvasConfig.value.height
  }
})

const style = computed(() => {
  const background = getEditCanvasConfig.value.background
  const backgroundImage = getEditCanvasConfig.value.backgroundImage
  const selectColor = getEditCanvasConfig.value.selectColor
  const backgroundColor = background ? background : null
  const computed = selectColor
    ? { background: backgroundColor }
    : { background: `url(${backgroundImage}) no-repeat center/100% !important` }
  // @ts-ignore
  return { ...useSizeStyle(size.value), ...computed }
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
</style>
