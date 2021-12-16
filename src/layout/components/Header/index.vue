<template>
  <div class="go-header">
    <header class="go-header-box">
      <div class="li">
        <slot name="left"></slot>
      </div>
      <div class="ri">
        <slot name="right">
          <ThemeSelect />
        </slot>
      </div>
    </header>
    <n-divider class="go-header-divider" />
  </div>
</template>

<script setup lang="ts">
import { ThemeSelect } from '@/components/ThemeSelect'
</script>

<style lang="scss" scoped>
@include go(header) {
  &-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px;
    height: $--header-height;
  }
  &-divider {
    margin: 0;
    padding-top: 0;
  }
}
</style>
