<template>
  <!-- Echarts 全局设置 -->
  <global-setting :optionData="optionData"> </global-setting>
  <!-- 胶囊柱图 -->
  <collapse-item :name="`胶囊柱图`" expanded>
    <SettingItemBox name="指标">
      <SettingItem name="显示数值">
        <n-space>
          <n-switch v-model:value="optionData.showValue" size="small"></n-switch>
        </n-space>
      </SettingItem>
      <setting-item name="单位">
        <n-input v-model:value="optionData.unit" size="small"></n-input>
      </setting-item>
      <setting-item name="每块高度(px)">
        <n-input-number
          v-model:value="optionData.itemHeight"
          :min="0"
          :step="1"
          size="small"
          placeholder="水球数值"
        ></n-input-number>
      </setting-item>
    </SettingItemBox>
  </collapse-item>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { GlobalSetting, CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { GlobalThemeJsonType } from '@/settings/chartThemes/index'

import { option } from './config'

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option & GlobalThemeJsonType>,
    required: true
  }
})

console.log(props.optionData)
</script>
