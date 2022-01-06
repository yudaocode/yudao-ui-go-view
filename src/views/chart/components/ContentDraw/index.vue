<template>
  <ContentBox
    class="go-content-draw"
    :flex="true"
    :showTop="false"
    :showBottom="true"
    :depth="2"
  >
    <template #bottom>
    </template>
  </ContentBox>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { ContentBox } from '../ContentBox/index'
</script>

<style lang="scss" scoped>
@include go(content-draw) {
  overflow: hidden;
  @include background-point('background-point');
  @extend .go-point-bg;
}
</style>
