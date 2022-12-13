<template>
  <!-- Echarts 全局设置 -->
  <global-setting :optionData="optionData"></global-setting>
  <CollapseItem name="饼图配置" :expanded="true">
    <SettingItemBox name="类型">
      <SettingItem>
        <n-select v-model:value="optionData.type" size="small" :options="fontWeightOptions" />
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox name="标签">
      <SettingItem>
        <n-space>
          <n-switch v-model:value="optionData.series[0].label.show" size="small"></n-switch>
          <n-text>展示标签</n-text>
        </n-space>
      </SettingItem>
      <SettingItem name="位置">
        <n-select v-model:value="optionData.series[0].label.position" :options="[
            { label: '外侧', value: 'outside' },
            { label: '内部', value: 'inside' },
            { label: '中心', value: 'center' }
          ]" />
      </SettingItem>
    </SettingItemBox>
    <setting-item-box name="标签数据">
      <setting-item>
        <n-select v-model:value="optionData.series[0].label.formatter" :options="[
            { label: '数据名', value: '{b}' },
            { label: '百分比', value: '{d}' },
            { label: '列名:百分比', value: '{b}:{d}%' },
          ]" />
      </setting-item>
    </setting-item-box>
    <setting-item-box name="引导线">
      <setting-item>
        <n-space>
          <n-switch v-model:value="optionData.series[0].labelLine.show" size="small"></n-switch>
          <n-text>展示引导线</n-text>
        </n-space>
      </setting-item>
    </setting-item-box>
    <setting-item-box name="圆角">
      <setting-item>
        <n-space>
          <n-input-number v-model:value="optionData.series[0].itemStyle.borderRadius" size="small" :min="0"></n-input-number>
          <n-text>圆角大小</n-text>
        </n-space>
      </setting-item>
      <setting-item>
        <n-space>
          <n-input-number v-model:value="optionData.series[0].itemStyle.borderWidth" size="small" :min="0"></n-input-number>
          <n-text>线条宽度</n-text>
        </n-space>
      </setting-item>
    </setting-item-box>
  </CollapseItem>
</template>

<script setup lang="ts">
import { PropType, watch } from 'vue'
import { GlobalThemeJsonType } from '@/settings/chartThemes/index'
import { GlobalSetting, CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { PieTypeObject, PieTypeEnum } from './config'

const props = defineProps({
  optionData: {
    type: Object as PropType<GlobalThemeJsonType>,
    required: true
  }
})
const fontWeightOptions = [
  {
    label: PieTypeEnum.NORMAL,
    value: PieTypeObject[PieTypeEnum.NORMAL]
  },
  {
    label: PieTypeEnum.RING,
    value: PieTypeObject[PieTypeEnum.RING]
  },
  {
    label: PieTypeEnum.ROSE,
    value: PieTypeObject[PieTypeEnum.ROSE]
  }
]
</script>
