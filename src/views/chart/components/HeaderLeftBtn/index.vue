<template>
  <n-space class="header-left-btn">
    <n-tooltip
      v-for="item in btnList"
      :key="item.key"
      placement="bottom"
      trigger="hover"
    >
      <template #trigger>
        <n-button
          :type="item.select ? 'info' : ''"
          size="small"
          ghost
          @click="clickHandle(item)"
        >
          <component :is="item.icon"></component>
        </n-button>
      </template>
      <span>
        {{ item.title }}
      </span>
    </n-tooltip>
  </n-space>
</template>

<script setup lang="ts">
import { reactive, watchEffect, ref } from 'vue'
import { renderIcon } from '@/utils'
import { icon } from '@/plugins'
const { LayersIcon, BarChartIcon, PrismIcon } = icon.ionicons5
import { useChartLayoutStore } from '@/store/modules/chartLayoutStore/chartLayoutStore'

const chartLayoutStore = useChartLayoutStore()

const init = (layers: boolean, charts: boolean, details: boolean) => [
  {
    key: 'layers',
    select: chartLayoutStore.getLayers,
    title: '图层控制',
    icon: renderIcon(LayersIcon)
  },
  {
    key: 'charts',
    select: chartLayoutStore.getCharts,
    title: '图表组件',
    icon: renderIcon(BarChartIcon)
  },
  {
    key: 'details',
    select: chartLayoutStore.getDetails,
    title: '详情设置',
    icon: renderIcon(PrismIcon)
  }
]

const btnList = ref()

watchEffect(() => {
  btnList.value = init(
    chartLayoutStore.getLayers,
    chartLayoutStore.getCharts,
    chartLayoutStore.getDetails
  )
})

const clickHandle = (item: { [T: string]: string }) => {
  chartLayoutStore.setItem(item.key, !item.select)
}
</script>
<style lang="scss" scoped>
.header-left-btn {
  padding-right: 212px;
}
</style>
