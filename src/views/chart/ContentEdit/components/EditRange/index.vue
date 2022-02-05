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
import { ref, computed } from 'vue'
import { useChartEditStoreStore } from '@/store/modules/chartEditStore/chartEditStore'
import { useSizeStyle } from '../../hooks/useStyle.hook'
import { mousedownHandleUnStop } from '../../hooks/useDrop.hook'

const chartEditStoreStore = useChartEditStoreStore()

const canvasConfig = ref(chartEditStoreStore.getEditCanvasConfig)

const size = computed(() => {
  return {
    w: canvasConfig.value.width,
    h: canvasConfig.value.height
  }
})

const background = computed(() => {
  const background = canvasConfig.value.background
  return background ? background : '#232324'
})

const style = computed(() => {
  // @ts-ignore
  return { ...useSizeStyle(size.value), background: background.value }
})
</script>

<style lang="scss" scoped>
@include go(edit-range) {
  position: relative;
  border: 1px solid;
  border-radius: 15px;
  @include filter-bg-color('background-color2');
  @include fetch-theme('box-shadow');
  @include filter-border-color('hover-border-color');
  @include fetch-theme-custom('border-color', 'background-color4');
}
</style>
