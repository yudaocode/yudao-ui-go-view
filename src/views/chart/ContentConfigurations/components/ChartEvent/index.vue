<template>
  <!-- 事件配置 -->
  <n-collapse class="go-mt-3" arrow-placement="right" :default-expanded-names="['1', '2']">
    <n-text depth="3">
      组件 id：
      <n-text>{{ targetData.id }}</n-text>
    </n-text>
    <n-collapse-item title="基础事件配置" name="1">
      <div class="go-event">
        <n-text depth="3">【单击、双击、移入、移出】在开发中，即将上线！</n-text>
        <br/>
        <n-text depth="3">（备注：高级事件模块可自行实现上述功能）</n-text>
      </div>
    </n-collapse-item>
    <chart-event-monaco-editor></chart-event-monaco-editor>
  </n-collapse>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ChartEventMonacoEditor } from './components/ChartEventMonacoEditor'
import { useTargetData } from '../hooks/useTargetData.hook'

const { targetData } = useTargetData()
const showModal = ref(false)
</script>
