<template>
  <n-space>
    <n-tooltip
      v-for="item in btnList"
      :key="item.title"
      placement="bottom"
      trigger="hover"
    >
      <template #trigger>
        <n-button type="info" size="small" ghost>
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
import { icon } from '@/plugins'
const { AlbumsIcon, BarChartIcon } = icon.ionicons5
import { renderIcon } from '@/utils'

const btnList = reactive([
  {
    select: true,
    title: '图层控制',
    icon: renderIcon(AlbumsIcon)
  },
  {
    select: true,
    title: '图表组件',
    icon: renderIcon(BarChartIcon)
  }
])
</script>
