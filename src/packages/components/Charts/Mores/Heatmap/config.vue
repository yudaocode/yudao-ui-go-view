<template>
  <div>
    <global-setting :optionData="optionData" :in-chart="true"></global-setting>
    <CollapseItem name="热力图" :expanded="true">
      <SettingItemBox name="拖拽手柄" :alone="true">
        <SettingItem name="">
          <n-switch v-model:value="heatMapConfig.visualMap.calculable" size="small" />
        </SettingItem>
      </SettingItemBox>
      <SettingItemBox name="实时更新" :alone="true">
        <n-switch v-model:value="heatMapConfig.visualMap.realtime" size="small" />
      </SettingItemBox>
    </CollapseItem>
  </div>
</template>

<script setup lang="ts">
  import { PropType, computed } from 'vue'
import { GlobalSetting, CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { option } from './config'
import { GlobalThemeJsonType } from '@/settings/chartThemes/index'

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option & GlobalThemeJsonType>,
      required: true
  }
})

const heatMapConfig = computed<typeof option>(() => {
  return props.optionData
})

</script>
