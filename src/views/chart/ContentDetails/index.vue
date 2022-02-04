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
      <ContentBox class="go-content-layers go-boderbox" :showTop="false" :depth="2">
        <n-tabs class="tabs-box" size="small" type="segment">
          <n-tab-pane
            v-for="item in tabList"
            :key="item.key"
            :name="item.key"
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
import {  shallowRef, ref, toRefs, watch, reactive } from 'vue'
import { icon } from '@/plugins'
import { ContentBox } from '../ContentBox/index'
import { useChartLayoutStore } from '@/store/modules/chartLayoutStore/chartLayoutStore'
import { ChartLayoutStoreEnum } from '@/store/modules/chartLayoutStore/chartLayoutStore.d'
import { Setting } from './components/Setting/index'
import { Behind } from './components/Behind/index'
import { Page } from './components/Page/index'
import { ContentEdit } from '../ContentEdit/index'

const { getDetails } = toRefs(useChartLayoutStore())
const { setItem } = useChartLayoutStore()

const { CubeIcon, FlashIcon } = icon.ionicons5

const collapsed = ref<boolean>(getDetails.value)

const collapsedHindle = () => {
  collapsed.value = true
  setItem(ChartLayoutStoreEnum.DETAILS, true)
}

const expandHindle = () => {
  collapsed.value = false
  setItem(ChartLayoutStoreEnum.DETAILS, false)
}

watch(getDetails, (newData) => {
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
  render: Page
})

const tabList = shallowRef([
  {
    key: 'setting',
    title: '设置',
    icon: CubeIcon,
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
