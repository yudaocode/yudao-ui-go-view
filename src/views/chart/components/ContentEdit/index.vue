<template>
  <ContentBox
    id="go-chart-edit-layout"
    ref="editDomRef"
    :flex="true"
    :showTop="false"
    :showBottom="true"
    :depth="1"
  >
    <div id="go-chart-edit-content">
      <!-- 中间区域 -->
      <EditRange></EditRange>
    </div>
    <!-- 底部控制 -->
    <template #bottom>
      <EditBottom />
    </template>
  </ContentBox>
</template>

<script lang="ts" setup>
import { onUnmounted, onMounted } from 'vue'
import { ContentBox } from '../ContentBox/index'
import { EditRange } from './components/EditRange'
import { EditBottom } from './components/EditBottom'
import { useLayout } from './hooks/useLayout.hook'

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
  }
}
</style>
