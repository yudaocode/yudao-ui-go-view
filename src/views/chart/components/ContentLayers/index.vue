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
  </ContentBox>
</template>

<script setup lang="ts">
import { ContentBox } from '../ContentBox/index'
import { useChartLayoutStore } from '@/store/modules/chartLayoutStore/chartLayoutStore'
import { ChartLayoutStoreEnum } from '@/store/modules/chartLayoutStore/chartLayoutStore.d'
import { icon } from '@/plugins'
const { LayersIcon } = icon.ionicons5
const chartLayoutStore = useChartLayoutStore()

const backHandle = () => {
  chartLayoutStore.setItem(ChartLayoutStoreEnum.LAYERS, false)
}
</script>

<style lang="scss" scoped>
$wight: 200px;
@include go(content-layers) {
  width: $wight;
  overflow: hidden;
  @extend .go-transition;
  &.scoped {
    width: 0;
  }
}
</style>
