import { echartOptionProfixHandle, publicConfig } from '@/packages/public'
import { PieCommonConfig } from './index'
import { CreateComponentType } from '@/packages/index.d'
import omit from 'lodash/omit'

export const includes = ['legend']

const option = {
  tooltip: {
    show: true,
    trigger: 'item'
  },
  legend: {
    show: true,
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '65%'],
      center: ['50%', '60%'],
      avoidLabelOverlap: false,
      itemStyle: {
        show: true,
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '40',
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ]
    }
  ]
}

export default class Config extends publicConfig implements CreateComponentType {
  public key: string = PieCommonConfig.key

  public chartConfig = omit(PieCommonConfig, ['node'])

  // 图表配置项
  public option = echartOptionProfixHandle(option, includes)
}
