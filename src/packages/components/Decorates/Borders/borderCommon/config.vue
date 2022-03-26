<template>
  <CollapseItem name="颜色" :expanded="true">
    <!-- <SettingItemBox
      name="图形"
      v-for="(item, index) in optionData.borderOptions.colors"
      :key="index"
    >
      <SettingItem :name="`颜色-${index + 1}`">
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="optionData.borderOptions.colors[index]"
        ></n-color-picker>
      </SettingItem>
    </SettingItemBox> -->
  </CollapseItem>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import {
  CollapseItem,
  SettingItemBox,
  SettingItem
} from '@/components/ChartItemSetting/index'
import Config from './config'

const props = defineProps({
  optionData: {
    type: Object as PropType<Config>,
    required: true
  }
})
console.log(props.optionData)
</script>
