<template>
  <n-space class="header-left-btn">
    <n-tooltip
      v-for="item in btnList"
      :key="item.title"
      placement="bottom"
      trigger="hover"
    >
      <template #trigger>
        <n-button type="info" size="small" ghost @click="item.fn">
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
import { reactive } from 'vue'
import { renderIcon } from '@/utils'
import { icon } from '@/plugins'
const { LayersIcon, BarChartIcon, PrismIcon } = icon.ionicons5

const layers = () => {
  console.log('选择了图层控制')
}

const charts = () => {
  console.log('选择了图表组件')
}

const details = () => {
  console.log('选择了详情')
}

const btnList = reactive([
  {
    fn: layers,
    select: true,
    title: '图层控制',
    icon: renderIcon(LayersIcon)
  },
  {
    fn: charts,
    select: true,
    title: '图表组件',
    icon: renderIcon(BarChartIcon)
  },
  {
    fn: details,
    select: true,
    title: '详情设置',
    icon: renderIcon(PrismIcon)
  }
])
</script>
<style lang="scss" scoped>
.header-left-btn {
  padding-right: 212px;
}
</style>
