<template>
  <div
    class="go-edit-range go-transition"
    :style="rangeStyle"
    @mousedown="mousedownHandleUnStop($event, undefined)"
  >
    <n-watermark
      id="go-edit-watermark"
      :content="watermarkText"
      cross
      selectable
      :font-size="16"
      :line-height="16"
      :width="500"
      :height="150"
      :x-offset="12"
      :y-offset="80"
      :rotate="-15"
      style="display: none; width: 100%; height: 100%;"
    ></n-watermark>
    <slot></slot>
    <!-- 标尺 -->
    <edit-rule></edit-rule>
    <!-- 拖拽时的辅助线 -->
    <edit-align-line></edit-align-line>
  </div>
</template>

<script setup lang="ts">
import { toRefs, computed } from 'vue'
import { useSizeStyle } from '../../hooks/useStyle.hook'
import { mousedownHandleUnStop } from '../../hooks/useDrag.hook'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { EditAlignLine } from '../EditAlignLine'
import { EditRule } from '../EditRule'
import { watermarkText } from '@/settings/designSetting'

const chartEditStore = useChartEditStore()

const { getEditCanvasConfig, getEditCanvas } = toRefs(chartEditStore)

const size = computed(() => {
  return {
    w: getEditCanvasConfig.value.width,
    h: getEditCanvasConfig.value.height
  }
})

const rangeStyle = computed(() => {
  // 缩放
  const scale = {
    transform: `scale(${getEditCanvas.value.scale})`
  }
  // 设置背景色和图片背景
  const background = getEditCanvasConfig.value.background
  const backgroundImage = getEditCanvasConfig.value.backgroundImage
  const selectColor = getEditCanvasConfig.value.selectColor
  const backgroundColor = background ? background : undefined

  const computedBackground = selectColor
    ? { background: backgroundColor }
    : { background: `url(${backgroundImage}) no-repeat center/100% !important` }

  // @ts-ignore
  return { ...useSizeStyle(size.value), ...computedBackground, ...scale }
})

</script>

<style lang="scss" scoped>
@include go(edit-range) {
  position: relative;
  transform-origin: left top;
  @include filter-border-color("hover-border-color");
  @include filter-bg-color("background-color2");
}
</style>
