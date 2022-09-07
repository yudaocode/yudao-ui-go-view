<template>
  <div>
    <!-- Echarts 全局设置 -->
    <global-setting :optionData="optionData" :in-chart="true"></global-setting>
    <CollapseItem name="雷达" :expanded="true">
      <SettingItemBox name="样式">
        <SettingItem>
          <n-checkbox v-model:checked="radarConfig.splitArea.show">背景</n-checkbox>
        </SettingItem>
        <SettingItem>
          <n-checkbox v-model:checked="radarConfig.splitLine.show">分割线</n-checkbox>
        </SettingItem>
        <SettingItem name="雷达形状">
          <n-select v-model:value="radarConfig.shape" :options="RadarShapeEnumList" placeholder="选择形状" />
        </SettingItem>
      </SettingItemBox>
      <SettingItemBox name="指示器">
        <SettingItem name="颜色">
          <n-color-picker size="small" :modes="['hex']" v-model:value="radarConfig.axisName.color"></n-color-picker>
        </SettingItem>
        <SettingItem name="大小">
          <n-input-number v-model:value="radarConfig.axisName.fontSize" size="small" :min="9"></n-input-number>
        </SettingItem>
        <SettingItem>
          <n-checkbox v-model:checked="radarConfig.axisName.show">文字标签</n-checkbox>
        </SettingItem>
      </SettingItemBox>
      <SettingItemBox name="坐标轴">
        <SettingItem>
          <n-checkbox v-model:checked="radarConfig.axisLine.show">轴线</n-checkbox>
        </SettingItem>
        <SettingItem>
          <n-checkbox v-model:checked="radarConfig.axisTick.show">刻度</n-checkbox>
        </SettingItem>
      </SettingItemBox>
      <SettingItemBox name="系列" :alone="true">
        <SettingItem name="背景透明度">
          <n-input-number
            v-model:value="optionData.series[0].areaStyle.opacity"
            size="small"
            :min="0"
            :max="1"
            :step="0.1"
          ></n-input-number>
        </SettingItem>
      </SettingItemBox>
    </CollapseItem>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { GlobalSetting, CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { GlobalThemeJsonType } from '@/settings/chartThemes/index'
import { RadarShapeEnumList } from './config'

const props = defineProps({
  optionData: {
    type: Object as PropType<GlobalThemeJsonType>,
    required: true
  }
})

const radarConfig = computed(() => {
  return props.optionData.radar
})
</script>
