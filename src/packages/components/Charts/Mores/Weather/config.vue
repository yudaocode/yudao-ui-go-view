<template>
  <!-- 默认展开 -->
  <CollapseItem name="天气配置" :expanded="true">
    <SettingItemBox name="内容">
      <SettingItem name="布局样式<1~100>">
        <n-input-number v-model:value="optionData.weatherStyleType" size="small" :min="1" placeholder="样式ID"></n-input-number>
      </SettingItem>
      <SettingItem name="图标样式<1~8>">
        <n-input-number v-model:value="optionData.weatherIconType" size="small" :min="1" placeholder="样式ID"></n-input-number>
      </SettingItem>
      <SettingItem name="天气地址">
        <n-input v-model:value="optionData.weatherAddress" size="small" placeholder="城市拼音"></n-input>
      </SettingItem>
      <SettingItem name="布局大小">
        <n-input-number v-model:value="optionData.weatherSite" size="small" :min="1" placeholder="布局大小"></n-input-number>
      </SettingItem>
      <SettingItem name="字体颜色">
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.weatherColor"></n-color-picker>
      </SettingItem>
      <SettingItem name="背景颜色">
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.weatherBgColor"></n-color-picker>
      </SettingItem>
      <SettingItem name="圆角">
        <n-input-number v-model:value="optionData.weatherBorderRadius" size="small" :min="0" ></n-input-number>
      </SettingItem>

    </SettingItemBox>
  </CollapseItem>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
// 以下是封装的设置模块布局组件，具体效果可在官网查看
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'

// 获取 option 的数据，便于使用 typeof 获取类型
import { option,  } from './config'

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})
</script>
