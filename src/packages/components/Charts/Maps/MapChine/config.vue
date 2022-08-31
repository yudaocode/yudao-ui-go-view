<template>
  <!-- Echarts 全局设置 -->
  <div>
    <global-setting :optionData="optionData" :in-chart="true"></global-setting>
    <CollapseItem name="标记样式" :expanded="false">
      <SettingItemBox name="标记">
        <SettingItem name="标记大小">
          <n-input-number
            v-model:value="series.symbolSize"
            size="small"
            :min="1"
          ></n-input-number>
        </SettingItem>
        <SettingItem name="颜色">
          <n-color-picker
            size="small"
            :modes="['hex']"
            v-model:value="series.itemStyle.color"
          ></n-color-picker>
        </SettingItem>
      </SettingItemBox>
    </CollapseItem>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed } from "vue";
import {
  CollapseItem,
  SettingItemBox,
  SettingItem,
} from "@/components/Pages/ChartItemSetting";
import { lineConf } from "@/packages/chartConfiguration/echarts/index";
import { GlobalThemeJsonType } from "@/settings/chartThemes/index";
import { GlobalSetting } from '@/components/Pages/ChartItemSetting'

const props = defineProps({
  optionData: {
    type: Object as PropType<GlobalThemeJsonType>,
    required: true,
  },
});
console.log('optionData',props.optionData)
const series = computed(() => {
  return props.optionData.series[0];
});
</script>
