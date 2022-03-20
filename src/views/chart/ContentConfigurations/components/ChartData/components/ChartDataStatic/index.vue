<template>
  <div class="go-chart-configurations-data-static" v-if="targetData">
    <ChartDataMatchingAndShow :tableData="targetData"></ChartDataMatchingAndShow>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { CreateComponentType } from '@/packages/index.d'
import { ChartDataMatchingAndShow } from '../ChartDataMatchingAndShow'

const props = defineProps({
  targetData: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

</script>

<style lang="scss" scoped>
@include go("chart-configurations-data-static") {
  @include deep() {
    pre {
      white-space: pre-wrap;
      word-wrap: break-word;
    }
  }
  .source-btn-box {
    margin-top: 10px !important;
  }
}
</style>
