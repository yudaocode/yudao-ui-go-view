<template>
<div>
  <div ref="vChartRef" id="chart1" class="chart" style="width: 100%;height: 100%;"></div>
</div>

</template>

<script setup lang="ts">
import {ref, nextTick, computed, watch, PropType, onMounted, onBeforeUnmount, onUpdated, toRefs} from 'vue'
// 引入 VChart 核心模块
import { VChart as VIChart,IVChart, ICommonChartSpec} from '@visactor/vchart';

import { use } from 'echarts/core'
import config, { includes, seriesItem } from './config'
import { mergeTheme } from '@/packages/public/chart'
import { useChartDataFetch } from '@/hooks'
import { CreateComponentType } from '@/packages/index.d'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { isPreview } from '@/utils'
import isObject from 'lodash/isObject'


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
  background,
  optionColors,
  optionSize,
  optionTitle,
  minMaxNumber,
  numberSize,
  titleSize
}  = toRefs(props.chartConfig.option.lineOptions)


let {
  legendsVisible,
  legendsPosition,
  legendsOrient
}  = toRefs(props.chartConfig.option.lineOptions.legends)

const parseSpec = (chartProps: LineChartProps) => {

  return {
    type: 'common',
    data: [
        ...props.chartConfig.option.dataset.source,
      {
        "id": "segment",
        "values": [
          {
            "type": "Level 1",
            "value": optionSize.value[0]
          },
          {
            "type": "Level 2",
            "value": optionSize.value[1]
          },
          {
            "type": "Level 3",
            "value": optionSize.value[2]
          }
        ]
      }
    ],
    background:background.value,
    series: [
      {
        type: 'gauge',
        dataIndex: 1,
        radiusField: 'type',
        angleField: 'value',
        seriesField: 'type',
        outerRadius: 0.9,
        innerRadius: 0.65,
        roundCap: true,
        segment: {
          style: {
            cornerRadius: 500,
            innerPadding: 10,
            outerPadding: 10,
            fill: {
              type: 'threshold',
              field: 'value',
              domain: [optionSize.value[0]+0.1, optionSize.value[1]+0.1],
              range:optionColors.value
            }
          }
        },
        track: {
          visible: true,
          style: {
            cornerRadius: 500,
            roundCap: true,
            fill: 'rgba(0, 0, 0, 0.1)'
          }
        }
      },
      {
        type: 'gaugePointer',
        dataIndex: 0,
        categoryField: 'type',
        valueField: 'value',
        innerRadius: 0.45,
        pin: {
          visible: true,
          width: 0.04,
          height: 0.04,
          isOnCenter: false,
          style: {
            fill: {
              type: 'threshold',
              field: 'value',
              domain: [optionSize.value[0].value,optionSize.value[1]],
              range: optionColors.value
            }
          }
        },
        pinBackground: {
          visible: false
        },
        pointer: {
          width: 0.2,
          height: 0.1,
          isOnCenter: false,
          style: {
            fill: {
              type: 'threshold',
              field: 'value',
              domain: [optionSize.value[0], optionSize.value[1]],
              range: optionColors.value
            }
          }
        },
        animation: false
      }
    ],
    startAngle: -200,
    endAngle: 20,
    axes: [
      {
        type: 'linear',
        orient: 'angle',
        inside: true,
        outerRadius: 0.9,
        innerRadius: 0.6,
        min: minMaxNumber.value[0],
        max: minMaxNumber.value[1],
        grid: { visible: false },
        tick: { visible: true, tickSize: 0, style: { lineWidth: 4, lineCap: 'round' } },
        subTick: { visible: true, tickSize: 0, style: { lineWidth: 4, lineCap: 'round' } },
        label: { visible: false }
      },
      {
        type: 'linear',
        orient: 'radius',
        outerRadius: 0.6,
        grid: { visible: false },
        label: { visible: false }
      }
    ],
    indicator: [
      {
        visible: true,
        offsetY: '-10%',
        title: {
          style: {
            text: props.chartConfig.option.dataset.source[0].values[0].value,
            fontSize: numberSize.value,
            fontWeight: 800
          }
        },
        content: [
          {
            style: {
              dy: 10,
              text: optionTitle.value,
              fontSize: titleSize.value,
            }
          }
        ]
      },
      {
        visible: true,
        offsetX: '-70%',
        offsetY: '45%',
        title: {
          style: {
            text: minMaxNumber.value[0],
            fontSize: 18
          }
        }
      },
      {
        visible: true,
        offsetX: '70%',
        offsetY: '45%',
        title: {
          style: {
            text: minMaxNumber.value[1],
            fontSize: 18
          }
        }
      }
    ]
  } as ICommonChartSpec;
}

const createOrUpdateChart = (chartProps: LineChartProps) => {
  if (vChartRef.value && !chart) {
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
    () => props.chartConfig.option.lineOptions,
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
