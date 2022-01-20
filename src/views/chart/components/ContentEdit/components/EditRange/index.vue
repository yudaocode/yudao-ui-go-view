<template>
  <div class="go-edit-range">
    <slot></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@include go(edit-range) {
  position: relative;
  height: 1080px;
  width: 1920px;
  border: 1px solid;
  border-radius: 15px;
  background-color: #333;
  @include filter-bg-color('background-color2');
  @include fetch-theme('box-shadow');
  @include filter-border-color('hover-border-color');
  @include fetch-theme-custom('border-color', 'background-color4');
}
</style>
