<template>
  <div>
    <div id="container" style="width: 100%; height: 100%" ref="vChartRef"></div>

    <div ref="infoData"
         class="custom-info input-card content-window-card" :style="{
      width:markerCardWidth+'px',
      height:markerCardHeight+'px',
      backgroundColor:markerCardFillColor,
      borderRadius:markerCardBorderRadius+'px'}">
      <div class="info-top" style="margin: 20px">
<!--        <n-h2 prefix="bar" align-text>-->
<!--          cos(x)-->
<!--        </n-h2>-->
        <div v-html="markerCardTitle"></div>
      </div>

      <div style="display: flex;margin: 0 20px 0 20px;">
        <div class="textContainer" style="width: 70%">
<!--          字体部分-->
<!--          <div class="textItem"  :key="index" v-for="(value,key,index) in dataSelectItem" v-show="filterable(key)">-->

<!--             <p >{{key}} ：{{value}}</p>-->

<!--          </div>-->

          <table class="dataTable" >
            <thead>
            <tr>
              <th>数据类型</th>
              <th>数据详情</th>
            </tr>
            </thead>
            <tbody>
            <tr :key="index" v-for="(value,key,index) in dataSelectItem" v-show="filterable(key)">
              <td>{{key}}</td>
              <td>{{ value }}</td>
            </tr>
            </tbody>
          </table>

        </div>
        <div class="textIcon" >
<!--          图标部分-->
<!--          {{dataSelectItem.icon}}-->
          <my-icon></my-icon>
<!--          <img class="info-img" :style="{width:'200px',height:'100px'}" :src="'/src/assets/logo.png'">-->
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, PropType, toRefs, watch, onMounted} from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'
import { CreateComponentType } from '@/packages/index.d'
import { useChartDataFetch } from '@/hooks'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { MarkerEnum } from './config'
import  myIcon  from './myIcon.vue'
import { isArray } from '@/utils'
let dataSelectItem= ref()
let dataFilter =[
"position","icon"
]
const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})
let {
  amapKey,
  amapStyleKey,
  amapLon,
  amapLat,
  amapZindex,
  mapMarkerType,
  lang,
  amapStyleKeyCustom,
  amapBoundary,
  features,
  viewMode,
  showLabel,
  pitch,
  skyColor,
  marker,
  satelliteTileLayer,
  roadNetTileLayer,
  trafficTileLayer
} = toRefs(props.chartConfig.option.mapOptions)

let {
  amapBoundaryEnable,
  amapBoundaryName,
  amapBoundaryType,
  amapBoundaryFillOpacity,
  amapBoundaryFillColor,
  amapBoundaryStrokeWeight,
  amapBoundaryStrokeOpacity,
  amapBoundaryStrokeColor,
}  = toRefs(props.chartConfig.option.mapOptions.amapBoundary)

let {
  markerCardEnable,
  markerCardTitle,
  markerCardFillColor,
  markerCardWidth,
  markerCardHeight,
  markerCardBorderRadius,
  markerIcon,
  markerImage,
  markerIconWidth,
  markerIconHeight,
  markerIconDivWidth,
  markerIconDivHeight,
  markerCardTextFillColor

}  = toRefs(props.chartConfig.option.mapOptions.markerCard)


let mapIns: any = null
let markers: any = []
let AMapIns: any = null
let infoWindow:any =null
const vChartRef = ref<HTMLElement>()
const infoData = ref<HTMLElement>()
let mask :any= []

