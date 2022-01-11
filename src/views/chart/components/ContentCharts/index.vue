<template>
  <ContentBox
    class="go-content-charts"
    :class="{ scoped: !getCharts }"
    title="全部组件"
    :depth="1"
    :backIcon="false"
  >
    <template #icon>
      <n-icon size="14" :depth="2">
        <!-- <BarChartIcon /> -->
      </n-icon>
    </template>
    <!-- 图表 -->
    <aside>
      <div class="menu-width-box">
        <n-menu
          class="menu-width"
          v-model:value="selectValue"
          :options="menuOptions"
          :icon-size="16"
          :indent="18"
          @update:value="clickItemHandle"
        />
        <div class="menu-component-box">
          <keep-alive>
            <component :is="selectNode"></component>
          </keep-alive>
        </div>
      </div>
    </aside>
  </ContentBox>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs, computed } from 'vue'
import { icon } from '@/plugins'
import { renderLang, renderIcon } from '@/utils'
import { ContentBox } from '../ContentBox/index'
import { useChartLayoutStore } from '@/store/modules/chartLayoutStore/chartLayoutStore'

import { ChartCommon } from './components/ChartCommon'
import { TableCommon } from './components/TableCommon'
import { TextCommon } from './components/TextCommon'

const { BarChartIcon } = icon.ionicons5
const { TableSplitIcon, RoadmapIcon, SpellCheckIcon } = icon.carbon

const { setItem } = useChartLayoutStore()
const { getCharts } = toRefs(useChartLayoutStore())

const collapsed = ref(false)

const menuOptions = reactive([
  {
    key: 'ChartCommon',
    icon: renderIcon(RoadmapIcon),
    label: renderLang('图表'),
    node: ChartCommon
  },
  {
    key: 'TextCommon',
    icon: renderIcon(SpellCheckIcon),
    label: renderLang('信息'),
    node: TableCommon
  },
  {
    key: 'TableCommon',
    icon: renderIcon(TableSplitIcon),
    label: renderLang('表格'),
    node: TextCommon
  }
])

// 记录选中值
let beforeSelect: string = menuOptions[0]['key']
const selectValue = ref<string>(menuOptions[0]['key'])

const selectNode = ref(menuOptions[0]['node'])

// 点击 item
const clickItemHandle = <T extends { node: any }>(key: string, item: T) => {
  // 处理渲染的 node
  selectNode.value = item.node
  // 处理折叠
  if (beforeSelect === key) {
    setItem('charts', !getCharts.value)
  } else {
    setItem('charts', true)
  }
  beforeSelect = key
}
</script>

<style lang="scss" scoped>
$width: 300px;
$widthScoped: 80px;
/* 此高度与 ContentBox 组件关联*/
$topHeight: 36px;
@include go(content-charts) {
  width: $width;
  @extend .go-transition;
  &.scoped,
  .menu-width {
    width: $widthScoped;
  }
  .menu-width-box {
    display: flex;
    height: calc(100vh - #{$--header-height} - #{$topHeight});
    .menu-width {
      @include filter-bg-color('background-color2');
    }
    .menu-component-box {
      width: $width - $widthScoped;
      overflow: hidden;
    }
  }
  @include deep() {
    .n-menu-item-content {
      padding: 0 12px !important;
    }
    .n-menu-item-content__icon {
      margin-right: 0 !important;
    }
  }
}
</style>
