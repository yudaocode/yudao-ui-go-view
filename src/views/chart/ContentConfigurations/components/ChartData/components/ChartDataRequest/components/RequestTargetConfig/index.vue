<template>
  <!-- 组件配置 -->
  <n-divider class="go-my-3" title-placement="left"></n-divider>
  <setting-item-box
    name="组件"
    :itemRightStyle="{
      gridTemplateColumns: '5fr 2fr 1fr'
    }"
  >
    <setting-item name="请求方式 & URL 地址">
      <n-input-group>
        <n-select class="select-type-options" v-model:value="requestHttpType" :options="selectTypeOptions" />
        <n-input v-model:value.trim="requestUrl" :min="1" placeholder="请输入地址（去除源）">
          <template #prefix>
            <n-text>{{ requestOriginUrl }}</n-text>
            <n-divider vertical />
          </template>
        </n-input>
      </n-input-group>
      <!-- 组件url -->
    </setting-item>
    <setting-item name="默认使用全局间隔">
      <n-input-group>
        <n-input-number
          v-model:value.trim="requestInterval"
          class="select-time-number"
          min="5"
          :show-button="false"
          placeholder="可以为空"
        >
        </n-input-number>
        <!-- 单位 -->
        <n-select class="select-time-options" v-model:value="requestIntervalUnit" :options="selectTimeOptions" />
      </n-input-group>
    </setting-item>
    <n-button secondary type="primary">
      <template #icon>
        <n-icon>
          <flash-icon />
        </n-icon>
      </template>
      发送请求
    </n-button>
  </setting-item-box>
  <setting-item-box name="选择方式" class="go-mt-0">
    <request-header></request-header>
  </setting-item-box>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { useTargetData } from '@/views/chart/ContentConfigurations/components/hooks/useTargetData.hook'
import { selectTypeOptions, selectTimeOptions } from '@/views/chart/ContentConfigurations/components/ChartData/index.d'
import { RequestHeader } from '../RequestHeader'
import { icon } from '@/plugins'

const { FlashIcon } = icon.ionicons5
const { targetData, chartEditStore } = useTargetData()
const { requestOriginUrl } = toRefs(chartEditStore.getRequestGlobalConfig)
const { requestInterval, requestIntervalUnit, requestHttpType, requestUrl } = toRefs(targetData.value.request)
</script>

<style lang="scss" scoped>
.select-time-number {
  width: 100%;
}
.select-time-options {
  width: 100px;
}
.select-type-options {
  width: 120px;
}
</style>
