<template>
  <n-button quaternary @click="handleClick" title="说明文档">
    <n-icon size="20" :depth="1">
      <DocumentTextIcon />
    </n-icon>
  </n-button>
</template>

<script lang="ts" setup>
import { openDoc } from '@/utils'
import { DocumentText as DocumentTextIcon } from '@vicons/ionicons5'

const handleClick = () => {
  openDoc()
}
</script>
