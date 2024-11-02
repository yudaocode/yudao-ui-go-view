<template>
  <div :id="props.chartConfig.id" class="vChartRef" ref="vChartRef" style="background-color:red;"></div>
</template>
<style scoped>
*:deep(.cesium-viewer-bottom) * {
  display: none !important;
}

#cesiumContainer {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
<script setup lang="ts">
import { ref, PropType, toRefs, watch,onMounted,nextTick } from 'vue'
// import AMapLoader from '@amap/amap-jsapi-loader'
import { CreateComponentType } from '@/packages/index.d'
import { useChartDataFetch } from '@/hooks'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { MarkerEnum } from './config'
import { isArray } from '@/utils'
// import * as Cesium from "cesium";
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
  features,
  viewMode,
  pitch,
  skyColor,
  marker
} = toRefs(props.chartConfig.option.mapOptions)

let mapIns: any = null
let markers: any = []
let AMapIns: any = null
const vChartRef = ref<HTMLElement>()


let viewer: any = null
let esri: any = null
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4NmUwOTU5Mi04ZTg3LTRkZjYtODI1Yi02ZDk1YzU4ODg1ODciLCJpZCI6MjQxNTExLCJpYXQiOjE3MjYyODIxNjl9.xhULOdKKSA00D1MVy6EGk-Bq152VXJ5S3s1jFj9-0vA";
// const initMap = (newData: any) => {
//
//   const dom: HTMLElement | undefined = vChartRef.value
//   console.log(dom)
//   const domId :any =dom?.id
//   console.log(domId)
//   console.log(props.chartConfig.id)
//   if(!dom) {
//     console.log('未检测到容器')
//     return
//   }
//
//   // 初始化
//    Cesium.Ion.defaultAccessToken = token;
//    esri = new Cesium.ArcGisMapServerImageryProvider({
//     url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer", // 图层地址
//     enablePickFeatures: false, // 无需与服务器通信
//   });
//
//
//     viewer = new Cesium.Viewer(props.chartConfig.id, {
//     imageryProvider: esri, // 替换默认影像图层
//     // infoBox: false, // 右侧信息框
//     // selectionIndicator: false, // 选中状态隐藏
//       selectedImageryProviderViewModel:undefined,
//     terrainProvider: Cesium.createWorldTerrain({
//       requestWaterMask: true, // 水面特效
//     }),
//       orderIndependentTranslucency: false,
//       contextOptions: {
//         webgl: {
//           alpha: true,
//         }
//       },
//       skyBox: false,
//       sceneModePicker: false,
//
//     timeline: false, // 时间轴控件
//     animation: false, // 动画控件
//     // geocoder: false, // 搜索按钮
//     // homeButton: false, // 主页按钮
//     // sceneModePicker: false, // 投影方式按钮
//     // baseLayerPicker: false, // 图层选择按钮
//     // navigationHelpButton: false, // 帮助手势按钮
//     // fullscreenButton: false, // 全屏按钮
//   });
//   // viewer.scene.mode = Cesium.SceneMode.COLUMBUS_VIEW;//平面3D
//   viewer.scene.mode = Cesium.SceneMode.SCENE3D;//3D
//
//
//   viewer.scene.skyBox.show = false;
//   viewer.scene.skyBox.destroy();
//   viewer.scene.skyBox = undefined;
//   viewer.scene.sun.destroy();
//   viewer.scene.sun = undefined;
//   viewer.scene.moon.destroy();
//   viewer.scene.moon = undefined;
//   viewer.scene.skyAtmosphere.destroy();
//   viewer.scene.skyAtmosphere = undefined;
//
//   viewer.scene.backgroundColor = new Cesium.Color(0, 0, 0, 0);
//   viewer.scene.globe.baseColor = new Cesium.Color(0, 0, 0, 0); //修改地邱球体背景透明
//   viewer.scene.imageryLayers.removeAll();//去除其他图层
//   viewer.scene.backgroundColor = new Cesium.Color(0.0, 0.0, 0.0, 0.0);
//   // viewer.scene.mode = Cesium.SceneMode.MORPHING;//变形
//   let tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
//     url: 'http://localhost:3000/hakuang/tileset.json',
//     skipLevelOfDetail: true,
//     preferLeaves: true,
//     baseScreenSpaceError: 1024,
//     skipScreenSpaceErrorFactor: 16,
//     skipLevels: 1,
//     immediatelyLoadDesiredLevelOfDetail: false,
//     cullWithChildrenBounds: true,
//     dynamicScreenSpaceError: true,
//     dynamicScreenSpaceErrorDensity: 0.00278,
//     dynamicScreenSpaceErrorFactor: 4.0,
//     dynamicScreenSpaceErrorHeightFalloff: 0.25,
//     maximumMemoryUsage: 1024,
//
//   }));
//   tileset.readyPromise.then((tileset:any) => {
//     // var obj = [6378137.0, 6378137.0, 6356752.3142451793];
//     // viewer.Ellipsoid.WGS84 = Object.freeze(new Cesium.Ellipsoid(obj[0], obj[1], obj[2]));
//     // 配置高程
//     viewer.scene.primitives.add(tileset);
//     viewer.zoomTo(tileset);
//     const cartographic =Cesium.Cartographic.fromCartesian(
//         tileset.boundingSphere.center
//     );
//     //111.257024,39.729284 正确
//     // 116.45628694193695 39.89819413384118 偏移量
//     console.log(Cesium.Cartographic.fromDegrees(111.257024,39.729284),'转换')
//     console.log(1)
//     const test = Cesium.Cartesian3.fromDegrees(tileset.boundingSphere.center.x,tileset.boundingSphere.center.y,tileset.boundingSphere.center.z)
//     console.log(tileset.boundingSphere.center,'center')
//     console.log(cartographic.longitude,cartographic.latitude,"之前数据")
//     console.log([cartographic.longitude,cartographic.longitude / Math.PI * 180,cartographic.latitude,cartographic.latitude / Math.PI * 180],'转换2')
//     const surface = Cesium.Cartesian3.fromRadians(
//         cartographic.longitude,
//         cartographic.latitude,
//         0.0
//     );
//     const offset = Cesium.Cartesian3.fromRadians(
//         cartographic.longitude-0.090744257013727,
//         cartographic.latitude-0.0029480379755129,
//         cartographic.height-900
//     );
//
//     const translation = Cesium.Cartesian3.subtract(
//         offset,
//         surface,
//         new Cesium.Cartesian3()
//     );
//     tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
//
//     const Cartesian = Cesium.Cartesian3.fromDegrees(111.255311, 39.72919, 10000)
//     //相机
//     // viewer.camera.setView({
//     //   destination: Cartesian,//初始位置
//     //   orientation: {//初始方向
//     //     heading: Cesium.Math.toRadians(-50), //初始方向
//     //     pitch: Cesium.Math.toRadians(-50), //初始方向
//     //     roll: Cesium.Math.toRadians(0),
//     //   }
//     // })
//     //配置点位
//     const point = viewer.entities.add({
//       id: "point",
//       position: Cesium.Cartesian3.fromDegrees(111.255311, 39.72919), // 位置
//       point: {
//         pixelSize: 200, // 像素大小
//         color: Cesium.Color.BLUE, // 颜色
//       },
//     });
//     viewer.zoomTo(point)
//
//
//     viewer.flyTo(tileset)
//   })
//
//
// }
//
// const dataHandle = (newData: any) => {
//
// }
// //经纬度转笛卡尔坐标
// const fromDegrees = (longitude:any,latitude:any,height:any) =>{
//   return Cesium.Cartesian3.fromDegrees(longitude, latitude, height);
// }
//
//
// //笛卡尔坐标转弧度
// const fromCartesian =(longitude:any) =>{
//   return Cesium.Cartographic.fromCartesian(longitude);
// }
// //弧度转经纬度
// const toDegrees =(longitude:any,latitude:any,height:any) =>{
//   const llh=[]
//   llh[0] = Cesium.Math.toDegrees(longitude);
//   llh[1] = Cesium.Math.toDegrees(latitude);
//   llh[2] = Cesium.Math.toDegrees(height);
//   return Cesium.Cartesian3.fromDegrees(longitude, latitude, height);
// }
//
//
//
// onMounted(() => {
//   nextTick(() => {
//     // initMap(null)
//   })
//
// })
//
// const stopWatch = watch(
//   () => props.chartConfig.option.mapOptions,
//   option => {
//       // initMap(option)
//   },
//   {
//     immediate: true,
//     deep: true
//   }
// )
//
// watch(
//   () => props.chartConfig.option.dataset,
//   newData => {
//     try {
//       dataHandle(newData)
//     } catch (error) {
//       console.log(error)
//     }
//   },
//   {
//     deep: false
//   }
// )
//
// // 预览
// useChartDataFetch(props.chartConfig, useChartEditStore, (newData: any) => {
//   stopWatch()
//   dataHandle(newData)
// })
</script>
<style>
canvas {
  background: transparent !important;
  position: absolute;
}

</style>