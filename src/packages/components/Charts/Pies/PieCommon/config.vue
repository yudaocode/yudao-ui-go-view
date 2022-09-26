<template>
  <!-- Echarts 全局设置 -->
  <global-setting :optionData="optionData" ></global-setting>
  <CollapseItem name="饼图配置" :expanded="true">
    <SettingItemBox name="类型">
      <SettingItem>
        <n-select
          v-model:value="optionData.type"
          size="small"
          :options="fontWeightOptions"
        />
      </SettingItem>
    </SettingItemBox>
  </CollapseItem>
</template>

<script setup lang="ts">
import { PropType, watch } from "vue";
import { GlobalThemeJsonType } from "@/settings/chartThemes/index";
import {
   GlobalSetting,
  CollapseItem,
  SettingItemBox,
  SettingItem,
} from "@/components/Pages/ChartItemSetting";
import { PieTypeObject, PieTypeEnum } from "./config";

const props = defineProps({
  optionData: {
    type: Object as PropType<GlobalThemeJsonType>,
    required: true,
  },
});
const fontWeightOptions = [
  {
    label: PieTypeEnum.NORMAL,
    value: PieTypeObject[PieTypeEnum.NORMAL],
  },
  {
    label: PieTypeEnum.RING,
    value: PieTypeObject[PieTypeEnum.RING],
  },
  {
    label: PieTypeEnum.ROSE,
    value: PieTypeObject[PieTypeEnum.ROSE],
  },
];
</script>
