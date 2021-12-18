<template>
  <n-layout-header bordered class="go-header">
    <header class="go-header-box">
      <div class="li">
        <n-space>
          <slot name="left"></slot>
        </n-space>
      </div>
      <div class="ri">
        <n-space>
          <slot name="ri-left"> </slot>
          <LangSelect />
          <ThemeSelect />
          <slot name="ri-right"> </slot>
        </n-space>
      </div>
    </header>
  </n-layout-header>
</template>

<script setup lang="ts">
import { ThemeSelect } from '@/components/ThemeSelect'
import { LangSelect } from '@/components/LangSelect'
</script>

<style lang="scss" scoped>
@include go(header) {
  &-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 60px;
    height: $--header-height;
  }
}
</style>
