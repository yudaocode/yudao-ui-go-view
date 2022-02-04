<template>
  <ContentBox
    id="go-chart-edit-layout"
    ref="editDomRef"
    :flex="true"
    :showTop="false"
    :showBottom="true"
    :depth="1"
    :xScroll="true"
    @drop="handleDrop"
    @dragover="handleDragOver"
  >
    <div id="go-chart-edit-content">
      <!-- 展示 -->
      <EditRange ref="editRangeRef">
        <!-- 图表 -->
        <ShapeBox
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
            :is="item.key"
            :chartData="item"
            :style="useSizeStyle(item.attr)"
          />
        </ShapeBox>
      </EditRange>
    </div>
    <!-- 底部控制 -->
    <template #bottom>
      <EditBottom />
    </template>
  </ContentBox>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { ContentBox } from '../ContentBox/index'
import { EditRange } from './components/EditRange'
import { EditBottom } from './components/EditBottom'
import { ShapeBox } from './components/ShapeBox/index'

import { useLayout } from './hooks/useLayout.hook'
import { useAddKeyboard } from '../hooks/useKeyboard.hook'
import { handleDrop, handleDragOver, useMouseHandle } from './hooks/useDrop.hook'
import { useContextMenu } from '@/views/chart/hooks/useContextMenu.hook'
import { getChartEditStore } from './hooks/useStore.hook'
import { useComponentStyle, useSizeStyle } from './hooks/useStyle.hook'
import { CreateComponentType } from '@/packages/index.d'

const chartEditStore = getChartEditStore()

const { handleContextMenu } = useContextMenu()

// 布局处理
useLayout()

// 点击事件
const editRangeRef = ref<HTMLElement | null>(null)
const { mouseenterHandle, mouseleaveHandle, mousedownHandle } = useMouseHandle()

// 键盘事件
onMounted(() => {
  useAddKeyboard()
})

</script>

<style lang="scss" scoped>
@include goId(chart-edit-layout) {
  position: relative;
  width: 100%;
  overflow: hidden;
  @include background-image('background-point');
  @extend .go-point-bg;
  @include goId(chart-edit-content) {
    margin: 20px;
    overflow: hidden;
    transform-origin: left top;
    border: 1px solid rgba(0, 0, 0, 0);
    @extend .go-transition;
    &.content-resize {
      border-radius: 15px;
      @include hover-border-color('hover-border-color');
    }
    .edit-content-chart {
      position: absolute;
    }
  }
}
</style>
