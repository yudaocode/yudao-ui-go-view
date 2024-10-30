<template>
  <collapse-item name="样式" :expanded="true">
    <setting-item-box name="背景颜色">
      <setting-item name="背景颜色">
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.cardBackColor[0]"></n-color-picker>
      </setting-item>
      <setting-item name="背景颜色">
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.cardBackColor[1]"></n-color-picker>
      </setting-item>
    </setting-item-box>

    <setting-item-box name="标题背景">
      <setting-item name="背景颜色">
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.titleBackColor[0]"></n-color-picker>
      </setting-item>
      <setting-item name="背景颜色">
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.titleBackColor[1]"></n-color-picker>
      </setting-item>
    </setting-item-box>

    <setting-item-box name="图标" :alone="true">
      <setting-item name="图标类型">
        <n-input-group>
          <n-button @click="openNewWindow('https://xicons.org/#/zh-CN')" type="primary" ghost>
            图标
          </n-button>
          <n-input style="width: 80%" v-model:value="optionData.iconType" size="small"></n-input>

        </n-input-group>

      </setting-item>
    </setting-item-box>
    <setting-item-box name="标题颜色">

      <setting-item name="图标颜色">
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.iconColor"></n-color-picker>
      </setting-item>
      <setting-item name="渐变色1">
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.titleColor[0]"></n-color-picker>
      </setting-item>
      <setting-item name="渐变色2">
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.titleColor[1]"></n-color-picker>
      </setting-item>
      <setting-item name="字体粗细">
        <n-select v-model:value="optionData.fontWeight" size="small" :options="fontWeightOptions" />
      </setting-item>
      <setting-item name="圆角">
        <n-input v-model:value="optionData.cardBorderRadius" size="small" placeholder="圆角"></n-input>
      </setting-item>
    </setting-item-box>

    <setting-item-box name="项目颜色1">
      <setting-item name="渐变色1">
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.itemColor1[0]"></n-color-picker>
      </setting-item>
      <setting-item name="渐变色2">
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.itemColor1[1]"></n-color-picker>
      </setting-item>
    </setting-item-box>

    <setting-item-box name="项目颜色2">
      <setting-item name="渐变色1">
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.itemColor2[0]"></n-color-picker>
      </setting-item>
      <setting-item name="渐变色2">
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.itemColor2[1]"></n-color-picker>
      </setting-item>
    </setting-item-box>

    <setting-item-box name="文字">
      <setting-item name="标题文本">
        <n-input v-model:value="optionData.cardTitle" size="small"></n-input>
      </setting-item>
      <setting-item name="项目颜色">
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.itemFontColor"></n-color-picker>
      </setting-item>
      <setting-item name="标题大小">
        <n-input-number v-model:value="optionData.titleSize" size="small" placeholder="标题大小"></n-input-number>
      </setting-item>
      <setting-item name="字体大小">
        <n-input-number v-model:value="optionData.fontSize" size="small" placeholder="字体大小"></n-input-number>
      </setting-item>
      <setting-item name="项目大小">
        <n-input-number v-model:value="optionData.itemHeight" size="small" placeholder="项目大小"></n-input-number>
      </setting-item>
    </setting-item-box>

<!--    <setting-item-box name="动画">-->
<!--      <setting-item name="动画速度">-->
<!--        <n-input-number-->
<!--          v-model:value="optionData.animationSpeed"-->
<!--          size="small"-->
<!--          placeholder="动画速度"-->
<!--          :min="0"-->
<!--        ></n-input-number>-->
<!--      </setting-item>-->
<!--      <setting-item name="动画间隔">-->
<!--        <n-input-number-->
<!--          v-model:value="optionData.animationTime"-->
<!--          size="small"-->
<!--          placeholder="动画间隔"-->
<!--          :min="0"-->
<!--        ></n-input-number>-->
<!--      </setting-item>-->
<!--    </setting-item-box>-->


  </collapse-item>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { option, FontWeightEnum, FontWeightObject } from './config'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import {openNewWindow} from "@/utils";
const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})

const fontWeightOptions = [
  {
    label: FontWeightEnum.NORMAL,
    value: FontWeightObject[FontWeightEnum.NORMAL]
  },
  {
    label: FontWeightEnum.BOLD,
    value: FontWeightObject[FontWeightEnum.BOLD]
  }
]
</script>
