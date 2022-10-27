<script setup lang="ts">
import { onMounted, watch, reactive } from 'vue'
import merge from 'lodash/merge'
import cloneDeep from 'lodash/cloneDeep'

const props = defineProps({
  chartConfig: {
    type: Object,
    default: () => ({})
  }
})
console.log(props.chartConfig.option)
type DataProps = {
  name: string | number
  value: string | number
  [key: string]: string | number
}

interface StateProps {
  defaultConfig: {
    dataSet: {
      dimensions: Array<string>
      source: Array<DataProps>
    }
    colors: Array<string>
    unit: string
    showValue: boolean
    itemHeight: number
  }
  mergedConfig: any
  capsuleLength: Array<number>
  capsuleValue: Array<string | Object>
  labelData: Array<number>
  capsuleItemHeight: string
}

const state = reactive<StateProps>({
  defaultConfig: {
    dataSet: { dimensions: ['name', 'value'], source: [] },
    colors: ['#37a2da', '#32c5e9', '#67e0e3', '#9fe6b8', '#ffdb5c', '#ff9f7f', '#fb7293'],
    unit: '',
    showValue: false,
    itemHeight: 10
  },
  mergedConfig: null,
  capsuleLength: [],
  capsuleValue: [],
  labelData: [],
  capsuleItemHeight: ''
})

watch(
  () => props.chartConfig.option,
  newVal => {
    console.log(newVal)
    calcData()
  },
  {
    deep: true
  }
)

function calcData() {
  mergeConfig()

  calcCapsuleLengthAndLabelData()
}

function mergeConfig() {
  state.mergedConfig = merge(cloneDeep(state.defaultConfig), props.chartConfig.option || {})
  console.log('state.mergedConfig', state.mergedConfig)
}

function calcCapsuleLengthAndLabelData() {
  const { source } = state.mergedConfig.dataSet
  if (!source.length) return

  state.capsuleItemHeight = handle(state.mergedConfig.itemHeight)
  const capsuleValue = source.map((item: DataProps) => item[state.mergedConfig.dataSet.dimensions[1]])

  const maxValue = Math.max(...capsuleValue)

  state.capsuleValue = capsuleValue

  state.capsuleLength = capsuleValue.map((v: any) => (maxValue ? v / maxValue : 0))

  const oneFifth = maxValue / 5

  const labelData = Array.from(new Set(new Array(6).fill(0).map((v, i) => Math.ceil(i * oneFifth))))

  state.labelData = labelData
}
const handle = (val: string | number) => {
  return val + 'px'
}
onMounted(() => {
  calcData()
})
</script>
<template>
  <div class="dv-capsule-chart">
    <template v-if="state.mergedConfig">
      <div class="label-column">
        <div
          v-for="item in state.mergedConfig.dataSet.source"
          :key="item[state.mergedConfig.dataSet.dimensions[0]]"
          :style="{ height: state.capsuleItemHeight, lineHeight: state.capsuleItemHeight }"
        >
          {{ item[state.mergedConfig.dataSet.dimensions[0]] }}
        </div>
        <div class="laset">&nbsp;</div>
      </div>

      <div class="capsule-container">
        <div
          v-for="(capsule, index) in state.capsuleLength"
          :key="index"
          class="capsule-item"
          :style="{ height: state.capsuleItemHeight }"
        >
          <div
            class="capsule-item-column"
            :style="`width: ${capsule * 100}%; background-color: ${
              state.mergedConfig.colors[index % state.mergedConfig.colors.length]
            };height:calc(100% - ${2}px);`"
          >
            <div v-if="state.mergedConfig.showValue" class="capsule-item-value">
              {{ state.capsuleValue[index] }}
            </div>
          </div>
        </div>

        <div class="unit-label">
          <div v-for="(label, index) in state.labelData" :key="label + index">
            {{ label }}
          </div>
        </div>
      </div>

      <div v-if="state.mergedConfig.unit" class="unit-text">
        {{ state.mergedConfig.unit }}
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.dv-capsule-chart {
  position: relative;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  padding: 10px 16px 10px 10px;
  color: #fff;

  .label-column {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    padding-right: 10px;
    text-align: right;
    font-size: 12px;
    >div:not(:last-child){
        margin: 5px 0;
    }
 
  }

  .capsule-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .capsule-item {
    box-shadow: 0 0 3px #999;
    height: 10px;
    margin: 5px 0px;
    border-radius: 5px;

    .capsule-item-column {
      position: relative;
      height: 8px;
      margin-top: 1px;
      border-radius: 5px;
      transition: all 0.3s;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .capsule-item-value {
        font-size: 12px;
        transform: translateX(100%);
      }
    }
  }

  .unit-label {
    height: 20px;
    font-size: 12px;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .unit-text {
    text-align: right;
    display: flex;
    align-items: flex-end;
    font-size: 12px;
    line-height: 20px;
    margin-left: 10px;
  }
}
</style>
