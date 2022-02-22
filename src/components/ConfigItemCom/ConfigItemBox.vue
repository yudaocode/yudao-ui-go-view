<template>
  <div class="go-config-item-box go-flex-items-center">
    <n-text class="item-left">{{ name }}</n-text>
    <n-space class="item-right" justify="space-between">
      <slot />
    </n-space>
  </div>
</template>

<script setup lang="ts">
defineProps({
  name: {
    type: String,
    required: true
  }
})
</script>

<style lang="scss" scoped>
$leftWidth: 100px;
@include go('config-item-box') {
  position: relative;
  justify-content: flex-start;
  .item-left {
    width: $leftWidth;
    text-align: left;
    margin-left: 10px;
  }
  .item-right {
    margin-left: 10px;
  }
}
</style>
