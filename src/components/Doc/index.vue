<template>
  <n-button quaternary @click="handleClick" title="说明文档">
    <n-icon size="20" :depth="1">
      <DocumentTextIcon />
    </n-icon>
  </n-button>
</template>

<script lang="ts" setup>
import { openDoc } from '@/utils'
import { icon } from '@/plugins'
const { DocumentTextIcon } = icon.ionicons5

const handleClick = () => {
  openDoc()
}
</script>
