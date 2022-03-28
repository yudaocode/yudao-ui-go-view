<template>
  <content-box
    class="go-content-layers"
    :class="{ scoped: !chartLayoutStore.getLayers }"
    title="图层"
    :depth="2"
    @back="backHandle"
  >
    <template #icon>
      <n-icon size="16" :depth="2">
        <component :is="LayersIcon"></component>
      </n-icon>
    </template>

    <!-- 图层内容 -->
    <layers-list-item
      v-for="item in reverseList"
      :key="item.id"
      :componentData="item"
      @mousedown="mousedownHandle(item)"
      @mouseenter="mouseenterHandle(item)"
      @mouseleave="mouseleaveHandle(item)"
      @contextmenu="handleContextMenu($event)"
    ></layers-list-item>
  </content-box>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ContentBox } from '../contentBox/index'
import { useChartLayoutStore } from '@/store/modules/chartLayoutStore/chartLayoutStore'
import { ChartLayoutStoreEnum } from '@/store/modules/chartLayoutStore/chartLayoutStore.d'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { CreateComponentType } from '@/packages/index.d'
import cloneDeep from 'lodash/cloneDeep'
import { useContextMenu } from '@/views/chart/hooks/useContextMenu.hook'
import { MenuEnum } from '@/views/chart/hooks/useContextMenu.hook.d'

import { LayersListItem } from './components/LayersListItem/index'
import { icon } from '@/plugins'

const { LayersIcon } = icon.ionicons5
const chartLayoutStore = useChartLayoutStore()
const chartEditStore = useChartEditStore()

const { handleContextMenu } = useContextMenu()

// 逆序输出
const reverseList = computed(() => {
  const list: CreateComponentType[] = cloneDeep(chartEditStore.getComponentList)
  return list.reverse()
})

const backHandle = () => {
  chartLayoutStore.setItem(ChartLayoutStoreEnum.LAYERS, false)
}

// 点击事件
const mousedownHandle = (item: CreateComponentType) => {
  chartEditStore.setTargetSelectChart(item.id)
}

// 进入事件
const mouseenterHandle = (item: CreateComponentType) => {
  chartEditStore.setTargetHoverChart(item.id)
}

// 移出事件
const mouseleaveHandle = (item: CreateComponentType) => {
  chartEditStore.setTargetHoverChart(undefined)
}
</script>

<style lang="scss" scoped>
$wight: 170px;
@include go(content-layers) {
  width: $wight;
  flex-shrink: 0;
  overflow: hidden;
  @extend .go-transition;
  &.scoped {
    width: 0;
  }
}
</style>
