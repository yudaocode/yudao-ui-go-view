<template>
  <n-button v-if="collapsed" ghost type="primary" size="small">
    <template #icon>
      <n-icon>
        <DuplicateIcon />
      </n-icon>
    </template>
  </n-button>
  <n-button v-else ghost type="primary" size="large">
    <template #icon>
      <n-icon>
        <DuplicateIcon />
      </n-icon>
    </template>
    <span>
      新建项目
    </span>
  </n-button>
</template>
<script setup lang="ts">
import { Duplicate as DuplicateIcon } from '@vicons/ionicons5'
const props = defineProps({
  collapsed: Boolean
})
</script>
