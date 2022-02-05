import { echartOptionProfixHandle, publicConfig } from '@/packages/utils'
import { PieCommonConfig } from './index'
import { ConfigType, CreateComponentType } from '@/packages/index.d'
import omit from 'lodash/omit'

export default class Config extends publicConfig implements CreateComponentType {
  public key: string = PieCommonConfig.key

  public chartData: Exclude<ConfigType, ['node']> = omit(PieCommonConfig, ['node'])

  // 图表配置项
  public option = echartOptionProfixHandle({
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
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
  })

  // 设置坐标
  public setPosition(x: number, y: number): void {
    this.attr.x = x
    this.attr.y = y
  }
}
