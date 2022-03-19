<template>
  <setting-item-box name="名称" :alone="true">
    <n-input
      type="text"
      maxlength="6"
      show-count
      placeholder="请输入图表名称"
      size="small"
      v-model:value="chartConfig.title"
    ></n-input>
  </setting-item-box>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { SettingItemBox } from '@/components/ChartItemSetting/index'
import { ConfigType } from '@/packages/index.d'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<ConfigType>,
    required: true
  },
})

</script>
