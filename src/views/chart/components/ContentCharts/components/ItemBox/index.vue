<template>
  <div class="item-box" v-for="(item, index) in menuOptions" :key="index">
    <div class="list-header">
      <AppleControlBtn :mini="true" :disabled="true"></AppleControlBtn>
      <n-text class="list-header-text" depth="3">{{ item.title }}</n-text>
    </div>
    <div class="list-center go-flex-center">
      <img class="list-img" :src="item.image" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { AppleControlBtn } from '@/components/AppleControlBtn/index'
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
  @include filter-bg-color('background-color2');
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
    .list-img {
      height: 100%;
      border-radius: 6px;
    }
  }
}
</style>
