<template>
  <ContentBox
    class="go-content-charts"
    :class="{ scoped: !getCharts }"
    title="组件"
    :depth="1"
    :backIcon="false"
  >
    <template #icon>
      <n-icon size="14" :depth="2">
        <BarChartIcon />
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
          <transition name="component-fade" mode="out-in">
            <keep-alive>
              <component :is="selectNode"></component>
            </keep-alive>
          </transition>
        </div>
      </div>
    </aside>
  </ContentBox>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs } from 'vue'
import { icon } from '@/plugins'
import { renderLang, renderIcon } from '@/utils'
import { ContentBox } from '../ContentBox/index'
import { useChartLayoutStore } from '@/store/modules/chartLayoutStore/chartLayoutStore'
import { useDesignStore } from '@/store/modules/designStore/designStore'

import { ChartCommon } from './components/ChartCommon'
import { TableCommon } from './components/TableCommon'
import { TextCommon } from './components/TextCommon'
import { DecorateCommon } from './components/DecorateCommon'

// 图标
const { BarChartIcon } = icon.ionicons5
const {
  TableSplitIcon,
  RoadmapIcon,
  SpellCheckIcon,
  GraphicalDataFlowIcon
} = icon.carbon

// 全局颜色
const designStore = useDesignStore()
const themeColor = ref(designStore.getAppTheme)

// 结构控制
const { setItem } = useChartLayoutStore()
const { getCharts } = toRefs(useChartLayoutStore())

// 菜单
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
  },
  {
    key: 'DecorateCommon',
    icon: renderIcon(GraphicalDataFlowIcon),
    label: renderLang('装饰'),
    node: DecorateCommon
  }
])

// 记录选中值
let beforeSelect: string = menuOptions[0]['key']
const selectValue = ref<string>(menuOptions[0]['key'])
// 渲染的组件控制
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
/* 整体宽度 */
$width: 300px;
/* 列表的宽度 */
$widthScoped: 65px;
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
      flex-shrink: 0;
      @include filter-bg-color('background-color3');
    }
    .menu-component-box {
      flex-shrink: 0;
      width: $width - $widthScoped;
      overflow: hidden;
    }
  }
  @include deep() {
    .menu-width {
      .n-menu-item {
        height: auto !important;
        &.n-menu-item--selected {
          &::after {
            content: '';
            position: absolute;
            left: 2px;
            top: 0;
            height: 100%;
            width: 3px;
            background-color: v-bind('themeColor');
            border-top-right-radius: 3px;
            border-bottom-right-radius: 3px;
          }
        }
        .n-menu-item-content {
          display: flex;
          flex-direction: column;
          padding: 6px 12px !important;
          font-size: 12px !important;
        }
        .n-menu-item-content__icon {
          font-size: 18px !important;
          margin-right: 0 !important;
        }
      }
    }
  }
}
</style>
