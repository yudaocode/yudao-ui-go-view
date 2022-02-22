<template>
  <n-divider />
  <n-collapse arrow-placement="right" default-expanded-names="1">
    <!-- 右侧 -->
    <template #header-extra>
      <slot name="header" />
    </template>

    <n-collapse-item :title="name" name="1">
      <slot />
    </n-collapse-item>
  </n-collapse>
</template>

<script setup lang="ts">
defineProps({
  name: {
    type: String,
    required: true
  }
})
</script>
