<template>
  <!-- 全局配置 -->
  <n-card class="n-card-shallow">
    <n-tag type="info" :bordered="false"> 全局配置 </n-tag>
    <setting-item-box
      name="服务"
      :itemRightStyle="{
        gridTemplateColumns: '5fr 2fr 1fr'
      }"
    >
      <!-- 源地址 -->
      <setting-item name="前置 URL">
        <n-input v-model:value.trim="requestOriginUrl" :disabled="disabled" placeholder="http://127.0.0.1/"></n-input>
      </setting-item>
      <setting-item name="更新间隔（为 0 表示不更新）">
        <n-input-group>
          <n-input-number
            class="select-time-number"
            v-model:value.trim="requestInterval"
            min="0"
            :show-button="false"
            :disabled="disabled"
            placeholder="请输入数字"
          >
          </n-input-number>
          <!-- 单位 -->
          <n-select
            class="select-time-options"
            v-model:value="requestIntervalUnit"
            :options="selectTimeOptions"
            :disabled="disabled"
          />
        </n-input-group>
      </setting-item>
      <n-button v-show="disabled" type="primary" secondary @click="disabled = false">
        <template #icon>
          <n-icon>
            <pencil-icon />
          </n-icon>
        </template>
        编辑配置
      </n-button>
    </setting-item-box>
  </n-card>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { useTargetData } from '@/views/chart/ContentConfigurations/components/hooks/useTargetData.hook'
import { selectTypeOptions, selectTimeOptions } from '@/views/chart/ContentConfigurations/components/ChartData/index.d'
import { icon } from '@/plugins'

const { PencilIcon } = icon.ionicons5
const { targetData, chartEditStore } = useTargetData()
const { requestOriginUrl, requestInterval, requestIntervalUnit } = toRefs(chartEditStore.getRequestGlobalConfig)
const disabled = ref(true)
</script>

<style lang="scss" scoped>
.select-time-number {
  width: 100%;
}
.select-time-options {
  width: 100px;
}
</style>
