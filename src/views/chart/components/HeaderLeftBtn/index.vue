<template>
  <n-space class="header-left-btn" :size="25">
    <n-button size="small" quaternary @click="goHomeHandle()">
      <template #icon>
        <n-icon :depth="3">
          <HomeIcon />
        </n-icon>
      </template>
    </n-button>
    <n-space>
      <n-tooltip
        v-for="item in btnList"
        :key="item.key"
        placement="bottom"
        trigger="hover"
      >
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
import { renderIcon, goDialog, goHome } from '@/utils'
import { icon } from '@/plugins'
const { LayersIcon, BarChartIcon, PrismIcon, HomeIcon } = icon.ionicons5
import { useChartLayoutStore } from '@/store/modules/chartLayoutStore/chartLayoutStore'
import { ChartLayoutStoreEnums } from '@/store/modules/chartLayoutStore/chartLayoutStore.d'

const { setItem } = useChartLayoutStore()
const { getLayers, getCharts, getDetails } = toRefs(useChartLayoutStore())

type ItemType = {
  key: string
  select: Ref<boolean> | boolean
  title: string
  icon: any
}

const btnList = reactive<ItemType[]>([
  {
    key: ChartLayoutStoreEnums.CHARTS,
    select: getCharts,
    title: '图表组件',
    icon: renderIcon(BarChartIcon)
  },
  {
    key: ChartLayoutStoreEnums.LAYERS,
    select: getLayers,
    title: '图层控制',
    icon: renderIcon(LayersIcon)
  },
  {
    key: ChartLayoutStoreEnums.DETAILS,
    select: getDetails,
    title: '详情设置',
    icon: renderIcon(PrismIcon)
  }
])

const clickHandle = (item: ItemType) => {
  setItem(item.key, !item.select)
}

const goHomeHandle = () => {
  goDialog({
    message: '返回将不会保存任何操作',
    isMaskClosable: true,
    onPositiveCallback: goHome
  })
}
</script>
<style lang="scss" scoped>
.header-left-btn {
  margin-left: -37px;
  padding-right: 149px;
}
</style>
