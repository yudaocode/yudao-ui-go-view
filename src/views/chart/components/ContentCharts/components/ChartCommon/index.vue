<template>
  <div class="go-chart-common">
    <n-menu
      class="common-menu-width"
      v-model:value="selectValue"
      :options="menuOptions"
      :icon-size="16"
      :indent="18"
    />
    <div>
      右侧的小组将列表
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { renderLang } from '@/utils'

const menuOptions = reactive([
  {
    key: 'ChartCommon',
    label: renderLang('图表')
  },
  {
    key: 'TextCommon',
    label: renderLang('信息')
  },
  {
    key: 'TableCommon',
    label: renderLang('表格')
  },
  {
    key: 'DecorateCommon',
    label: renderLang('装饰')
  }
])



const selectValue = ref<string>(menuOptions[0]['key'])
</script>

<style lang="scss" scoped>
/* 列表的宽度 */
$topHeight: 36px;
@include go('chart-common') {
  display: flex;
  height: calc(100vh - #{$--header-height} - #{$topHeight});
  .common-menu-width {
    @include filter-bg-color('background-color2-shallow');
  }
}
</style>
