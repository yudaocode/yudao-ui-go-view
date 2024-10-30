import { echartOptionProfixHandle, PublicConfigClass } from '@/packages/public'
import { MoreInstrumentConfig } from './index'
import { CreateComponentType } from '@/packages/index.d'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export const includes = ['legend', 'xAxis', 'yAxis', 'grid']
export const seriesItem = {
  type: 'bar',
  barWidth: 15,
  label: {
    show: true,
    position: 'top',
    color: '#fff',
    fontSize: 12
  },
  itemStyle: {
    color: null,
    borderRadius: 2
  }
}
export const option = {
  tooltip: {
    show: true,
    trigger: 'axis',
    axisPointer: {
      show: true,
      type: 'shadow'
    }
  },
  xAxis: {
    show: true,
    type: 'category'
  },
  yAxis: {
    show: true,
    type: 'value'
  },
  dataset: dataJson,
  lineOptions: {
    background: '#00000000',
    numberSize:40,
    titleSize:20,
    minMaxNumber:[0,100],
    optionColors:['#07A35A', '#FFC528', '#E33232'], //仪表盘颜色
    optionSize:[40,60,100],//仪表盘颜色占用百分比
    optionTitle:'压力百分比值',
    legends: {
      legendsVisible: true,
      legendsPosition: "middle",
      legendsOrient: "top"
    }
  },
  series: [seriesItem, seriesItem]
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = MoreInstrumentConfig.key
  public chartConfig = cloneDeep(MoreInstrumentConfig)
  // 图表配置项
  public option = echartOptionProfixHandle(option, includes)
}
