<template>
  <ContentBox
    class="go-content-charts"
    :class="{ scoped: !getCharts }"
    title="图表"
    :depth="2"
    :backIcon="false"
  >
    <template #icon>
      <n-icon size="14" :depth="2">
        <BarChartIcon />
      </n-icon>
    </template>
  </ContentBox>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
import { icon } from '@/plugins'
const { BarChartIcon } = icon.ionicons5
import { ContentBox } from '../ContentBox/index'
import { useChartLayoutStore } from '@/store/modules/chartLayoutStore/chartLayoutStore'
const { getCharts } = toRefs(useChartLayoutStore())
</script>

<style lang="scss" scoped>
$wight: 300px;
$wightScoped: 80px;
@include go(content-charts) {
  width: $wight;
  @extend .go-transition;
  &.scoped {
    width: $wightScoped;
  }
}
</style>
