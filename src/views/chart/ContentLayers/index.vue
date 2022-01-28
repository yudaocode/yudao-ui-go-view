<template>
  <ContentBox
    class="go-content-layers"
    :class="{ scoped: !chartLayoutStore.getLayers }"
    title="图层"
    :depth="2"
    @back="backHandle"
  >
    <template #icon>
      <n-icon size="16" :depth="2">
        <component :is="LayersIcon" />
      </n-icon>
    </template>

    <!-- 图层内容 -->
    <ListItem v-for="item in chartEditStore.getComponentList" :key="item.id"/>
  </ContentBox>
</template>

<script setup lang="ts">
import { ContentBox } from '../ContentBox/index'
import { useChartLayoutStore } from '@/store/modules/chartLayoutStore/chartLayoutStore'
import { ChartLayoutStoreEnum } from '@/store/modules/chartLayoutStore/chartLayoutStore.d'
import { useChartEditStoreStore } from '@/store/modules/chartEditStore/chartEditStore'
import { ListItem } from './components/ListItem/index'
import { icon } from '@/plugins'

const { LayersIcon } = icon.ionicons5
const chartLayoutStore = useChartLayoutStore()

const chartEditStore = useChartEditStoreStore()

const backHandle = () => {
  chartLayoutStore.setItem(ChartLayoutStoreEnum.LAYERS, false)
}
</script>

<style lang="scss" scoped>
$wight: 150px;
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