const initMap = (newData: any) => {
  window._AMapSecurityConfig = {
    securityJsCode: "b8e3eeb672b552e890a1da03c3a4cb5f",
  };
  // 初始化
  AMapLoader.load({
    key: amapKey.value, //api服务key--另外需要在public中使用安全密钥 ！！！
    version: '2.1Beta', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ['AMap.PlaceSearch', 'AMap.AutoComplete', 'AMap.DistrictSearch'] // 需要使用的的插件列表
  })
      .then(AMap => {


        if(amapBoundaryEnable.value) {
          // 添加边界
          const districtSearch = new AMap.DistrictSearch({
            subdistrict: 3, // 获取下一级行政区
            extensions: 'all', // 返回行政区边界坐标
            level: amapBoundaryType.value // 查找县级行政区
          })
          console.log(amapBoundaryStrokeColor.value)
          districtSearch.search(amapBoundaryName.value, (status:any, result:any) => { // 替换为实际县级行政区名称
            // 获取指定区域的mask路径
            var bounds = result.districtList[0].boundaries;
            for(var i =0;i<bounds.length;i+=1){
              mask.push([bounds[i]])
            }

            console.log(mask)
            if (status === 'complete' && result.info === 'OK') {
              const boundaries = result.districtList[0].boundaries;
              if (boundaries) {
                console.log(boundaries)
                boundaries.forEach((boundary: any) => {
                  const polygon = new AMap.Polygon({
                    path: boundary,
                    strokeColor: amapBoundaryStrokeColor.value, // 边框颜色
                    strokeOpacity: amapBoundaryStrokeOpacity.value, // 边框透明度
                    strokeWeight: amapBoundaryStrokeWeight.value, // 边框宽度
                    fillColor: amapBoundaryFillColor.value, // 填充颜色
                    fillOpacity: amapBoundaryFillOpacity.value // 填充透明度
                  });
                  polygon.setMap(mapIns);
                });
              }
            }
          });
        }



        AMapIns = AMap
        mapIns = new AMap.Map(vChartRef.value, {
          mask:mask,
          resizeEnable: true,
          zoom: amapZindex.value, // 地图显示的缩放级别
          center: [amapLon.value, amapLat.value],
          mapStyle: `amap://styles/${amapStyleKeyCustom.value !== '' ? amapStyleKeyCustom.value : amapStyleKey.value}`, //自定义地图的显示样式
          lang: lang.value,
          features: features.value,
          pitch: pitch.value, // 地图俯仰角度，有效范围 0 度- 83 度
          skyColor: skyColor.value,
          viewMode: viewMode.value, // 地图模式
          willReadFrequently: true,

          // terrain: true, //开启地形图
          // layers: [
          //   new AMap.TileLayer.RoadNet({
          //     rejectMapMask:true 是否显示全部路网
          //   }),
          //   new AMap.TileLayer.Satellite() 只显示mask部分地图
          // ]
        })
        infoWindow = new AMapIns.InfoWindow({isCustom: true, offset: new AMapIns.Pixel(0, -30)});
        console.log(markerIconWidth.value,'wwwwwwwwwwwwww')
        console.log(markerIconHeight.value,'HHHHHHHHHHHHHHH')

        console.log(1231231232131231232)


        dataHandle(props.chartConfig.option.dataset)

      })
      .catch(e => {})
}



onMounted(() => {

  // mapIns.setFitView();

})

const filterable = (key:any) =>{
  // true存在 false不存在
  return !dataFilter.includes(key)
}

function markerClick(e: any,item: any) {
  console.log(item,"我是内部数据")
  infoWindow.setContent(e.target.content);
  infoWindow.open(mapIns, e.target.getPosition());
}

//3.点击标记 获取所点击标记的信息以及窗体要展示的数据，创建信息窗体
const markerClickNew = (arr: any, marker: any) => {
  console.log(arr,"arr")
  console.log(marker,"marker")
  let arrNew = arr.filter((x:any) => x.mapId == marker._amap_id)
  dataSelectItem.value = arrNew && arrNew[0]
  console.log(dataSelectItem,"dataSelectItem")

    // dataSelectItem.value={}
    // if(e.target._opts.dataId === markerItem.id) {
    //   dataSelectItem.value = markerItem
    // }


  let infoWindow = createInfoWindow()
  openInfoWindow(infoWindow, marker)
}

//4.构建自定义窗体
const createInfoWindow = () => {
  let infoWindowData = new AMapIns.InfoWindow({
    isCustom: true, //使用自定义窗体
    autoMove:true,
    closeWhenClickMap:true,
    content: infoData.value,
    // content: this.getContent(),
    offset: new AMapIns.Pixel(16, -45),
  })
  return infoWindowData
}

//5.打开窗体
const openInfoWindow = (infoWindow: any, marker: any) => {
  console.log(infoWindow,"点击了")
  infoWindow.open(mapIns, marker.getPosition())
}
//6.关闭窗体
const closeInfoWindow = () =>{

  mapIns.clearInfoWindow()
}



