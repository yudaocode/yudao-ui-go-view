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
import { toRefs, reactive } from 'vue'
import { renderIcon } from '@/utils'
import { icon } from '@/plugins'
const { LayersIcon, BarChartIcon, PrismIcon } = icon.ionicons5
import { useChartLayoutStore } from '@/store/modules/chartLayoutStore/chartLayoutStore'

const { setItem } = useChartLayoutStore()
const { getLayers, getCharts, getDetails } = toRefs(useChartLayoutStore())

const btnList = reactive([
  {
    key: 'layers',
    select: getLayers,
    title: '图层控制',
    icon: renderIcon(LayersIcon)
  },
  {
    key: 'charts',
    select: getCharts,
    title: '图表组件',
    icon: renderIcon(BarChartIcon)
  },
  {
    key: 'details',
    select: getDetails,
    title: '详情设置',
    icon: renderIcon(PrismIcon)
  }
])

const clickHandle = (item: { [T: string]: string }) => {
  setItem(item.key, !item.select)
}
</script>
<style lang="scss" scoped>
.header-left-btn {
  padding-right: 212px;
}
</style>
