<template>
  <!-- 工作台相关 -->
  <div class="go-chart">
    <n-layout>
      <HeaderPro>
        <template #left>
          <HeaderLeftBtn></HeaderLeftBtn>
        </template>
        <template #center>
          <HeaderTitle></HeaderTitle>
        </template>
        <template #ri-left>
          <HeaderRightBtn></HeaderRightBtn>
        </template>
      </HeaderPro>
      <n-layout-content content-style="overflow:hidden; display: flex">
        <ContentCharts></ContentCharts>
        <ContentLayers></ContentLayers>
        <ContentConfigurations></ContentConfigurations>
      </n-layout-content>
    </n-layout>
  </div>
  <!-- 右键 -->
  <n-dropdown
    placement="bottom-start"
    trigger="manual"
    size="small"
    :x="mousePosition.x"
    :y="mousePosition.y"
    :options="menuOptions"
    :show="chartEditStore.getRightMenuShow"
    :on-clickoutside="onClickoutside"
    @select="handleMenuSelect"
  ></n-dropdown>
</template>

<script setup lang="ts">
import { loadAsyncComponent } from '@/utils'
import { HeaderPro } from '@/layout/components/HeaderPro'
import { useContextMenu } from './hooks/useContextMenu.hook'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { useChartHistoryStoreStore } from '@/store/modules/chartHistoryStore/chartHistoryStore'

const chartHistoryStoreStore = useChartHistoryStoreStore()
const chartEditStore = useChartEditStore()

// 记录初始化
chartHistoryStoreStore.canvasInit(chartEditStore.getEditCanvas)

const HeaderLeftBtn = loadAsyncComponent(() =>
  import('./headerLeftBtn/index.vue')
)
const HeaderRightBtn = loadAsyncComponent(() =>
  import('./headerRightBtn/index.vue')
)
const HeaderTitle = loadAsyncComponent(() => import('./headerTitle/index.vue'))
const ContentLayers = loadAsyncComponent(() =>
  import('./contentLayers/index.vue')
)
const ContentCharts = loadAsyncComponent(() =>
  import('./contentCharts/index.vue')
)
const ContentConfigurations = loadAsyncComponent(() =>
  import('./contentConfigurations/index.vue')
)

// 右键
const {
  menuOptions,
  onClickoutside,
  mousePosition,
  handleContextMenu,
  handleMenuSelect
} = useContextMenu()
</script>

<style lang="scss" scoped>
@include go('chart') {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  @include background-image('background-image');
}
</style>
