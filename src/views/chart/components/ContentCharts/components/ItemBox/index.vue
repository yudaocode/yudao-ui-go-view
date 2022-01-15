<template>
  <div class="item-box" v-for="(item, index) in menuOptions" :key="index">
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
</template>

<script setup lang="ts">
import { AppleControlBtn } from '@/components/AppleControlBtn/index'
import { requireFallbackImg } from '@/utils'
defineProps({
  menuOptions: {
    type: Array,
    default: () => []
  }
})
</script>

<style lang="scss" scoped>
/* 列表项宽度 */
$itemWidth: 86%;
/* 内容高度 */
$centerHeight: 80px;
.item-box {
  margin: 0 7%;
  margin-bottom: 15px;
  width: $itemWidth;
  overflow: hidden;
  border-radius: 6px;
  cursor: pointer;
  border: 1px solid rgba(0,0,0,0);
  @include filter-bg-color("background-color2");
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
    @include filter-bg-color("background-color3");
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
</style>