const dataHandle = (newData: any) => {
  if (!mapIns && !AMapIns) {
    initMap(props.chartConfig.option)
    return
  }
  if (isArray(newData.markers)) {
    // 先清除旧标记
    mapIns.remove(markers)
    markers = []
    console.log("准备加载弹窗.....")
    // 记录新标记

    const arr: any= []
    if (mapMarkerType.value === MarkerEnum.MARKER) {
      newData.markers.forEach((markerItem: any) => {


        const startIcon = new AMapIns.Icon({
          // 图标尺寸
          size: new AMapIns.Size(markerIconDivWidth.value, markerIconDivHeight.value),
          // 图标的取图地址
          image: markerItem[markerIcon.value]?markerItem[markerIcon.value]:"/src/assets/logo.png",
          // 图标所用图片大小
          imageSize: new AMapIns.Size(markerIconWidth.value, markerIconHeight.value),
          // 图标取图偏移量
          imageOffset: new AMapIns.Pixel(-5, 0)
        })
        console.log(startIcon)



        const markerInstance = new AMapIns.Marker({
          map:mapIns,
          zIndex:100,
          icon:startIcon,
          position: [markerItem.position[0], markerItem.position[1]],
          offset: new AMapIns.Pixel(0, 0),
          dataId:markerItem.id
        })

        arr.push(Object.assign(markerItem, {
          mapId: markerInstance._amap_id
        }))

        markers.push(markerInstance)
        markerInstance.setMap(mapIns)
        if(markerCardEnable.value) {
          markerInstance.on('click', (e: any) => {
            markerClickNew(arr, markerInstance)
          })
        }
        // markerInstance.content = infoData.value;
        // markerInstance.on('click',markerClick)
        //  markerInstance.emit('click', {target: markerInstance});


      })
    } else if (mapMarkerType.value === MarkerEnum.CIRCLE_MARKER) {
      newData.markers.forEach((markerItem: any) => {
        const markerInstance = new AMapIns.CircleMarker({
          map:mapIns,
          zIndex:100,
          center: [markerItem.position[0], markerItem.position[1]],
          radius: markerItem.value,
          ...marker.value
        })
        markers.push(markerInstance)
        markerInstance.setMap(mapIns)
      })
    }
  }
}

const stopWatch = watch(
  () => props.chartConfig.option.mapOptions,
  option => {
    initMap(option)
  },
  {
    immediate: true,
    deep: true
  }
)

watch(
  () => props.chartConfig.option.dataset,
  newData => {
    try {
      dataHandle(newData)
    } catch (error) {
      console.log(error)
    }
  },
  {
    deep: false
  }
)

// 预览
useChartDataFetch(props.chartConfig, useChartEditStore, (newData: any) => {
  stopWatch()
  dataHandle(newData)
})
</script>
<style>
#container {
  height: 100%;
  width: 100%;
}

.content-window-card {
  padding: 20px;
  position: relative;
  box-shadow: none;
  bottom: 0;
  left: 0;
  padding: 0;
}

.content-window-card p {

}

.custom-info {
  //border: solid 1px silver;
}

div.info-top {
  position: relative;
  //border-bottom: 1px solid #ccc;
  border-radius: 5px 5px 0 0;
}

div.info-top div {
  display: inline-block;
  font-size: 14px;
  font-weight: bold;
  line-height: 31px;
  padding: 0 10px;
}

div.info-top img {
  position: absolute;
  top: 10px;
  right: 10px;
  transition-duration: 0.25s;
}

div.info-top img:hover {
  box-shadow: 0px 0px 5px #000;
}

div.info-middle {
  font-size: 12px;
  padding: 10px 6px;
  line-height: 20px;
}

div.info-bottom {
  height: 0px;
  width: 100%;
  clear: both;
  text-align: center;
}

div.info-bottom img {
  position: relative;
  z-index: 104;
}

/* span {
  margin-left: 5px;
  font-size: 11px;
} */

.info-middle img {
  float: left;
  margin-right: 6px;
}

.info-span {
  /* margin-left: 35px; */
  font-size: 11px;
}

.info-div {
  width: 140px;
  display: inline-block;
  margin-left: 10px;
}

.info-img {
  width: 40px;
  height: 40px;
}

.info-a-title {
  /* color: #000000; */
  font-size: 16px;
}
#container {
  /*因为我自己的组件是在一个套了很多层的页面上使用的，所以这里需要给地图给一个固定的高，宽是100%可省略不写，否则地图会因为它自身的定位而不显示*/
  height: 820px; } #container .amap-icon img, .amap-marker-content img {

                     width: 64px; height: 64px; }


.textContainer{

  height: v-bind(markerCardHeight-80+'px');
  width: 70%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px;
  overflow: auto;
}
.textItem{
  min-width: 50%;
  max-width: 100%;
}
.textIcon{
  height: v-bind(markerCardHeight-80+'px');
  justify-content: center;
  display: flex;
  align-items: center;
  width: 25%;

}
.textItem p{
  color: v-bind(markerCardTextFillColor);

}
.dataTable{
width: 100%;
  border-collapse: collapse;
  text-align: center;
  border-radius: 10px;
  color: v-bind(markerCardTextFillColor);
}
.dataTable td,th{
  border: 1px solid #7d7d7d;
  color: v-bind(markerCardTextFillColor);
}
</style>