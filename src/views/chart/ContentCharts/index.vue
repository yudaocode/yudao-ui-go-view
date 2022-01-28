<template>
  <!-- 左侧所有组件的展示列表 -->
  <ContentBox
    class="go-content-charts"
    :class="{ scoped: !getCharts }"
    title="组件"
    :depth="1"
    :backIcon="false"
  >
    <template #icon>
      <n-icon size="14" :depth="2">
        <BarChartIcon />
      </n-icon>
    </template>
    <!-- 图表 -->
    <aside>
      <div class="menu-width-box">
        <n-menu
          class="menu-width"
          v-model:value="selectValue"
          :options="menuOptions"
          :icon-size="16"
          :indent="18"
          @update:value="clickItemHandle"
        />
        <div class="menu-component-box">
          <Skeleton
            :load="!selectOptions"
            round
            text
            :repeat="2"
            style="width: 90%;"
          />
          <OptionContent
            v-if="selectOptions"
            :selectOptions="selectOptions"
            :key="selectValue"
          />
        </div>
      </div>
    </aside>
  </ContentBox>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs } from 'vue'
import { ContentBox } from '../ContentBox/index'
import { OptionContent } from './components/OptionContent'
import {
  getCharts,
  BarChartIcon,
  themeColor,
  selectOptions,
  selectValue,
  clickItemHandle,
  menuOptions
} from './hooks/useAside.hook'
</script>

<style lang="scss" scoped>
/* 整体宽度 */
$width: 330px;
/* 列表的宽度 */
$widthScoped: 65px;
/* 此高度与 ContentBox 组件关联 */
$topHeight: 40px;

@include go(content-charts) {
  width: $width;
  @extend .go-transition;
  &.scoped,
  .menu-width {
    width: $widthScoped;
  }
  .menu-width-box {
    display: flex;
    height: calc(100vh - #{$--header-height} - #{$topHeight});
    .menu-width {
      flex-shrink: 0;
      @include filter-bg-color('background-color2');
    }
    .menu-component-box {
      flex-shrink: 0;
      width: $width - $widthScoped;
      overflow: hidden;
    }
  }
  @include deep() {
    .menu-width {
      .n-menu-item {
        height: auto !important;
        &.n-menu-item--selected {
          &::after {
            content: '';
            position: absolute;
            left: 2px;
            top: 0;
            height: 100%;
            width: 3px;
            background-color: v-bind('themeColor');
            border-top-right-radius: 3px;
            border-bottom-right-radius: 3px;
          }
        }
        .n-menu-item-content {
          display: flex;
          flex-direction: column;
          padding: 6px 12px !important;
          font-size: 14px !important;
        }
        .n-menu-item-content__icon {
          font-size: 18px !important;
          margin-right: 0 !important;
        }
      }
    }
  }
}
</style>
