<template>
  <div class="go-chart">
    <n-layout>
      <HeaderPro>
        <template #left>
          <HeaderLeftBtn />
        </template>
        <template #center>
          <HeaderTitle />
        </template>
        <template #ri-left>
          <HeaderRightBtn />
        </template>
      </HeaderPro>
      <n-layout-content>
        <n-space></n-space>
      </n-layout-content>
    </n-layout>
  </div>
</template>

<script setup lang="ts">
import { HeaderPro } from '@/layout/components/HeaderPro'
import { HeaderLeftBtn } from './layout/components/HeaderLeftBtn/index'
import { HeaderRightBtn } from './layout/components/HeaderRightBtn/index'
import { HeaderTitle } from './layout/components/HeaderTitle/index'
</script>

<style lang="scss" scoped>
$height: 100vh;
@include go('chart') {
  height: $height;
  overflow: hidden;
  @include background-image('background-image');
}
</style>
