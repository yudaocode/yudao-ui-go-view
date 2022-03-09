<template>
  <CollapseItem name="通用样式" :expanded="true">
    <SettingItemBox name="透明度" :alone="true">
      <!-- 透明度 -->
      <n-slider
        v-model:value="chartStyles.opacity"
        :step="0.1"
        :min="0"
        :max="1"
      />
    </SettingItemBox>
  </CollapseItem>
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
