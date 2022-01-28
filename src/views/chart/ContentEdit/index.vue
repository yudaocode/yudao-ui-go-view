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
      <EditRange>
        <!-- 右键 -->
        <n-dropdown
          placement="bottom-start"
          trigger="manual"
          size="small"
          :x="mousePosition.x"
          :y="mousePosition.y"
          :options="menuOptions"
          :show="showDropdownRef"
          :on-clickoutside="onClickoutside"
          @select="handleMenuSelect"
        />
        <ShapeBox
          v-for="(item, index) in chartEditStore.getComponentList"
          :key="item.id"
          :index="index"
          :style="useComponentStyle(item.attr, index)"
          @contextmenu="handleContextMenu($event, index)"
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
import { onUnmounted, onMounted, toRefs } from 'vue'
import { ContentBox } from '../ContentBox/index'
import { EditRange } from './components/EditRange'
import { EditBottom } from './components/EditBottom'
import { ShapeBox } from './components/ShapeBox/index'

import { useLayout } from './hooks/useLayout.hook'
import { handleDrop, handleDragOver } from './hooks/useDrop.hook'
import { useContextMenu } from './hooks/useContextMenu.hook'
import { getChartEditStore } from './hooks/useStore.hook'
import { useComponentStyle, useSizeStyle } from './hooks/useStyle.hook'

const chartEditStore = getChartEditStore()
const {
  showDropdownRef,
  menuOptions,
  onClickoutside,
  mousePosition,
  handleContextMenu,
  handleMenuSelect,
} = useContextMenu()
// 布局处理
useLayout()
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
