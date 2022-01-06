<template>
  <div class="go-content-box" :class="[`bg-depth${depth}`, flex && 'flex']">
    <div v-if="showTop" class="top go-mt-0">
      <n-text> {{ title }} </n-text>
      <n-space>
        <slot name="top-right"></slot>
        <n-icon size="20" class="go-cursor-pointer">
          <ChevronBackOutlineIcon />
        </n-icon>
      </n-space>
    </div>
    <aside class="content">
      <n-scrollbar x-scrollable>
        <n-scrollbar>
          <slot></slot>
        </n-scrollbar>
      </n-scrollbar>
    </aside>
    <div v-if="showBottom" class="bottom go-mt-0">
      <slot name="bottom"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { icon } from '@/plugins'
const { ChevronBackOutlineIcon } = icon.ionicons5

defineProps({
  title: String,
  showTop: {
    type: Boolean,
    default: true
  },
  showBottom: {
    type: Boolean,
    default: false
  },
  flex: {
    type: Boolean,
    default: false
  },
  // 背景深度
  depth: {
    type: Number,
    default: 1
  }
})
</script>

<style lang="scss" scoped>
$topHeight: 36px;
@include go(content-box) {
  height: calc(100vh - #{$--header-height});
  margin: 1px;
  margin-bottom: 0;
  &.bg-depth0 {
    @include filter-bg-color('background-color1');
    .bottom,
    .top {
      @include filter-bg-color('background-color1');
    }
  }
  &.bg-depth1 {
    @include filter-bg-color('background-color1');
    .bottom,
    .top {
      @include filter-bg-color('background-color2');
    }
  }
  &.bg-depth2 {
    @include filter-bg-color('background-color2');
    .bottom,
    .top {
      @include filter-bg-color('background-color3');
    }
  }
  &.bg-depth3 {
    @include filter-bg-color('background-color3');
    .bottom,
    .top {
      @include filter-bg-color('background-color4');
    }
  }
  &.flex {
    flex: 1;
  }
  .top,
  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 36px;
    padding: 0 10px;
  }
  .content {
    height: calc(100vh - #{$--header-height} - #{$topHeight});
    overflow: hidden;
  }
}
</style>
