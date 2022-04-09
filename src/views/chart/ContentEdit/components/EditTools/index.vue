<template>
  <div
    class="go-chart-edit-tools"
    :class="[
      settingStore.getChartToolsStatus,
      isMini && 'isMini',
    ]"
    @click="isMini && (isMini = false)"
    @mouseenter="toolsMouseoverHandle"
    @mouseleave="toolsMouseoutHandle"
  >
    <n-tooltip
      v-for="item in btnList"
      :key="item.key"
      :disabled="!isAside"
      trigger="hover"
      placement="left"
    >
      <template #trigger>
        <n-button
          v-show="!isMini"
          class="btn-item"
          :circle="isAside"
          secondary
          @click="item.handle"
        >
          <template #icon>
            <n-icon size="22" v-if="isAside">
              <component :is="item.icon"></component>
            </n-icon>
            <component v-else :is="item.icon"></component>
          </template>
          <n-text depth="3" v-show="!isAside">{{ item.name }}</n-text>
        </n-button>
      </template>
      <!-- 提示 -->
      <span>{{ item.name }}</span>
    </n-tooltip>
    <!-- PawIcon -->
    <n-icon
      v-show="settingStore.getChartToolsStatus === ToolsStatusEnum.ASIDE && isMini"
      size="22"
      v-if="isAside"
    >
      <PawIcon></PawIcon>
    </n-icon>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, h } from 'vue';
import { useSettingStore } from '@/store/modules/settingStore/settingStore'
import { ToolsStatusEnum } from '@/store/modules/settingStore/settingStore.d'
import { importHandle, exportHandle } from './utils'
import { icon } from '@/plugins'

const { DownloadIcon, ShareIcon, PawIcon } = icon.ionicons5
const settingStore = useSettingStore()
// 鼠标悬停定时器
let mouseTime: any = null
// 最小化
const isMini = ref<boolean>(true)
// 是否是侧边栏
const isAside = computed(() => settingStore.getChartToolsStatus === ToolsStatusEnum.ASIDE)

const btnList = [{
  key: 'import',
  name: '导入',
  icon: DownloadIcon,
  handle: importHandle
}, {
  key: 'export',
  name: '导出',
  icon: ShareIcon,
  handle: exportHandle
}]

const toolsMouseoverHandle = () => {
  mouseTime = setTimeout(() => {
    if (isMini.value) {
      isMini.value = false
    }
  }, 200);
}

const toolsMouseoutHandle = () => {
  clearTimeout(mouseTime)
  if (!isMini.value) {
    isMini.value = true
  }
}
</script>

<style lang="scss" scoped>
/* 底部区域的高度 */
$dockBottom: 60px;
$dockMiniWidth: 200px;
$dockMiniBottom: 53px;
$asideBottom: 70px;

@include go("chart-edit-tools") {
  @extend .go-background-filter;
  position: absolute;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 25px;
  border: 1px solid;
  mix-blend-mode: luminosity;
  transition: height ease-in 1s, padding 0.4s, bottom .4s;
  @include filter-border-color("hover-border-color-shallow");
  &.aside {
    flex-direction: column;
    height: auto;
    right: 20px;
    padding: 20px 8px;
    bottom: $asideBottom;
    .btn-item {
      margin-bottom: 10px;
      padding-bottom: 6px;
      &:last-child {
        margin-bottom: 0;
      }
      @include deep() {
        .n-button__icon {
          margin-right: 4px;
        }
      }
    }
    &.isMini {
      cursor: pointer;
      padding: 12px 8px;
      background-color: var(--n-toggle-bar-color);
    }
  }

  &.dock {
    width: auto;
    left: 50%;
    padding: 8px 30px;
    bottom: $dockBottom;
    transform: translateX(-50%);

    .btn-item {
      margin-right: 20px;
      &:last-child {
        margin-right: 0;
      }
    }
    /* 最小化 */
    &.isMini {
      height: 0;
      padding: 5px;
      width: $dockMiniWidth;
      bottom: $dockMiniBottom;
      border-radius: 8px;
      cursor: pointer;
      border: 0px;
      mix-blend-mode: screen;
    }
    &::after {
      content: "";
      position: absolute;
      left: 0;
      width: 100%;
      height: 30px;
      bottom: -25px;
      cursor: pointer;
    }
  }
}
</style>
