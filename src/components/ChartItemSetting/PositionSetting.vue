<template>
  <SettingItemBox name="边距">
    <n-input-number
      v-model:value="chartAttr.y"
      :min="0"
      size="small"
      placeholder="px"
    >
      <template #prefix>
        <n-text depth="3">上边</n-text>
      </template>
    </n-input-number>
    <n-input-number
      v-model:value="chartAttr.x"
      :min="0"
      size="small"
      placeholder="px"
    >
      <template #prefix>
        <n-text depth="3">左</n-text>
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
