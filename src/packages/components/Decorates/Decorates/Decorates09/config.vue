<template>
    <CollapseItem name="样式配置" expanded>
        <SettingItemBox name="圆点" alone>
            <SettingItem name="大小">
                <n-input v-model:value="optionData.roundDotSize" size="small"></n-input>
            </SettingItem>
          <SettingItem name="点数量">
          <n-input-number
              v-model:value="props.optionData.roundDotNum"
              :min="1"
              :max="500"
              size="small"
          ></n-input-number>
          </SettingItem>
            <SettingItem name="颜色">
                <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.roundDotColor"></n-color-picker>
            </SettingItem>
        </SettingItemBox>
    </CollapseItem>
</template>

<script setup lang="ts">
    import { PropType } from 'vue'
    import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
    import {
        option
    } from './config'

    const props = defineProps({
        optionData: {
            type: Object as PropType<typeof option>,
            required: true
        }
    })
</script>
