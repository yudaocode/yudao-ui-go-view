import { echartOptionProfixHandle, publicConfig } from '@/packages/public'
import { RadarConfig } from './index'
import { CreateComponentType } from '@/packages/index.d'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export const includes = ['legend']

export const option = {
  tooltip: {
    show: true
  },
  legend: {
    show: true
  },
  radar: {
    indicator: dataJson.radarIndicator
  },
  dataset: { ...dataJson },
  series: [
    {
      type: 'radar',
      barWidth: null,
      itemStyle: {
        color: null,
        borderRadius: 0
      }
    }
  ]
}

export default class Config extends publicConfig implements CreateComponentType {
  public key = RadarConfig.key
  public chartConfig = cloneDeep(RadarConfig)
  // 图表配置项
  public option = echartOptionProfixHandle(option, includes)
}
