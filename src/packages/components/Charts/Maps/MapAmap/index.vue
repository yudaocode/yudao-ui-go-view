<template>
  <div class="box">
    <div id="container" style="width: 100%; height: 100%; position: relative"></div>
  </div>
</template>

<script setup lang="ts">
import AMapLoader from '@amap/amap-jsapi-loader'
import { CreateComponentType } from '@/packages/index.d'
import { reactive, ref, shallowRef, PropType, toRefs, watch } from 'vue'
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
  lang,
  amapStyleKeyCustom,
  features,
  viewMode,
  pitch,
  skyColor
} = toRefs(props.chartConfig.option)

let map = shallowRef(null)

const ininMap = () => {
  AMapLoader.load({
    key: amapKey.value, //api服务key--另外需要在public中使用安全密钥！！！
    version: '1.4.8', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ['AMap.PlaceSearch', 'AMap.AutoComplete'] // 需要使用的的插件列表
  })
    .then(AMap => {
      map = new AMap.Map('container', {
        resizeEnable: true,
        zoom: amapZindex.value, // 地图显示的缩放级别
        center: [amapLon.value, amapLat.value],
        mapStyle: `amap://styles/${amapStyleKeyCustom.value !== '' ? amapStyleKeyCustom.value : amapStyleKey.value}`, //自定义地图的显示样式
        lang: lang.value,
        features: features.value,
        pitch: pitch.value, // 地图俯仰角度，有效范围 0 度- 83 度
        skyColor: skyColor.value,
        viewMode: viewMode.value, // 地图模式
      })
    })
    .catch(e => {})
}

watch(
  () => props.chartConfig.option,
  newData => {
    ininMap()
  },
  { immediate: true, deep: true }
)
</script>
