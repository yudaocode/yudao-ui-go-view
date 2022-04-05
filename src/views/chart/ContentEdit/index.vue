<template>
  <content-box
    id="go-chart-edit-layout"
    :flex="true"
    :showTop="false"
    :showBottom="true"
    :depth="1"
    :xScroll="true"
    @drop="handleDrag"
    @dragover="handleDragOver"
  >
    <div id="go-chart-edit-content" @contextmenu="handleContextMenu">
      <!-- 展示 -->
      <edit-range>
        <!-- 图表 -->
        <edit-shape-box
          v-for="(item, index) in chartEditStore.getComponentList"
          :key="item.id"
          :data-id="item.id"
          :index="index"
          :style="useComponentStyle(item.attr, index)"
          :item="item"
          @mousedown="mousedownHandle($event, item)"
          @mouseenter="mouseenterHandle($event, item)"
          @mouseleave="mouseleaveHandle($event, item)"
          @contextmenu="handleContextMenu($event, item)"
        >
          <component
            class="edit-content-chart"
            :is="item.chartConfig.chartKey"
            :chartConfig="item"
            :themeSetting="themeSetting"
            :themeColor="themeColor"
            :style="useSizeStyle(item.attr)"
         ></component>
        </edit-shape-box>
      </edit-range>
    </div>
    <!-- 底部控制 -->
    <template #bottom>
      <EditBottom></EditBottom>
    </template>
  </content-box>
</template>

<script lang="ts" setup>
import { onMounted, computed } from 'vue'
import { ContentBox } from '../contentBox/index'
import { EditRange } from './components/EditRange'
import { EditBottom } from './components/EditBottom'
import { EditShapeBox } from './components/EditShapeBox'

import { useLayout } from './hooks/useLayout.hook'
import { useAddKeyboard } from '../hooks/useKeyboard.hook'
import { handleDrag, handleDragOver, useMouseHandle } from './hooks/useDrag.hook'
import { useContextMenu } from '@/views/chart/hooks/useContextMenu.hook'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { useComponentStyle, useSizeStyle } from './hooks/useStyle.hook'
import { chartColors } from '@/settings/chartThemes/index'

const chartEditStore = useChartEditStore()
const { handleContextMenu } = useContextMenu()

// 布局处理
useLayout()

// 点击事件
const { mouseenterHandle, mouseleaveHandle, mousedownHandle } = useMouseHandle()

// 主题色
const themeSetting = computed(() => {
  const chartThemeSetting = chartEditStore.getEditCanvasConfig.chartThemeSetting
  return chartThemeSetting
})

// 配置项
const themeColor = computed(() => {
  const chartThemeColor = chartEditStore.getEditCanvasConfig.chartThemeColor
  return chartColors[chartThemeColor]
})

// 键盘事件
onMounted(() => {
  useAddKeyboard()
})

</script>

<style lang="scss" scoped>
@include goId('chart-edit-layout') {
  position: relative;
  width: 100%;
  overflow: hidden;
  @extend .go-point-bg;
  @include background-image('background-point');
  @include goId('chart-edit-content') {
    border-radius: 10px;
    margin: 15px;
    overflow: hidden;
    @extend .go-transition;
    @include fetch-theme('box-shadow');
    .edit-content-chart {
      position: absolute;
    }
  }
}
</style>
