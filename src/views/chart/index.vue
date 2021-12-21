<template>
  <div class="go-chart">
    <n-layout>
      <HeaderPro />
      <n-layout-content>
        <TransitionMain>
          <router-view />
        </TransitionMain>
      </n-layout-content>
    </n-layout>
  </div>
</template>

<script setup lang="ts">
import { HeaderPro } from '@/layout/components/HeaderPro'
import { requireFallbackImg } from '@/utils'
import { TransitionMain } from '@/layout/components/TransitionMain/index'
</script>

<style lang="scss" scoped>
$height: 100vh;
@include go('chart') {
  height: $height;
  overflow: hidden;
  @include background-image('background-image');
}
</style>
