<template>
  <collapse-item name="翻牌" :expanded="true">
    <setting-item-box name="内容">
      <setting-item name="初始值">
        <n-input-number v-model:value="optionData.dataset" size="small" :min="0"></n-input-number>
      </setting-item>
      <setting-item name="个数">
        <n-input-number v-model:value="optionData.flipperLength" size="small" :min="1"></n-input-number>
      </setting-item>
    </setting-item-box>

    <setting-item-box name="尺寸">
      <setting-item name="宽度">
        <n-input-number v-model:value="optionData.flipperWidth" size="small" :min="1"></n-input-number>
      </setting-item>
      <setting-item name="高度">
        <n-input-number v-model:value="optionData.flipperHeight" size="small" :min="1"></n-input-number>
      </setting-item>
    </setting-item-box>

    <setting-item-box name="样式">
      <setting-item name="背景色">
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.flipperBgColor"></n-color-picker>
      </setting-item>
      <setting-item name="字体色">
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.flipperTextColor"></n-color-picker>
      </setting-item>
      <setting-item name="圆角">
        <n-input-number v-model:value="optionData.flipperRadius" size="small" :min="0"></n-input-number>
      </setting-item>
      <setting-item name="翻牌速度">
        <n-input-number
          v-model:value="optionData.flipperSpeed"
          size="small"
          :min="100"
          :max="900"
          :step="100"
        ></n-input-number>
      </setting-item>
    </setting-item-box>
  </collapse-item>
</template>
<script setup lang="ts">
import { PropType } from 'vue'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { option } from './config'

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})
</script>
