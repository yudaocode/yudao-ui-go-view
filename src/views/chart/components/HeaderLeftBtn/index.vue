<template>
  <n-space class="header-left-btn" :size="25">
    <n-button size="small" quaternary #icon @click="goHome(true, '返回将不会保存任何操作')">
      <n-icon :depth="3">
        <HomeIcon />
      </n-icon>
    </n-button>
    <n-space>
      <n-tooltip v-for="item in btnList" :key="item.key" placement="bottom" trigger="hover">
        <template #trigger>
          <n-button
            :type="item.select ? 'success' : ''"
            size="small"
            ghost
            @click="clickHandle(item)"
          >
            <component :is="item.icon"></component>
          </n-button>
        </template>
        <span>{{ item.title }}</span>
      </n-tooltip>
    </n-space>
  </n-space>
</template>

<script setup lang="ts">
import { toRefs, Ref, reactive } from 'vue'
import { renderIcon, routerTurnByName, goHome } from '@/utils'
import { icon } from '@/plugins'
const { LayersIcon, BarChartIcon, PrismIcon, HomeIcon } = icon.ionicons5
import { useChartLayoutStore } from '@/store/modules/chartLayoutStore/chartLayoutStore'

const { setItem } = useChartLayoutStore()
const { getLayers, getCharts, getDetails } = toRefs(useChartLayoutStore())

type ItemType = {
  key: string;
  select: Ref<boolean> | boolean;
  title: string;
  icon: any
}

const btnList = reactive<ItemType[]>([
  {
    key: 'charts',
    select: getCharts,
    title: '图表组件',
    icon: renderIcon(BarChartIcon)
  },
  {
    key: 'layers',
    select: getLayers,
    title: '图层控制',
    icon: renderIcon(LayersIcon)
  },
  {
    key: 'details',
    select: getDetails,
    title: '详情设置',
    icon: renderIcon(PrismIcon)
  }
])



const clickHandle = (item: ItemType) => {
  setItem(item.key, !item.select)
}
</script>
<style lang="scss" scoped>
.header-left-btn {
  margin-left: -37px;
  padding-right: 149px;
}
</style>
