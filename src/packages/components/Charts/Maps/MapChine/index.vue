<template>
  <v-chart
    ref="vChartRef"
    :theme="themeColor"
    :option="option"
    :manual-update="isPreview()"
    autoresize
  >
  </v-chart>
</template>

<script setup lang="ts">
import { PropType, computed, reactive } from "vue";
import config, { includes } from "./config";
import VChart from "vue-echarts";
import { use, registerMap } from "echarts/core";
import { EffectScatterChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import { useChartDataFetch } from "@/hooks";
import { mergeTheme } from "@/packages/public/chart";
import { useChartEditStore } from "@/store/modules/chartEditStore/chartEditStore";
import dataJson from "./data";
import {
  DatasetComponent,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  GeoComponent,
} from "echarts/components";
import { isPreview } from "@/utils";
const props = defineProps({
  themeSetting: {
    type: Object,
    required: true,
  },
  themeColor: {
    type: Object,
    required: true,
  },
  chartConfig: {
    type: Object as PropType<config>,
    required: true,
  },
});
use([
  DatasetComponent,
  CanvasRenderer,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  GeoComponent,
  EffectScatterChart,
]);

registerMap("china", { geoJSON: dataJson });
//
const option = computed(() => {
  return mergeTheme(props.chartConfig.option, props.themeSetting, includes);
});
const { vChartRef } = useChartDataFetch(props.chartConfig, useChartEditStore);
</script>

<style lang="scss" scoped></style>
