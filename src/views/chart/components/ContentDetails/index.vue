<template>
  <ContentBox
    class="go-content-layers go-boderbox"
    :class="{ scoped: !chartLayoutStore.getDetails }"
    :showTop="false"
  >
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
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { renderIcon } from '@/utils'
import { icon } from '@/plugins'
import { ContentBox } from '../ContentBox/index'
import { useChartLayoutStore } from '@/store/modules/chartLayoutStore/chartLayoutStore'
import { Setting } from './components/Setting/index'
import { Behind } from './components/Behind/index'

const chartLayoutStore = useChartLayoutStore()

const { CubeIcon, FlashIcon } = icon.ionicons5

const tabList = reactive([
  {
    key: 'setting',
    title: '配置项',
    icon: renderIcon(CubeIcon),
    render: Setting
  },
  {
    key: 'behind',
    title: '后端数据',
    icon: renderIcon(FlashIcon),
    render: Behind
  }
])
</script>

<style lang="scss" scoped>
$wight: 400px;
@include go(content-layers) {
  width: $wight;
  padding: 10px;
  overflow: hidden;
  @extend .go-transition;
  .icon-position {
    padding-top: 2px;
  }
  &.scoped {
    width: 0;
    padding: 0;
  }
  .tabs-box {
    /* padding 值 */
    width: $wight - 2 * 10;
  }
}
</style>
