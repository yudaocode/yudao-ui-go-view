<template>
  <collapse-item name="基础配置">
    <setting-item-box name="Key" :alone="true">
      <setting-item>
        <n-input v-model:value="optionData.amapKey" size="small"></n-input>
      </setting-item>
    </setting-item-box>
    <setting-item-box name="语言类型" :alone="true">
      <setting-item>
        <n-select size="small" v-model:value="optionData.lang" :options="langOptions" />
      </setting-item>
    </setting-item-box>
    <setting-item-box name="主题样式" :alone="true">
      <setting-item>
        <n-select size="small" v-model:value="optionData.amapStyleKey" :options="themeOptions" />
      </setting-item>
    </setting-item-box>
    <setting-item-box name="自定义地图样式ID" :alone="true">
      <setting-item>
        <n-input size="small" v-model:value="optionData.amapStyleKeyCustom" />
      </setting-item>
    </setting-item-box>
  </collapse-item>
  <collapse-item name="地图配置">
    <n-checkbox-group v-model:value="optionData.features">
      <n-space item-style="display: flex;">
        <n-checkbox :value="item.value" :label="item.label" v-for="(item, index) in featuresOptions" :key="index" />
      </n-space>
    </n-checkbox-group>
  </collapse-item>
  <collapse-item name="相机配置">
    <setting-item-box name="经度" :alone="true">
      <setting-item>
        <n-input-number v-model:value="optionData.amapLon" size="small"></n-input-number>
      </setting-item>
    </setting-item-box>
    <setting-item-box name="纬度" :alone="true">
      <setting-item>
        <n-input-number v-model:value="optionData.amapLat" size="small"></n-input-number>
      </setting-item>
    </setting-item-box>
    <setting-item-box name="初始缩放" :alone="true">
      <setting-item>
        <n-input-number v-model:value="optionData.amapZindex" size="small"></n-input-number>
      </setting-item>
    </setting-item-box>
    <setting-item-box name="展示模式" :alone="true">
      <setting-item>
        <n-radio-group v-model:value="optionData.viewMode" name="radiogroup">
          <n-space>
            <n-radio v-for="song in viewModeOptions" :key="song.value" :value="song.value">
              {{ song.label }}
            </n-radio>
          </n-space>
        </n-radio-group>
      </setting-item>
    </setting-item-box>
    <template v-if="optionData.viewMode === '3D'">
      <setting-item-box name="天空色" :alone="true">
        <setting-item>
          <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.skyColor"></n-color-picker>
        </setting-item>
      </setting-item-box>
      <setting-item-box name="俯仰角" :alone="true">
        <setting-item>
          <n-input-number v-model:value="optionData.pitch" :min="0" :max="83" size="small"></n-input-number>
        </setting-item>
      </setting-item-box>
    </template>
  </collapse-item>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue'
import { option } from './config'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})
const langOptions = ref([
  {
    value: 'zh_cn',
    label: '中文简体'
  },
  {
    value: 'en',
    label: '英文'
  },
  {
    value: 'zh_en',
    label: '中英文对照'
  }
])
const viewModeOptions = ref([
  {
    value: '2D',
    label: '2D'
  },
  {
    value: '3D',
    label: '3D'
  }
])
const featuresOptions = ref([
  {
    value: 'bg',
    label: '显示地图背景'
  },
  {
    value: 'point',
    label: '显示标识'
  },
  {
    value: 'road',
    label: '显示道路'
  },
  {
    value: 'building',
    label: '显示建筑'
  }
])
const themeOptions = ref([
  {
    value: 'normal',
    label: '标准'
  },
  {
    value: 'dark',
    label: '幻影黑'
  },
  {
    value: 'light',
    label: '月光银'
  },
  {
    value: 'whitesmoke',
    label: '远山黛'
  },
  {
    value: 'fresh',
    label: '草色青'
  },
  {
    value: 'grey',
    label: '雅士灰'
  },
  {
    value: 'graffiti',
    label: '涂鸦'
  },
  {
    value: 'macaron',
    label: '马卡龙'
  },
  {
    value: 'blue',
    label: '靛青蓝'
  },
  {
    value: 'darkblue',
    label: '极夜蓝'
  },
  {
    value: 'wine',
    label: '酱籽'
  }
])
</script>
