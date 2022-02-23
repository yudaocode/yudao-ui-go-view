<template>
  <div class="go-global-setting">
    <CollapseItem name="标题">
      <SettingItemBox name="标题">
        <SettingItem width="200">
          <n-color-picker v-model:value="title.textStyle.color" size="small" />
        </SettingItem>
      </SettingItemBox>
      <SettingItemBox name="副标题">
        <SettingItem width="200">
          <n-color-picker
            size="small"
            v-model:value="title.subtextStyle.color"
          />
        </SettingItem>
      </SettingItemBox>
    </CollapseItem>

    <CollapseItem name="X轴">
      <SettingItemBox name="文本">
        <SettingItem name="颜色">
          <n-color-picker
            size="small"
            v-model:value="xAxis.nameTextStyle.color"
          />
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
      <SettingItemBox name="分割线">
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
          <n-select v-model:value="xAxis.splitLine.lineStyle.type" size="small" :options="axisConf.splitLint.lineStyle.type" />
        </SettingItem>
      </SettingItemBox>
    </CollapseItem>

    <CollapseItem name="Y轴">
      <SettingItemBox name="文本">
        <SettingItem name="颜色">
          <n-color-picker
            size="small"
            v-model:value="yAxis.nameTextStyle.color"
          />
        </SettingItem>
      </SettingItemBox>
      <SettingItemBox name="轴线">
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
      <SettingItemBox name="分割线">
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
          <n-select v-model:value="yAxis.splitLine.lineStyle.type" size="small" :options="axisConf.splitLint.lineStyle.type" />
        </SettingItem>
      </SettingItemBox>
    </CollapseItem>

    <CollapseItem name="图例">
      <SettingItemBox name="图例文字">
        <SettingItem>
          <n-color-picker size="small" v-model:value="legend.textStyle.color" />
        </SettingItem>
      </SettingItemBox>
    </CollapseItem>
  </div>
</template>

<script setup lang="ts">
import { toRefs, PropType } from 'vue'
import { GlobalThemeJsonType } from '@/settings/chartThemes/index'
import { axisConf } from '@/packages/chartConfiguration/echarts/index'
import {
  CollapseItem,
  SettingItemBox,
  SettingItem
} from '@/components/ChartItemSetting/index'

const props = defineProps({
  data: {
    type: Object as PropType<GlobalThemeJsonType>,
    required: true
  }
})

const { title, xAxis, yAxis, legend } = toRefs(props.data)
</script>

<style lang="scss" scoped>
@include go(global-setting) {
}
</style>
