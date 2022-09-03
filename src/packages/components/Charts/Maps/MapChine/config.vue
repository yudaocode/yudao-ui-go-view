<template>
  <!-- Echarts 全局设置 -->
  <div>
    <global-setting :optionData="optionData" :in-chart="true"></global-setting>
    <CollapseItem
      name="标记样式"
      :expanded="false"
      v-for="(item, index) in seriesList"
      :key="index"
    >
      <SettingItemBox name="标记">
        <SettingItem name="标记大小">
          <n-input-number
            v-model:value="item.symbolSize"
            size="small"
            :min="1"
          ></n-input-number>
        </SettingItem>
        <SettingItem name="颜色">
          <n-color-picker
            size="small"
            :modes="['hex']"
            v-model:value="item.itemStyle.normal.color"
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
import { GlobalSetting } from "@/components/Pages/ChartItemSetting";

const props = defineProps({
  optionData: {
    type: Object as PropType<GlobalThemeJsonType>,
    required: true,
  },
});
const seriesList = computed(() => {
  return props.optionData.series;
});
</script>
