<template>
  <div class="go-project-items">
    <List />
  </div>
</template>

<script setup lang="ts">
import { List } from './List'
</script>

<style lang="scss" scoped>
@include go(project-items) {
  padding: 30px 20px;
}
</style>
