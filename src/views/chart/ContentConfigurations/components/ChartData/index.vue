<template>
  <div class="go-chart-configurations-data" v-if="targetData">
    <setting-item-box name="请求方式" :alone="true">
      <n-select v-model:value="targetData.data.requestDataType" :options="selectOptions" />
    </setting-item-box>
    <!-- 静态 -->
    <chart-data-static
      v-if="targetData.data.requestDataType === RequestDataTypeEnum.STATIC"
      :targetData="targetData"
    ></chart-data-static>
    <!-- 动态 -->
    <chart-data-ajax v-else></chart-data-ajax>
  </div>
</template>

<script setup lang="ts">
import { SettingItemBox } from '@/components/ChartItemSetting/index'
import { RequestDataTypeEnum } from '@/store/modules/chartEditStore/chartEditStore.d'
import { useTargetData } from '../hooks/useTargetData.hook'
import { ChartDataStatic } from './components/ChartDataStatic/index'
import { ChartDataAjax } from './components/ChartDataAjax/index'
import { SelectOptionsType, SelcetOptionsLableEnum } from './index.d'

const { targetData } = useTargetData()

// 选项
const selectOptions: SelectOptionsType[] = [
  {
    label: SelcetOptionsLableEnum.STATIC,
    value: RequestDataTypeEnum.STATIC
  },
  {
    label: SelcetOptionsLableEnum.AJAX,
    value: RequestDataTypeEnum.AJAX,
  }
]

</script>

<style>
</style>
<style lang="scss" scoped>
@include go("chart-configurations-data") {
}
</style>
