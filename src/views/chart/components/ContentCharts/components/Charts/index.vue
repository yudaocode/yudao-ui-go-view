<template>
  <div class="go-chart-common">
    <n-menu
      class="chart-menu-width"
      v-model:value="selectValue"
      :options="menuOptions"
      :icon-size="16"
      :indent="18"
    />
    <div class="chart-content-list">
      <div class="item-box" v-for="(item, index) in menuOptions" :key="index">
        <div class="list-header">
          <AppleControlBtn :mini="true" :disabled="true"></AppleControlBtn>
          <n-text class="list-header-text" depth="3">{{ item.title }}</n-text>
        </div>
        <div class="list-center go-flex-center">
          <img class="list-img" :src="item.image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watchEffect } from 'vue'
import { AppleControlBtn } from '@/components/AppleControlBtn/index'

const props = defineProps({
  packagesList: {
    type: Array,
    default: () => []
  }
})

let menuOptions: any[] = reactive([])

watchEffect(() => {
  console.log(props.packagesList)
  menuOptions = props.packagesList
})

const selectValue = ref<string>(menuOptions[0]['key'])
</script>

<style lang="scss" scoped>
/* 此高度与 ContentBox 组件关联*/
$topHeight: 60px;
/* 列表项宽度 */
$itemWidth: 86%;
/* 图片高度 */
$imgWidth: 90%;
@include go('chart-common') {
  display: flex;
  height: calc(100vh - #{$--header-height} - #{$topHeight});
  .chart-menu-width {
    flex-shrink: 0;
    @include filter-bg-color('background-color2-shallow');
  }
  .chart-content-list {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0;
    .item-box {
      margin: 0 7%;
      margin-top: 5px;
      width: $itemWidth;
      overflow: hidden;
      border-radius: 6px;
      @include filter-bg-color('background-color2');
      .list-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 15px;
        @include filter-bg-color('background-color4');
        &-text {
          font-size: 12px;
          margin-left: 8px;
        }
      }
      .list-center {
        padding: 10px 0;
        .list-img {
          width: $imgWidth;
          border-radius: 6px;
        }
      }
    }
  }
  @include deep() {
    .n-menu-item {
      height: 30px;
      &.n-menu-item--selected {
        &::before {
          background-color: rgba(0, 0, 0, 0);
        }
      }
      .n-menu-item-content {
        text-align: center;
        padding: 0px 14px !important;
        font-size: 12px !important;
      }
    }
  }
}
</style>
