<template>
  <div class="go-chart-edit-tools" :class="settingStore.getChartToolsStatus">
    <!-- aside -->
    <div v-if="settingStore.getChartToolsStatus === ToolsStatusEnum.ASIDE" class="tools-aside"></div>
    <!-- dock -->
    <div v-else class="tools-dock"></div>
  </div>
</template>

<script setup lang="ts">
import { useSettingStore } from '@/store/modules/settingStore/settingStore'
import { ToolsStatusEnum } from '@/store/modules/settingStore/settingStore.d'

const settingStore = useSettingStore()
</script>

<style lang="scss" scoped>
/* 底部区域的高度 */
$topOrBottomHeight: 40px;
$asideBottom: 100px;
@include go('chart-edit-tools') {
  position: absolute;
  &.dock {
    right: 10px;
    bottom: $asideBottom;
    }
  &.aside {
    left: 50%;
    bottom: $topOrBottomHeight;
  }
  .tools-aside {

  }
  .tools-dock {

  }
}
</style>
