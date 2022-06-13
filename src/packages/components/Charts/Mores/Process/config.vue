<template>
  <!-- 默认展开 -->
  <CollapseItem
      name="进度条" :expanded="true">
    <SettingItemBox name="内容">
      <SettingItem name="数值">
        <!-- 与 config.ts 里的 option 对应 --><!-- n-input-number 是 NaiveUI 的控件 -->
        <n-input-number v-model:value="optionData.dataset" size="small" :min="0"  placeholder="进度值"></n-input-number>
      </SettingItem>
      <!-- 颜色粗细等等... -->
    </SettingItemBox>
    <SettingItemBox name="外观">
      <SettingItem name="形状">
        <n-select v-model:value="optionData.type" :options="types" placeholder="选择形状" />
      </SettingItem>
      <SettingItem name="指标位置" v-if="optionData.type == types[0].value">
        <n-select v-model:value="optionData.indicatorPlacement" :options="indicatorPlacements" placeholder="选择形状" />
      </SettingItem>
      <!-- 颜色粗细等等... -->
      <SettingItem name="进度条颜色">
        <n-color-picker
            size="small"
            :modes="['hex']"
            v-model:value="optionData.color"
        ></n-color-picker>
      </SettingItem>
    </SettingItemBox>
  </CollapseItem>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
// 以下是封装的设置模块布局组件，具体效果可在官网查看
import {
  CollapseItem,
  SettingItemBox,
  SettingItem,
} from '@/components/Pages/ChartItemSetting'

// 获取 option 的数据，便于使用 typeof 获取类型
import { option, types, indicatorPlacements} from './config'

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})
</script>