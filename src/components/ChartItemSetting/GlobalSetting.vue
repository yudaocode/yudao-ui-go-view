<template>
  <CollapseItem v-if="title" name="标题">
    <template #header>
      <n-switch v-show="inChart" v-model:value="title.show" size="small" />
    </template>
    <SettingItemBox name="标题">
      <SettingItem name="颜色">
        <n-color-picker v-model:value="title.textStyle.color" size="small" />
      </SettingItem>
      <SettingItem name="大小">
        <n-input-number
          v-model:value="title.textStyle.fontSize"
          :min="1"
          size="small"
        />
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox name="副标题">
      <SettingItem name="颜色">
        <n-color-picker size="small" v-model:value="title.subtextStyle.color" />
      </SettingItem>
      <SettingItem name="大小">
        <n-input-number
          v-model:value="title.subtextStyle.fontSize"
          :min="1"
          size="small"
        />
      </SettingItem>
    </SettingItemBox>
  </CollapseItem>

  <CollapseItem v-if="xAxis" name="X轴">
    <template #header>
      <n-switch v-show="inChart" v-model:value="xAxis.show" size="small" />
    </template>
    <SettingItemBox name="名称">
      <SettingItem name="颜色">
        <n-color-picker
          size="small"
          v-model:value="xAxis.nameTextStyle.color"
        />
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox name="标签">
      <SettingItem v-show="inChart" name="展示">
        <n-space>
          <n-switch v-model:value="xAxis.axisLabel.show" size="small" />
        </n-space>
      </SettingItem>
      <SettingItem name="颜色">
        <n-color-picker size="small" v-model:value="xAxis.axisLabel.color" />
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox name="轴线">
      <SettingItem name="颜色">
        <n-color-picker
          v-model:value="xAxis.axisLine.lineStyle.color"
          size="small"
        />
      </SettingItem>
      <SettingItem name="粗细">
        <n-input-number
          v-model:value="xAxis.axisLine.lineStyle.width"
          :min="1"
          size="small"
        />
      </SettingItem>
      <SettingItem name="对齐零">
        <n-space>
          <n-switch v-model:value="xAxis.axisLine.onZero" size="small" />
        </n-space>
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox name="刻度">
      <SettingItem v-show="inChart" name="展示">
        <n-space>
          <n-switch v-model:value="xAxis.axisTick.show" size="small" />
        </n-space>
      </SettingItem>
      <SettingItem name="长度">
        <n-input-number
          v-model:value="xAxis.axisTick.length"
          :min="1"
          size="small"
        />
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox name="分割线">
      <SettingItem v-show="inChart" name="展示">
        <n-space>
          <n-switch v-model:value="xAxis.splitLine.show" size="small" />
        </n-space>
      </SettingItem>
      <SettingItem name="颜色">
        <n-color-picker
          v-model:value="xAxis.splitLine.lineStyle.color"
          size="small"
        />
      </SettingItem>
      <SettingItem name="粗细">
        <n-input-number
          v-model:value="xAxis.splitLine.lineStyle.width"
          :min="1"
          size="small"
        />
      </SettingItem>
      <SettingItem name="类型">
        <n-select
          v-model:value="xAxis.splitLine.lineStyle.type"
          size="small"
          :options="axisConf.splitLint.lineStyle.type"
        />
      </SettingItem>
      <SettingItem name="位置">
        <n-select
          v-model:value="xAxis.position"
          size="small"
          :options="axisConf.xposition"
        />
      </SettingItem>
    </SettingItemBox>
  </CollapseItem>

  <CollapseItem v-if="yAxis" name="Y轴">
    <template #header>
      <n-switch v-show="inChart" v-model:value="yAxis.show" size="small" />
    </template>
    <SettingItemBox name="名称">
      <SettingItem name="颜色">
        <n-color-picker
          size="small"
          v-model:value="yAxis.nameTextStyle.color"
        />
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox name="标签">
      <SettingItem v-show="inChart" name="展示">
        <n-space>
          <n-switch v-model:value="yAxis.axisLabel.show" size="small" />
        </n-space>
      </SettingItem>
      <SettingItem name="颜色">
        <n-color-picker size="small" v-model:value="yAxis.axisLabel.color" />
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox name="轴线">
      <SettingItem v-show="inChart" name="展示">
        <n-space>
          <n-switch v-model:value="yAxis.axisLine.show" size="small" />
        </n-space>
      </SettingItem>
      <SettingItem name="颜色">
        <n-color-picker
          v-model:value="yAxis.axisLine.lineStyle.color"
          size="small"
        />
      </SettingItem>
      <SettingItem name="粗细">
        <n-input-number
          v-model:value="yAxis.axisLine.lineStyle.width"
          :min="1"
          size="small"
        />
      </SettingItem>
      <SettingItem name="对齐零">
        <n-space>
          <n-switch v-model:value="yAxis.axisLine.onZero" size="small" />
        </n-space>
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox name="刻度">
      <SettingItem v-show="inChart" name="展示">
        <n-space>
          <n-switch v-model:value="yAxis.axisTick.show" size="small" />
        </n-space>
      </SettingItem>
      <SettingItem name="长度">
        <n-input-number
          v-model:value="yAxis.axisTick.length"
          :min="1"
          size="small"
        />
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox name="分割线">
      <SettingItem v-show="inChart" name="展示">
        <n-space>
          <n-switch v-model:value="yAxis.splitLine.show" size="small" />
        </n-space>
      </SettingItem>
      <SettingItem name="颜色">
        <n-color-picker
          v-model:value="yAxis.splitLine.lineStyle.color"
          size="small"
        />
      </SettingItem>
      <SettingItem name="粗细">
        <n-input-number
          v-model:value="yAxis.splitLine.lineStyle.width"
          :min="1"
          size="small"
        />
      </SettingItem>
      <SettingItem name="类型">
        <n-select
          v-model:value="yAxis.splitLine.lineStyle.type"
          size="small"
          :options="axisConf.splitLint.lineStyle.type"
        />
      </SettingItem>
      <SettingItem name="位置">
        <n-select
          v-model:value="yAxis.position"
          size="small"
          :options="axisConf.yposition"
        />
      </SettingItem>
    </SettingItemBox>
  </CollapseItem>

  <CollapseItem v-if="legend" name="图例">
    <template #header>
      <n-switch v-show="inChart" v-model:value="legend.show" size="small" />
    </template>
    <SettingItemBox name="图例文字">
      <SettingItem>
        <n-color-picker size="small" v-model:value="legend.textStyle.color" />
      </SettingItem>
    </SettingItemBox>
  </CollapseItem>
</template>

<script setup lang="ts">
import { toRefs, PropType, watchEffect, computed } from 'vue'
import { GlobalThemeJsonType } from '@/settings/chartThemes/index'
import { axisConf } from '@/packages/chartConfiguration/echarts/index'
import {
  CollapseItem,
  SettingItemBox,
  SettingItem
} from '@/components/ChartItemSetting/index'

const props = defineProps({
  optionData: {
    type: Object as PropType<GlobalThemeJsonType>,
    required: true
  },
  inChart: {
    type: Boolean,
    required: false,
    default: false
  }
})

const title = computed(() => {
  return props.optionData.title
})

const xAxis = computed(() => {
  return props.optionData.xAxis
})

const yAxis = computed(() => {
  return props.optionData.yAxis
})

const legend = computed(() => {
  return props.optionData.legend
})
</script>
