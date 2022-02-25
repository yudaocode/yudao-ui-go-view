<template>
  <div class="go-content-charts-item-box">
    <!-- 每一项组件的渲染 -->
    <div
      class="item-box"
      v-for="(item, index) in menuOptions"
      :key="index"
      draggable
      @dragstart="handleDragStart($event, item)"
    >
      <div class="list-header">
        <AppleControlBtn :mini="true" :disabled="true"></AppleControlBtn>
        <n-text class="list-header-text" depth="3">{{ item.title }}</n-text>
      </div>
      <div class="list-center go-flex-center">
        <n-image
          class="list-img"
          object-fit="contain"
          preview-disabled
          :src="item.image"
          :fallback-src="requireFallbackImg()"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AppleControlBtn } from '@/components/AppleControlBtn/index'
import { requireFallbackImg, componentInstall } from '@/utils'
import { DragKeyEnum } from '@/enums/editPageEnum'
import { ConfigType } from '@/packages/index.d'
import omit from 'lodash/omit'

defineProps({
  menuOptions: {
    type: Array,
    default: () => []
  }
})

// 拖拽处理
const handleDragStart = (e: DragEvent, item: ConfigType) => {
  componentInstall(item.key, item.node)
  // 将配置项绑定到拖拽属性上
  e!.dataTransfer!.setData(DragKeyEnum.DROG_KEY, JSON.stringify(omit(item, ['node', 'image'])))
}
</script>

<style lang="scss" scoped>
/* 列表项宽度 */
$itemWidth: 86%;
/* 内容高度 */
$centerHeight: 100px;
@include go('content-charts-item-box') {
  .item-box {
    margin: 0 7%;
    margin-bottom: 15px;
    width: $itemWidth;
    overflow: hidden;
    border-radius: 6px;
    cursor: pointer;
    border: 1px solid rgba(0, 0, 0, 0);
    @include filter-bg-color('background-color2');
    @extend .go-transition;
    &:hover {
      @include hover-border-color('background-color4');
      .list-img {
        transform: scale(1.1);
      }
    }
    .list-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 2px 15px;
      @include filter-bg-color('background-color3');
      &-text {
        font-size: 12px;
        margin-left: 8px;
      }
    }
    .list-center {
      padding: 6px 0;
      height: $centerHeight;
      overflow: hidden;
      .list-img {
        height: 100%;
        border-radius: 6px;
        @extend .go-transition;
      }
    }
  }
}
</style>
