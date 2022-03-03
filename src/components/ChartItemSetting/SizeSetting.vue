<template>
  <SettingItemBox name="尺寸">
    <n-input-number
      v-model:value="chartAttr.w"
      :min="50"
      size="small"
      placeholder="px"
    >
      <template #prefix>
        <n-text depth="3">宽度</n-text>
      </template>
    </n-input-number>
    <n-input-number
      v-model:value="chartAttr.h"
      :min="50"
      size="small"
      placeholder="px"
    >
      <template #prefix>
        <n-text depth="3">高度</n-text>
      </template>
    </n-input-number>
  </SettingItemBox>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { PickCreateComponentType } from '@/packages/index.d'
import { SettingItemBox } from '@/components/ChartItemSetting/index'

const props = defineProps({
  chartAttr: {
    type: Object as PropType<Omit<PickCreateComponentType<'attr'>, 'node'>>,
    required: true
  }
})
</script>
