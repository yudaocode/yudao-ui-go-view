<template>
  <div class="go-header">
    <header class="go-header-box">
      <div class="li">
        <n-space>
          <slot name="left"></slot>
        </n-space>
      </div>
      <div class="ri">
        <n-space>
          <slot name="right">
            <LangSelect />
            <ThemeSelect />
          </slot>
        </n-space>
      </div>
    </header>
    <n-divider class="go-header-divider" />
  </div>
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
    padding: 0 40px;
    height: $--header-height;
  }
  &-divider {
    margin: 0;
    padding-top: 0;
  }
}
</style>
