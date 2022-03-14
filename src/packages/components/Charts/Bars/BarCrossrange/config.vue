<template>
  <CollapseItem v-for="(item, index) in seriesList" :key="index" :name="`柱状图-${index+1}`" :expanded="true">
    <SettingItemBox name="图形">
      <SettingItem name="颜色">
        <n-color-picker size="small" :modes="['hex']" v-model:value="item.itemStyle.color"></n-color-picker>
      </SettingItem>
      <SettingItem>
        <n-button size="small" @click="item.itemStyle.color = null">恢复默认</n-button>
      </SettingItem>
      <SettingItem name="宽度">
          <n-input-number
          v-model:value="item.barWidth"
          :min="1"
          :max="100"
          size="small"
          placeholder="自动计算"
       ></n-input-number>
      </SettingItem>
      <SettingItem name="圆角">
          <n-input-number
          v-model:value="item.itemStyle.borderRadius"
          :min="0"
          size="small"
       ></n-input-number>
      </SettingItem>
    </SettingItemBox>
  </CollapseItem>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/ChartItemSetting/index'
import { option } from './config'

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})

const seriesList = computed(() => {
  return props.optionData.series
})
</script>
