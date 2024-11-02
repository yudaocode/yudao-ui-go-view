<template>
<!--  <v-chart-->
<!--    ref="vChartRef"-->
<!--    :theme="themeColor"-->
<!--    :option="option"-->
<!--    :manual-update="isPreview()"-->
<!--    :update-options="{-->
<!--      replaceMerge: replaceMergeArr-->
<!--    }"-->
<!--    autoresize-->
<!--  ></v-chart>-->
<div>
  <div ref="vChartRef" id="chart" class="chart" style="width: 100%;height: 100%;"></div>
</div>

</template>

<script setup lang="ts">
import {ref, nextTick, computed, watch, PropType, onMounted, onBeforeUnmount, onUpdated, toRefs} from 'vue'
// import VChart from 'vue-echarts'
// 引入 VChart 核心模块
import { VChart as VIChart,IVChart, ILineChartSpec} from '@visactor/vchart';
// 引入柱状图
import { registerBarChart } from '@visactor/vchart';
// 引入坐标轴、Tooltip、CrossHair组件
import { registerTooltip, registerCartesianCrossHair, registerDomTooltipHandler } from '@visactor/vchart';

// 注册图表和组件
VIChart.useRegisters([registerBarChart, registerTooltip, registerDomTooltipHandler, registerCartesianCrossHair]);

import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import config, { includes, seriesItem } from './config'
import { mergeTheme } from '@/packages/public/chart'
import { useChartDataFetch } from '@/hooks'
import { CreateComponentType } from '@/packages/index.d'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { isPreview } from '@/utils'
import { DatasetComponent, GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import isObject from 'lodash/isObject'
//
// const props = defineProps({
//   themeSetting: {
//     type: Object,
//     required: true
//   },
//   themeColor: {
//     type: Object,
//     required: true
//   },
//   chartConfig: {
//     type: Object as PropType<config>,
//     required: true
//   },
//   colors:{
//     type: String[],
//     required: true
//   }
// })

use([DatasetComponent, CanvasRenderer, BarChart, GridComponent, TooltipComponent, LegendComponent])

const vChartRef = ref<HTMLElement>()
const replaceMergeArr = ref<string[]>()
//
// const option = computed(() => {
//   return mergeTheme(props.chartConfig.option, props.themeSetting, includes)
// })
interface LineChartProps {
  color?: string[]

}
const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  },
    themeSetting: {
    type: Object,
    required: true
  },
  themeColor: {
    type: Object,
    required: true
  },
  lineChartProps:{
    type: Object as PropType<LineChartProps>,
    required:true
  }
})

let chart: IVChart;

let {
  background
}  = toRefs(props.chartConfig.option.lineOptions)


let {
  legendsVisible,
  legendsPosition,
  legendsOrient
}  = toRefs(props.chartConfig.option.lineOptions.legends)

const parseSpec = (chartProps: LineChartProps) => {
  // console.log(chartProps)
  // console.log(props.themeColor)
  // console.log(props.chartConfig.option.dataset.data)
  // console.log(props.chartConfig.option.lineOptions.legends)
  // console.log(legendsOrient.value)
  console.log(props.chartConfig.option.dataset.dimensions.slice(0,0).concat(props.chartConfig.option.dataset.dimensions.slice(1)))
  const colors = chartProps.color ?? [
    "#6690F2",
    "#70D6A3",
    "#B4E6E2",
    "#63B5FC",
    "#FF8F62",
    "#FFDC83",
    "#BCC5FD",
    "#A29BFE",
    "#63C4C7",
    "#F68484",
  ];
  return {
    id: 'fieldsData',
    type: "line",
    name:"dark",
    data: [{
      values: props.chartConfig.option.dataset.source,
      transforms: [
        {
          type: 'fold',
          options: {
            key: 'type',
            value: 'value',
            fields: props.chartConfig.option.dataset.dimensions.slice(0,0).concat(props.chartConfig.option.dataset.dimensions.slice(1))
          }
        }
      ],
    }],

    color: {
      type: "ordinal",
      domain: [],
      range: colors,
    },
    background:background.value,
    // title: {
    //   visible: true,
    //   text: "我的图标自定义标题",
    //   textStyle:{
    //     fill:{
    //       gradient: 'radial',
    //       x0: 0.5,
    //       y0: 0,
    //       r0: 0,
    //       x1: 0.5,
    //       y1: 1,
    //       r1: 0.7,
    //       stops: [
    //         {
    //           offset: 0,
    //           color: 'rgba(255,0,0,0.5)' // 0% 处的颜色
    //         },
    //         {
    //           offset: 1,
    //           color: '#6690F2' // 100% 处的颜色
    //         }
    //       ]
    //     }
    //   }
    // },
    stack: true,
    xField: [props.chartConfig.option.dataset.dimensions[0],"type"],
    yField: "value",
    seriesField: "type",
    legends: [{ visible: legendsVisible.value, position: legendsPosition.value, orient: legendsOrient.value }],
  } as ILineChartSpec;
}

const createOrUpdateChart = (chartProps: LineChartProps) => {
  if (vChartRef.value && !chart) {
    console.log(parseSpec(props.themeColor))
    chart = new VIChart(parseSpec(props.themeColor), {
      dom: vChartRef.value,
    });

    chart.renderAsync();
    return true;
  } else if (chart) {
    chart.updateSpec(parseSpec(props.themeColor));
    chart.renderAsync();

    return true;
  }
  return false;
}

onMounted(() => {
  // console.log(props.lineChartProps)
  createOrUpdateChart(props.chartConfig.option.lineOptions);
});

onUpdated(() => {
  createOrUpdateChart(props.chartConfig.option.lineOptions);
});

onBeforeUnmount(() => {
  if (chart) {
    chart.release();
  }
});


const stopWatch = watch(
    () => props.chartConfig.option.dataset,
    option => {
      createOrUpdateChart(props.chartConfig.option.lineOptions);
    },
    {
      immediate: true,
      deep: true
    }
)


// dataset 无法变更条数的补丁
watch(
  () => props.chartConfig.option.dataset,
  (newData: { dimensions: any }, oldData) => {
    try {
      if (!isObject(newData) || !('dimensions' in newData)) return
      if (Array.isArray(newData?.dimensions)) {
        const seriesArr = []
        for (let i = 0; i < newData.dimensions.length - 1; i++) {
          seriesArr.push(seriesItem)
        }
        replaceMergeArr.value = ['series']
        props.chartConfig.option.series = seriesArr
        nextTick(() => {
          replaceMergeArr.value = []
        })
      }
    } catch (error) {
      console.log(error)
    }
  },
  {
    deep: false
  }
)

// const { vChartRef } =
    useChartDataFetch(props.chartConfig, useChartEditStore, (newData: any) => {

  props.chartConfig.option.dataset = newData
})
</script>
