import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { MapAmapConfig } from './index'
import { chartInitConfig } from '@/settings/designSetting'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export enum ThemeEnum {
  NORMAL = 'normal',
  DARK = 'dark',
  LIGHT = 'light',
  WHITES_MOKE = 'whitesmoke',
  FRESH = 'fresh',
  GREY = 'grey',
  GRAFFITI = 'graffiti',
  MACARON = 'macaron',
  BLUE = 'blue',
  DARKBLUE = 'darkblue',
  WINE = 'wine'
}

export enum LangEnum {
  ZH_CN = 'zh_cn',
  EN = 'en',
  ZH_EN = 'zh_en'
}

export enum ViewModeEnum {
  PLANE = '2D',
  STEREOSCOPIC = '3D'
}

export const ShowHideEnum = {
  SHOW: true,
  HIDE: false
}

export enum FeaturesEnum {
  BG = 'bg',
  POINT = 'point',
  ROAD = 'road',
  BUILDING = 'building'
}

export enum MarkerEnum {
  // 圆圈
  CIRCLE_MARKER = 'CircleMarker',
  // 定位标点
  MARKER = 'Marker',
  // 暂无
  NONE = 'none'
}


export enum amapBoundaryTypeEnum {
  // 国家
  COUNTRY = 'country',
  // 省/直辖市
  PROVINCE = 'province',
  // 市
  CITY = 'city',
  // 区/县
  DISTRICT = 'district',
  // 商圈
  BIZ_AREA = 'biz_area'

}


export const option = {
  dataset: dataJson,
  mapOptions: {
    pitch: 60,
    skyColor: '#53A9DE',
    amapKey: 'd5f3e16589dbecae64d05fe90e2ba4f2',
    amapStyleKey: ThemeEnum.DARK,
    amapStyleKeyCustom: '',
    amapBoundary:{
      amapBoundaryEnable:false,
      amapBoundaryName:'北京市',
      amapBoundaryType:'province',
      amapBoundaryFillOpacity:0.5,
      amapBoundaryFillColor:'#00B2D5',
      amapBoundaryStrokeWeight:1,
      amapBoundaryStrokeOpacity:0.5,
      amapBoundaryStrokeColor:'#00D3FC'
    },
    amapLon: 116.397428,
    amapLat: 39.90923,
    amapZindex: 11,
    marker: {
      fillColor: '#E98984FF',
      fillOpacity: 0.5,
      strokeColor: 'white',
      strokeWeight: 2,
      strokeOpacity: 0.5,
      zIndex: 10,
      bubble: true,
      cursor: 'pointer',
      clickable: true
    },
    markerCard:{
      markerCardEnable:false,
      markerCardTitle:'<a>信息面板</a>',
      markerCardFillColor:'#FFFFFF82', //背景颜色
      markerCardTextFillColor:'#000000FF', //字体颜色,
      markerCardWidth:'30rem',
      markerCardHeight:'15rem',
      markerCardBorderRadius:20,
      markerIcon:'', //图标
      markerImage:'', //详情图
      markerIconWidth:80, //图标宽度
      markerIconHeight:80,  //图标高度
      markerIconDivWidth:80, //图标容器宽度
      markerIconDivHeight:80 //图标容器高度
    },
    mapMarkerType: MarkerEnum.CIRCLE_MARKER,
    viewMode: ViewModeEnum.PLANE,
    showLabel: ShowHideEnum.SHOW,
    satelliteTileLayer: {
      show: ShowHideEnum.HIDE,
      zIndex: 1,
      opacity: 1,
      zooms: [3, 18]
    },
    roadNetTileLayer: {
      show: ShowHideEnum.HIDE,
      zIndex: 2,
      opacity: 1,
      zooms: [3, 18]
    },
    trafficTileLayer: {
      show: ShowHideEnum.HIDE,
      zIndex: 3,
      opacity: 1,
      zooms: [3, 18]
    },
    lang: LangEnum.ZH_CN,
    features: [FeaturesEnum.BG, FeaturesEnum.POINT, FeaturesEnum.ROAD, FeaturesEnum.BUILDING]
  }
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = MapAmapConfig.key
  public attr = { ...chartInitConfig, w: 1000, h: 800, zIndex: -1 }
  public chartConfig = cloneDeep(MapAmapConfig)
  public option = cloneDeep(option)
}
