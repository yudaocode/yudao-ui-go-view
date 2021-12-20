<template>
  <div class="go-project-my-template">
    <n-space vertical>
      <n-image
        object-fit="contain"
        height="400"
        preview-disabled
        :src="requireFallbackImg()"
      />
      <n-h1>没有东西呢</n-h1>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { requireUrl, requireFallbackImg } from '@/utils'
</script>

<style lang="scss" scoped>
@include go('project-my-template') {
  @extend .go-flex-center;
}
</style>
