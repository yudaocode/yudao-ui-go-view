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
      <EditRange> </EditRange>
    </div>
    <!-- 底部控制 -->
    <template #bottom> 
      <EditBottom />
    </template>
  </ContentBox>
</template>

<script lang="ts" setup>
import { ref, onUnmounted, onMounted, computed } from 'vue'
import { ContentBox } from '../ContentBox/index'
import { EditRange } from './components/EditRange'
import { EditBottom } from './components/EditBottom'
import { getChartEditStore } from './hooks/useStore'
import { EditCanvasTypeEnum } from '@/store/modules/chartEditStore/chartEditStore.d'

const chartEditStore = getChartEditStore()

onMounted(() => {
  // 设置 Dom 值(ref 不生效先用document)
  chartEditStore.setEditCanvasItem(
    EditCanvasTypeEnum.EDITLAYOUTDOM,
    document.getElementById('go-chart-edit-layout')
  )
  chartEditStore.setEditCanvasItem(
    EditCanvasTypeEnum.EDITCONTENTDON,
    document.getElementById('go-chart-edit-content')
  )

  // 大小初始化
  chartEditStore.setPageSize()

  // 监听初始化
  const removeScale = chartEditStore.listenerScale()

  onUnmounted(() => {
    removeScale()
  })
})

computed(() => {})
</script>

<style lang="scss" scoped>
@include goId(chart-edit-layout) {
  position: relative;
  width: 100%;
  overflow: hidden;
  @include background-image('background-point');
  @extend .go-point-bg;
  @include goId(chart-edit-content) {
    position: relative;
    top: 20px;
    left: 20px;
    transform-origin: left top;
    @extend .go-transition;
  }
}
</style>
