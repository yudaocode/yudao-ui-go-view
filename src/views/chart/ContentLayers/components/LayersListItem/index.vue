<template>
  <div class="go-content-layers-list-item" :class="{ hover, select, 'list-mini': selectText }">
    <div class="go-flex-center item-content">
      <n-image
        class="list-img"
        object-fit="contain"
        preview-disabled
        :src="image"
        :fallback-src="requireErrorImg()"
      ></n-image>
      <n-ellipsis style="margin-right: auto">
        <n-text class="list-text" :depth="2">
          {{ props.componentData.chartConfig.title }}
        </n-text>
      </n-ellipsis>
      <layers-status :isGroup="isGroup" :hover="hover" :status="status"></layers-status>
    </div>
    <div :class="{ 'select-modal': select }"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue'
import { requireErrorImg } from '@/utils'
import { useDesignStore } from '@/store/modules/designStore/designStore'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { LayersStatus } from '../LayersStatus/index'
import { LayerModeEnum } from '../../index.d'

const props = defineProps({
  componentData: {
    type: Object,
    required: true
  },
  isGroup: {
    type: Boolean,
    default: false
  },
  layerMode: {
    type: String as PropType<LayerModeEnum>,
    default: LayerModeEnum.THUMBNAIL
  }
})

// 全局颜色
const designStore = useDesignStore()
const chartEditStore = useChartEditStore()

// eslint-disable-next-line vue/no-setup-props-destructure
const { image } = props.componentData.chartConfig

// 颜色
const themeColor = computed(() => {
  return designStore.getAppTheme
})

// 计算当前选中目标
const select = computed(() => {
  const id = props.componentData.id
  return chartEditStore.getTargetChart.selectId.find((e: string) => e === id)
})

// 悬浮对象
const hover = computed(() => {
  return props.componentData.id === chartEditStore.getTargetChart.hoverId
})

// 组件状态 隐藏/锁定
const status = computed(() => {
  return props.componentData.status
})

// 是否选中文本
const selectText = computed(() => {
  return props.layerMode === LayerModeEnum.TEXT
})
</script>

<style lang="scss" scoped>
$centerHeight: 52px;
$centerMiniHeight: 28px;
$textSize: 10px;

@include go(content-layers-list-item) {
  position: relative;
  height: $centerHeight;
  width: 90%;
  margin: 5px 5%;
  margin-bottom: 5px;
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0);
  @extend .go-transition-quick;
  &.hover,
  &:hover {
    @include fetch-bg-color('background-color4');
  }
  &:hover {
    @include deep() {
      .icon-item {
        opacity: 1;
      }
    }
  }

  .select-modal,
  .item-content {
    position: absolute;
    top: 0;
    left: 0;
  }
  .item-content {
    z-index: 1;
    padding: 6px 5px;
    justify-content: start !important;
    width: calc(100% - 10px);
    height: calc(100% - 10px);
  }

  .select-modal {
    width: 100%;
    height: 100%;
    opacity: 0.3;
    background-color: v-bind('themeColor');
  }

  .list-img {
    flex-shrink: 0;
    height: $centerHeight;
    border-radius: 5px;
    overflow: hidden;
    border: none !important;
    padding: 2px;
    @include hover-border-color('hover-border-color');
  }

  .list-text {
    padding-left: 6px;
    font-size: $textSize;
  }

  /* 选中样式 */
  &.select {
    border: 1px solid v-bind('themeColor');
    /* 需要设置最高级，覆盖 hover 的颜色 */
    background-color: rgba(0, 0, 0, 0);
  }

  // mini样式
  &.list-mini {
    height: $centerMiniHeight;
  }
}
</style>
