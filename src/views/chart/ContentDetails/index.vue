<template>
  <n-layout has-sider sider-placement="right">
    <n-layout-content>
      <!-- 图表拖拽区域 -->
      <ContentEdit />
    </n-layout-content>
    <n-layout-sider
      collapse-mode="transform"
      :collapsed-width="0"
      :width="350"
      :collapsed="collapsed"
      :native-scrollbar="false"
      show-trigger="bar"
      @collapse="collapsedHindle"
      @expand="expandHindle"
    >
      <ContentBox
        class="go-content-layers go-boderbox"
        :showTop="false"
        :depth="2"
      >
        <!-- 画布 -->
        <n-tabs
          v-show="!selectTarget"
          class="tabs-box"
          size="small"
          type="segment"
        >
          <n-tab-pane size="small" display-directive="show:lazy">
            <template #tab>
              <n-space>
                <span> 页面设置 </span>
                <n-icon size="16" class="icon-position">
                  <DesktopOutlineIcon />
                </n-icon>
              </n-space>
            </template>
            <CanvasPage name="canvas" />
          </n-tab-pane>
        </n-tabs>

        <!-- 编辑 -->
        <n-tabs
          v-show="selectTarget"
          class="tabs-box"
          size="small"
          type="segment"
        >
          <n-tab-pane
            v-for="item in tabList"
            :key="item.key"
            :name="item.key"
            size="small"
            display-directive="show:lazy"
          >
            <template #tab>
              <n-space>
                <span>{{ item.title }}</span>
                <n-icon size="16" class="icon-position">
                  <component :is="item.icon"></component>
                </n-icon>
              </n-space>
            </template>
            <component :is="item.render"></component>
          </n-tab-pane>
        </n-tabs>
      </ContentBox>
    </n-layout-sider>
  </n-layout>
</template>

<script setup lang="ts">
import { shallowRef, ref, toRefs, watch, computed, reactive } from 'vue'
import { icon } from '@/plugins'
import { loadAsyncComponent, loadSkeletonAsyncComponent } from '@/utils'
import { ContentBox } from '../ContentBox/index'
import { useChartLayoutStore } from '@/store/modules/chartLayoutStore/chartLayoutStore'
import { ChartLayoutStoreEnum } from '@/store/modules/chartLayoutStore/chartLayoutStore.d'
import { useChartEditStoreStore } from '@/store/modules/chartEditStore/chartEditStore'

const { getDetails } = toRefs(useChartLayoutStore())
const { setItem } = useChartLayoutStore()
const chartEditStoreStore = useChartEditStoreStore()

const { ConstructIcon, FlashIcon, DesktopOutlineIcon } = icon.ionicons5

const ContentEdit = loadAsyncComponent(() => import('../ContentEdit/index.vue'))
const CanvasPage = loadSkeletonAsyncComponent(() =>import('./components/CanvasPage/index.vue'))
const Setting = loadSkeletonAsyncComponent(() =>import('./components/Setting/index.vue'))
const Behind = loadSkeletonAsyncComponent(() => import('./components/Behind/index.vue'))

const collapsed = ref<boolean>(getDetails.value)

const collapsedHindle = () => {
  collapsed.value = true
  setItem(ChartLayoutStoreEnum.DETAILS, true)
}

const expandHindle = () => {
  collapsed.value = false
  setItem(ChartLayoutStoreEnum.DETAILS, false)
}

const selectTarget = computed(() => {
  const selectId = chartEditStoreStore.getTargetChart.selectId
  if (!selectId) return undefined
  return chartEditStoreStore.componentList[
    chartEditStoreStore.fetchTargetIndex()
  ]
})

watch(getDetails, newData => {
  if (newData) {
    collapsedHindle()
  } else {
    expandHindle()
  }
})

// 页面设置
const pageSetting = reactive({
  key: 'pageSetting',
  title: '页面设置',
  render: CanvasPage
})

const tabList = shallowRef([
  {
    key: 'setting',
    title: '设置',
    icon: ConstructIcon,
    render: Setting
  },
  {
    key: 'behind',
    title: '数据',
    icon: FlashIcon,
    render: Behind
  }
])
</script>

<style lang="scss" scoped>
@include go(content-layers) {
  padding: 10px;
  overflow: hidden;
  .icon-position {
    padding-top: 2px;
  }
}
</style>
