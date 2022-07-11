<template>
  <n-space vertical>
    <div style="width: 600px">
      <n-tabs v-model:value="requestContentType" type="segment" size="small">
        <n-tab :name="RequestContentTypeEnum.DEFAULT" tab="普通请求"> </n-tab>
        <n-tab :name="RequestContentTypeEnum.SQL" tab="SQL 请求"> </n-tab>
      </n-tabs>
    </div>
    <div v-show="requestContentType === RequestContentTypeEnum.DEFAULT">
      <n-tabs type="line" animated>
        <n-tab v-for="item in RequestParamsTypeEnum" :key="item" :name="item" :tab="item"> {{ item }} </n-tab>
      </n-tabs>
    </div>
    <div v-show="requestContentType === RequestContentTypeEnum.SQL">
      <setting-item-box name="键名">
        <n-input v-model:value.trim="sqlObject.key" :min="1" placeholder="请输入内容" />
      </setting-item-box>
      <setting-item-box name="键值">
        <monaco-editor v-model:modelValue="sqlObject.value" width="600px" height="200px" language="sql" />
      </setting-item-box>
    </div>
  </n-space>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs } from 'vue'
import { RequestParamsTypeEnum, RequestContentTypeEnum ,RequestBodyEnum } from '@/enums/httpEnum'
import { MonacoEditor } from '@/components/Pages/MonacoEditor'
import { SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { useTargetData } from '@/views/chart/ContentConfigurations/components/hooks/useTargetData.hook'

const { targetData, chartEditStore } = useTargetData()

const { requestContentType } = toRefs(targetData.value.request)

const tabValue = ref(RequestParamsTypeEnum.NONE)
const sqlObject = reactive({
  key: 'sql',
  value: 'select * from  where'
})
</script>

<style lang="scss" scoped>
.select-type {
  width: 300px;
}
</style>
