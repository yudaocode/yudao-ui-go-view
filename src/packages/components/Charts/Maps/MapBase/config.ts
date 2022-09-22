import { echartOptionProfixHandle, PublicConfigClass } from '@/packages/public'
import { MapConfig } from './index'
import { chartInitConfig } from '@/settings/designSetting'
import { CreateComponentType } from '@/packages/index.d'
import dataJson from './data.json'

export const includes = []

export const option = {
  dataset: dataJson,
  mapRegion: {
    adcode: 'china',
    adcodeFlag: true,
  },
  tooltip: {
    show: true,
    trigger: 'item'
  },
  visualMap: {
    show: true,
    pieces: [
      { gte: 1000, label: "1000个以上" }, // 不指定 max，表示 max 为无限大（Infinity）。
      { gte: 600, lte: 999, label: "600-999个" },
      { gte: 200, lte: 599, label: "200-599个" },
      { gte: 50, lte: 199, label: "49-199个" },
      { gte: 10, lte: 49, label: "10-49个" },
      { lte: 9, label: "1-9个" }, // 不指定 min，表示 min 为无限大（-Infinity）。
    ],
    inRange: {
      // 渐变颜色，从小到大
      color: [
        "#c3d7df",
        "#5cb3cc",
        "#8abcd1",
        "#66a9c9",
        "#2f90b9",
        "#1781b5",
      ],
    },
    textStyle: {
      color: "#fff",
    },
  },
  geo: {
    type: 'map',
    roam: false,
    map: "china",
    selectedMode: false, //是否允许选中多个区域
    // aspectScale: 1,
    zoom: 1,
    tooltip: {
      show: false,
    },
    label: {
      show: false,
    }, //地图中文字内容及样式控制
    itemStyle: {
      areaColor: "rgba(0,0,0,0)",
      borderColor: "rgba(0,0,0,0)",
    },
    emphasis: {
      disabled: true,
    },
  },
  series: [
    {
      name: '',
      type: "effectScatter",
      coordinateSystem: "geo",
      symbolSize: 4,
      legendHoverLink: true,
      showEffectOn: "render",
      rippleEffect: {
        scale: 6,
        color: "#FFFFFF",
        brushType: "fill",
      },
      tooltip: {
        show: true,
        // formatter: function (params:any) {
        //   console.log(params);
        //   if (params.data) {
        //     return params.name + "：" + params.data["value"][2];
        //   } 
        // },
        // formatter:"{a}: {b}<br />{c}: {d}",
        backgroundColor: "rgba(0,0,0,.6)",
        borderColor: "rgba(147, 235, 248, .8)",
        textStyle: {
          color: "#FFF",
        },
      },
      label: {
        // formatter: (param: any) => {
        //   return param.name.slice(0, 2);
        // },
        formatter: '{b}',
        // formatter: '{a}: {b}<br />{c}: {d}{e}',
        fontSize: 11,
        offset: [0, 2],
        position: "bottom",
        textBorderColor: "#fff",
        textShadowColor: "#000",
        textShadowBlur: 10,
        textBorderWidth: 0,
        color: "#FFF",
        show: true,
      },
      // colorBy: "data",
      itemStyle: {
        color: "#FFFFFF",
        borderColor: "rgba(225,255,255,2)",
        borderWidth: 4,
        shadowColor: "#E1FFFF",
        shadowBlur: 10,
      },
      data: []
    },
    {
      name: '区域',
      type: "map",
      map: "china",
      // aspectScale: 1,
      data: [],
      selectedMode: false, //是否允许选中多个区域
      zoom: 1,
      geoIndex: 1,
      tooltip: {
        show: true,
        backgroundColor: "rgba(0,0,0,.6)",
        borderColor: "rgba(147, 235, 248, .8)",
        textStyle: {
          color: "#FFF",
        },
      },
      label: {
        show: false,
        color: "#000",
        // formatter: function (val:any) {
        //   // console.log(val)
        //   if (val.data !== undefined) {
        //     return val.name.slice(0, 2);
        //   } else {
        //     return "";
        //   }
        // },
        rich: {},
        emphasis: { show: false },
      },
      itemStyle: {
        // borderColor: "rgba(147, 235, 248, .8)",
        borderColor: '#93EBF8',
        borderWidth: 1,
        areaColor: {
          type: "radial",
          x: 0.5,
          y: 0.5,
          r: 0.8,
          colorStops: [
            {
              offset: 0,
              color: "rgba(147, 235, 248, 0)", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "rgba(147, 235, 248, .2)", // 100% 处的颜色
            },
          ],
          globalCoord: false, 
        },
        shadowColor: "#80D9F842",
        shadowOffsetX: -2,
        shadowOffsetY: 2,
        shadowBlur: 10,
        emphasis: {
          disabled:false,
          areaColor: "#389BB7",
          shadowColor:"#389BB7",
          borderWidth: 1,
        },
        showHainanIsLands: true,

      },
     
    }
  ]
}
export const MapDefaultConfig = { ...option }
export default class Config extends PublicConfigClass implements CreateComponentType {
  public key: string = MapConfig.key
  public attr = { ...chartInitConfig, w: 750, h: 800, zIndex: -1 }
  public chartConfig = MapConfig
  public option = echartOptionProfixHandle(option, includes)
}

