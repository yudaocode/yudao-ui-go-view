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
      <n-layout-content content-style="overflow:hidden; display: flex">
        <ContentCharts />
        <ContentLayers />
        <ContentDrag />
        <ContentDetails />
      </n-layout-content>
    </n-layout>
  </div>
</template>

<script setup lang="ts">
import { HeaderPro } from '@/layout/components/HeaderPro'
import { HeaderLeftBtn } from './components/HeaderLeftBtn/index'
import { HeaderRightBtn } from './components/HeaderRightBtn/index'
import { HeaderTitle } from './components/HeaderTitle/index'
import { ContentLayers } from './components/ContentLayers/index'
import { ContentCharts } from './components/ContentCharts/index'
import { ContentDrag } from './components/ContentDrag/index'
import { ContentDetails } from './components/ContentDetails/index'
</script>

<style lang="scss" scoped>
$height: 100vh;
@include go('chart') {
  height: $height;
  overflow: hidden;
  @include background-image('background-image');
}
</style>
