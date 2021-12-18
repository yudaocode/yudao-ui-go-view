<template>
  <n-tooltip v-if="collapsed" placement="right" trigger="hover">
    <template #trigger>
      <n-button ghost type="primary" size="small">
        <template #icon>
          <n-icon>
            <DuplicateIcon />
          </n-icon>
        </template>
      </n-button>
    </template>
    <n-text>
      新建
    </n-text>
  </n-tooltip>
  <n-button v-else ghost type="primary" size="large">
    <template #icon>
      <n-icon>
        <DuplicateIcon />
      </n-icon>
    </template>
    <n-text>
      新建
    </n-text>
  </n-button>
</template>
<script setup lang="ts">
import { Duplicate as DuplicateIcon } from '@vicons/ionicons5'
const props = defineProps({
  collapsed: Boolean
})
</script>
