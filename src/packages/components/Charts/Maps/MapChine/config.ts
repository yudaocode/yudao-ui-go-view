import { echartOptionProfixHandle, publicConfig } from '@/packages/public'
import { MapChineConfig } from './index'
import { CreateComponentType } from '@/packages/index.d'
import { defaultTheme, chartColorsSearch } from '@/settings/chartThemes/index'

export const includes = ['geo']

export const option = {
  geo: {
    show: true,
    type: 'map',
    aspectScale: 1, // 横向拉伸
    roam: true, // 地图操作 开启缩放或者平移，可以设置成 'scale' 或者 'move'。
    map: 'china',
    label: {
      show: true,
      normal: {
        show: true, // 默认地图文字字号和字体颜色
        fontSize: 12,
        color: '#ffffff'
      },
      emphasis: {
        show: true,
        fontSize: 10, // 选中地图文字字号和字体颜色
        color: '#CFCFCF'
      }
    },
    itemStyle: {
      normal: {
        areaColor: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0.5,
          y2: 0.3,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(147, 235, 248, .2)' // 100% 处的颜色
            }
          ],
          globalCoord: false // 缺省为 false
        }, //地图本身的颜色
        borderColor: 'rgba(147, 235, 248, 1)', //省份边框颜色
        borderWidth: 1 // 省份边框宽度
      },
      emphasis: {
        areaColor: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(147, 235, 248, .2)' // 100% 处的颜色
            }
          ],
          globalCoord: false // 缺省为 false
        }, //地图本身的颜色
        borderColor: 'rgba(147, 235, 248, 0.8)', //省份边框颜色
        borderWidth: 1 // 省份边框宽度
      }
    },
    textFixed: {
      Alaska: [20, -20]
    }
  },
  series: [
    {
      type: 'effectScatter',
      coordinateSystem: 'geo',
      symbolSize: 12,
      label: {
        normal: {
          show: false
        },
        emphasis: {
          show: false
        }
      },
      itemStyle: {
        normal: {
          shadowBlur: 10,
          color: '#00ECC8'
        },
        emphasis: {
          borderColor: '#fff',
          borderWidth: 1
        }
      }
    }
  ]
}
export default class Config extends publicConfig implements CreateComponentType {
  public key: string = MapChineConfig.key
  public chartConfig = MapChineConfig
  // 图表配置项
  public option = echartOptionProfixHandle(option, includes)
}
