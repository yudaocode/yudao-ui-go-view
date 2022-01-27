<template>
  <div class="go-shape-box">
    <slot></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@include go(shape-box) {
  position: absolute;
}
</style>
