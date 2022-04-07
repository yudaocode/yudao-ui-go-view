<template>
  <CollapseItem name="信息" :expanded="true">
    <SettingItemBox name="文字" :alone="true">
      <SettingItem>
        <n-input v-model:value="optionData.dataset" size="small"></n-input>
      </SettingItem>
    </SettingItemBox>
  </CollapseItem>

  <CollapseItem name="样式" :expanded="true">
    <SettingItemBox name="文字">
      <SettingItem name="字体大小">
        <n-input-number v-model:value="optionData.fontSize" size="small" placeholder="字体大小"></n-input-number>
      </SettingItem>

      <SettingItem name="文本方向">
        <n-select v-model:value="optionData.writingMode" size="small" :options="verticalOptions" />
      </SettingItem>
      <SettingItem name="字间距">
        <n-input-number v-model:value="optionData.letterSpacing" size="small" placeholder="输入字间距"></n-input-number>
      </SettingItem>
      <SettingItem name="内边距">
        <n-input-number v-model:value="optionData.padding" size="small" placeholder="输入内边距"></n-input-number>
      </SettingItem>

      <SettingItem name="颜色">
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.fontColor"></n-color-picker>
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox name="背景">
      <SettingItem name="背景圆角">
        <n-input-number
          v-model:value="optionData.borderRadius"
          size="small"
          :min="0"
          placeholder="背景圆角"
        ></n-input-number>
      </SettingItem>
      <SettingItem name="背景颜色">
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.backgroundColor"></n-color-picker>
      </SettingItem>
    </SettingItemBox>
  </CollapseItem>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { option, WritingModeEnum, WritingModeObject } from './config'
import {
  CollapseItem,
  SettingItemBox,
  SettingItem
} from '@/components/ChartItemSetting/index'

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})

const verticalOptions = [{
  label: WritingModeEnum.HORIZONTAL,
  value: WritingModeObject[WritingModeEnum.HORIZONTAL]
}, {
  label: WritingModeEnum.VERTICAL,
  value: WritingModeObject[WritingModeEnum.VERTICAL]
}]
</script>
