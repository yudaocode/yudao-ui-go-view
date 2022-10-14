import { echartOptionProfixHandle, PublicConfigClass } from '@/packages/public'
import { BarCrossrangeConfig } from './index'
import { CreateComponentType } from '@/packages/index.d'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export const includes = ['legend', 'xAxis', 'yAxis', 'grid']
export const seriesItem = {
  type: 'bar',
  barWidth: null,
  label: {
    show: true,
    position: 'right',
    color: '#fff',
    fontSize: 12
  },
  itemStyle: {
    color: null,
    borderRadius: 0
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
  legend: {
    show: true
  },
  grid: {
    show: false,
    left: '10%',
    top: '60',
    right: '10%',
    bottom: '60'
  },
  xAxis: {
    show: true,
    type: 'value'
  },
  yAxis: {
    show: true,
    type: 'category'
  },
  dataset: { ...dataJson },
  series: [seriesItem, seriesItem]
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = BarCrossrangeConfig.key
  public chartConfig = cloneDeep(BarCrossrangeConfig)
  // 图表配置项
  public option = echartOptionProfixHandle(option, includes)
}
