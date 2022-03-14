<template>
  <div class="go-project-items">
    <List></List>
  </div>
</template>

<script setup lang="ts">
import { List } from './components/List'
</script>

<style lang="scss" scoped>
@include go(project-items) {
  padding: 30px 20px;
}
</style>
