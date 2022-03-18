<template>
  <div class="go-chart-data-setting">
    <setting-item-box name="源地址" :alone="true">
      <n-input
        v-model:value="requestConfig.requestUrl"
        placeholder="源地址如: http://127.0.0.1"
      ></n-input>
    </setting-item-box>
    <setting-item-box name="更新间隔">
      <n-input-number
        v-model:value="requestConfig.requestInterval"
        min="0"
        :show-button="false"
        placeholder="为 0 不更新"
      >
        <template #suffix>
          秒
        </template>
      </n-input-number>
    </setting-item-box>
  </div>
</template>

<script setup lang="ts">
import { computed, Ref } from 'vue'
import { SettingItemBox } from '@/components/ChartItemSetting/index'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { RequestConfigType } from '@/store/modules/chartEditStore/chartEditStore.d'

const chartEditStore = useChartEditStore()

const requestConfig: Ref<RequestConfigType> = computed(() => {
  return chartEditStore.getRequestConfig
})
</script>
