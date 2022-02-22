<template>
  <div class="go-canvas-chart-color">
    <CollapseItem name="标题">
      <ConfigItemBox name="标题颜色">
        <ConfigItem :width="200">
          <n-color-picker v-model:value="chartThemeSetting.title.textStyle.color" />
        </ConfigItem>
        
      </ConfigItemBox>
      <ConfigItemBox name="副标题颜色">
        <ConfigItem :width="200">
          <n-color-picker v-model:value="chartThemeSetting.title.subtextStyle.color" />
        </ConfigItem>
      </ConfigItemBox>
    </CollapseItem>
    <CollapseItem name="图例">
      <ConfigItemBox name="图例文字颜色">
        <ConfigItem :width="200">
          <n-color-picker v-model:value="chartThemeSetting.legend.textStyle.color" />
        </ConfigItem>
      </ConfigItemBox>
    </CollapseItem>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
import { useChartEditStoreStore } from '@/store/modules/chartEditStore/chartEditStore'
import {
  CollapseItem,
  ConfigItemBox,
  ConfigItem
} from '@/components/ConfigItemCom/index'

const chartEditStoreStore = useChartEditStoreStore()
const { chartThemeSetting } = chartEditStoreStore.getEditCanvasConfig
</script>

<style lang="scss" scoped>
@include go(canvas-chart-color) {
}
</style>
