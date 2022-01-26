<template>
  <ContentBox
    id="go-chart-edit-layout"
    ref="editDomRef"
    :flex="true"
    :showTop="false"
    :showBottom="true"
    :depth="1"
    @drop="handleDrop"
    @dragover="handleDragOver"
  >
    <div id="go-chart-edit-content">
      <!-- 展示 -->
      <EditRange>
        <component
          class="edit-content-chart" 
          v-for="(item, index) in chartEditStore.getComponentList"
          :key="item.id"
          :is="item.key"
          :chartData="item"
          :style="useComponentStyle(item.attr, index)"
        />
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
import { useLayout } from './hooks/useLayout.hook'
import { handleDrop, handleDragOver } from './hooks/useDrop.hook'
import { getChartEditStore } from './hooks/useStore.hook'
import { useComponentStyle } from './hooks/useStyle.hook'

const chartEditStore = getChartEditStore()

// 布局处理
useLayout()
</script>

<style lang="scss" scoped>
@include goId(chart-edit-layout) {
  position: relative;
  width: 100%;
  overflow: hidden;
  @include background-image("background-point");
  @extend .go-point-bg;
  @include goId(chart-edit-content) {
    position: relative;
    top: 20px;
    left: 20px;
    transform-origin: left top;
    border: 1px solid rgba(0, 0, 0, 0);
    overflow: hidden;
    @extend .go-transition;
    &.content-resize {
      border-radius: 15px;
      @include hover-border-color("hover-border-color");
    }
    .edit-content-chart{
      position: absolute;
    }
  }
}
</style>
