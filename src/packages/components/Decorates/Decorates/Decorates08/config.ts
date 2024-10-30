import { PublicConfigClass } from '@/packages/public'
import { chartInitConfig } from '@/settings/designSetting'
import { CreateComponentType } from '@/packages/index.d'
import { Decorates08Config } from './index'
import cloneDeep from 'lodash/cloneDeep'




export const pointFlickerStatusType = [
    {
        label: '开',
        value: '1'
    },
    {
        label: '关',
        value: '0'
    }
]


export const pointFlickerType = [
    {
        label: '即时',
        value: 'immediately'
    },
    {
        label: '渐变',
        value: 'slow'
    }
]

export const pointFrequencyType = [
    {
        label: '低',
        value: 3000
    },
    {
        label: '中',
        value: 1000
    },
    {
        label: '快',
        value: 500
    },
    {
        label: '超快',
        value: 100
    },
    {
        label: '嗷比快',
        value: 10
    }
]


export const pointStatusType = [
    {
        label: '关闭',
        value: '0'
    },
    {
        label: '开启',
        value: '1'
    },
    {
        label: '异常',
        value: '2'
    }
]

export const alignItemsType = [
    {
        label: '左侧对齐',
        value: 'start'
    },
    {
        label: '居中对齐',
        value: 'center'
    },
    {
        label: '右侧对齐',
        value: 'end'
    }
]



export const justifyContentType = [
    {
        label: '左侧对齐',
        value: 'start'
    },
    {
        label: '右侧对齐',
        value: 'end'
    },
    {
        label: '居中对齐',
        value: 'center'
    },
    {
        label: '左右对齐',
        value: 'space-between'
    },
    {
        label: '左右居中对齐(偏居中)',
        value: 'space-evenly'
    },
    {
        label: '左右居中对齐(偏左右)',
        value: 'space-around'
    },

]



export const flexDirectionType = [
    {
        label: '上下',
        value: 'column'
    },
    {
        label: '下上',
        value: 'column-reverse'
    },
    {
        label: '左右',
        value: 'row'
    },{
        label: '右左',
        value: 'row-reverse'
    },

]


export const option = {
    colors: ['#25ECD921', '#1DC1F585'],//背景颜色 ，描边颜色
    dataset: '状态',//标题
    textColor: '#fff', //标题颜色
    textSize: 32,   // 标题字体大小
    borderSize:'1', //描边粗细
    borderRadius: '0', //圆角
    pointStatus: '1',//指示灯状态0关闭1开启2异常
    pointFlickerStatus: '0',//指示灯闪动开关
    pointFrequency:1000, //指示灯闪动频次 低：3000 中:1000 快:500
    pointFlicker:'immediately',//指示灯闪动效果 即时:immediately 缓慢渐变:slow

    // changeOpcity: 1,//闪动控制器

    pointOpenColor:'#10c504', //开启状态颜色
    pointOpenShadowColor:'#b5ffae', //开启状态发光颜色

    pointCloseColor:'#eee',//关闭状态颜色

    pointErrorColor:'#d9001b',
    pointErrorShadowColor:'#d93d53',//异常状态发光颜色
    pointSize:'32',//状态灯大小
    flexDirection: 'column',//排列方式flex-Direction 常用几种 column:上下 column-reverse:下上 row:左右 row-reverse:右左
    justifyContent: 'center',
    alignItems: 'center'
}

export default class Config extends PublicConfigClass implements CreateComponentType {
    public key = Decorates08Config.key
    public attr = { ...chartInitConfig, w: 500, h: 70, zIndex: 1 }
    public chartConfig = cloneDeep(Decorates08Config)
    public option = cloneDeep(option)
}
