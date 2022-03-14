<template>
  <collapse-item name="通用样式">
    <setting-item-box name="透明度" :alone="true">
      <!-- 透明度 -->
      <n-slider
        v-model:value="chartStyles.opacity"
        :step="0.1"
        :min="0"
        :max="1"
      ></n-slider>
    </setting-item-box>
  </collapse-item>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { PickCreateComponentType } from '@/packages/index.d'
import {
  SettingItemBox,
  CollapseItem
} from '@/components/ChartItemSetting/index'

const props = defineProps({
  chartStyles: {
    type: Object as PropType<PickCreateComponentType<'styles'>>,
    required: true
  }
})
</script>

<style lang="scss" scoped></style>
