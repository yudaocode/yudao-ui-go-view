<template>
  <CollapseItem name="水球" :expanded="true">
    <SettingItemBox name="内容">
      <SettingItem name="数值">
        <n-input-number
          v-model:value="optionData.series[0].data[0]"
          :min="0"
          :step="0.01"
          size="small"
          placeholder="水球数值"
        ></n-input-number>
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox name="背景" :alone="true">
      <SettingItem>
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="optionData.series[0].backgroundStyle.color"
        ></n-color-picker>
      </SettingItem>
    </SettingItemBox>
  </CollapseItem>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { option } from './config'
import {
  CollapseItem,
  SettingItemBox,
  SettingItem,
} from '@/components/Pages/ChartItemSetting'

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true,
  },
})
</script>
