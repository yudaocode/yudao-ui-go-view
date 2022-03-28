<template>
  <n-layout-header bordered class="go-header">
    <header class="go-header-box">
      <div class="header-item left">
        <n-space>
          <slot name="left"></slot>
        </n-space>
      </div>
      <div class="header-item center">
        <slot name="center"></slot>
      </div>
      <div class="header-item right">
        <n-space>
          <slot name="ri-left"> </slot>
          <lang-select></lang-select>
          <theme-color-select></theme-color-select>
          <Theme-select></Theme-select>
          <slot name="ri-right"> </slot>
        </n-space>
      </div>
    </header>
  </n-layout-header>
</template>

<script setup lang="ts">
import { ThemeSelect } from '@/components/ThemeSelect'
import { LangSelect } from '@/components/LangSelect'
import { ThemeColorSelect } from '@/components/ThemeColorSelect'
</script>

<style lang="scss" scoped>
@include go(header) {
  &-box {
    display: grid;
    grid-template-columns: repeat(3, 33.33%);
    .header-item {
      display: flex;
      align-items: center;
      &.left {
        justify-content: start;
      }
      &.center {
        justify-content: center;
      }
      &.right {
        justify-content: end;
      }
    }
    height: $--header-height;
    padding: 0 60px;
  }
}
</style>
