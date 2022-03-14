<template>
  <!-- 每个小模块的公共样式 -->
  <div class="go-content-box" :class="[`bg-depth${depth}`, flex && 'flex']">
    <div v-if="showTop" class="top go-mt-0 go-flex-no-wrap">
      <n-space class="go-flex-no-wrap" :size="5">
        <n-ellipsis>
          <n-text>{{ title }}</n-text>
        </n-ellipsis>
        <div class="mt-1">
          <slot name="icon"></slot>
        </div>
      </n-space>
      <n-space>
        <slot name="top-right"></slot>
        <n-icon
          v-show="backIcon"
          size="20"
          class="go-cursor-pointer"
          @click="backHandle"
        >
          <ChevronBackOutlineIcon></ChevronBackOutlineIcon>
        </n-icon>
      </n-space>
    </div>

    <aside class="content">
      <template v-if="xScroll">
        <n-scrollbar x-scrollable>
          <n-scrollbar>
            <slot></slot>
          </n-scrollbar>
        </n-scrollbar>
      </template>

      <template v-else>
        <n-scrollbar>
          <slot></slot>
        </n-scrollbar>
      </template>
    </aside>

    <div v-if="showBottom" class="bottom go-mt-0">
      <slot name="bottom"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { icon } from '@/plugins'
const { ChevronBackOutlineIcon } = icon.ionicons5

const chartEditStore = useChartEditStore()
const emit = defineEmits(['back'])

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
  // back
  backIcon: {
    type: Boolean,
    default: true
  },
  // 背景深度
  depth: {
    type: Number,
    default: 1
  },
  // x 轴滚动
  xScroll: {
    type: Boolean,
    default: false
  }
})

const backHandle = () => {
  emit('back')
}
</script>

<style lang="scss" scoped>
$topHeight: 40px;
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
    flex-wrap: nowrap;
    align-items: center;
    height: $topHeight;
    padding: 0 10px;
    .mt-1 {
      margin-top: 2px;
    }
  }
  .top {
    border-bottom: 1px solid;
    @include filter-border-color('background-color1');
  }
  .content {
    height: calc(100vh - #{$--header-height} - #{$topHeight});
    overflow: hidden;
  }
}
</style>
