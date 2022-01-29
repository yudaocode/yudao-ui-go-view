<template>
  <div
    class="go-edit-range"
    :style="useSizeStyle(size)"
    @mousedown="mousedownHandle($event, undefined)"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { useSizeStyle } from '../../hooks/useStyle.hook'
import { mousedownHandle } from '../../hooks/useLayout.hook'

const size = {
  w: 1920,
  h: 1080
}

</script>

<style lang="scss" scoped>
@include go(edit-range) {
  position: relative;
  border: 1px solid;
  background-color: #333;
  border-radius: 15px;
  @include filter-bg-color('background-color2');
  @include fetch-theme('box-shadow');
  @include filter-border-color('hover-border-color');
  @include fetch-theme-custom('border-color', 'background-color4');
}
</style>
