<template>
  <div class="go-config-item-box">
    <n-text class="item-left" depth="2">{{ name }}</n-text>
    <div class="item-right" justify="space-between">
      <slot />
    </div>
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
$leftWidth: 60px;
@include go('config-item-box') {
  position: relative;
  display: flex;
  margin-top: 10px;
  .item-left {
    width: $leftWidth;
    text-align: left;
    margin-left: 10px;
    font-size: 12px;
  }
  .item-right {
    display: grid;
    grid-column-gap: 10px;
    grid-template-columns: 1fr 1fr;
    width: calc(100% - #{$leftWidth});
  }
}
</style>
