<template>
  <!-- 事件配置 -->
  <n-collapse class="go-mt-3" arrow-placement="right" default-expanded-names="1" accordion>
    <n-text depth="3">
      组件 id：
      <n-text>{{ targetData.id }}</n-text>
    </n-text>
    <n-collapse-item title="事件配置" name="1">
      <n-space class="go-event go-mt-3" :size="18" vertical>
        <chart-event-monaco-editor></chart-event-monaco-editor>
      </n-space>
    </n-collapse-item>
  </n-collapse>
</template>

<script setup lang="ts">
import { ChartEventMonacoEditor } from './components/ChartEventMonacoEditor'
import { useTargetData } from '../hooks/useTargetData.hook'
const { targetData } = useTargetData()
</script>

<style lang="scss" scoped>
@include deep() {
  .go-event .n-card__content {
    max-height: 60vh;
    overflow-y: auto;
  }
}
</style>
