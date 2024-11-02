<template>
  <!-- 默认展开 -->
  <CollapseItem name="磨砂玻璃" :expanded="true">
    <SettingItem name="磨砂数值">
      <n-input-number
          v-model:value="props.optionData.glassBackdropFilterBlur"
          :min="0"
          size="small"
      ></n-input-number>
    </SettingItem>
    <SettingItem name="覆盖颜色">
      <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="props.optionData.glassBackgroundColor"
      ></n-color-picker>
    </SettingItem>

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
