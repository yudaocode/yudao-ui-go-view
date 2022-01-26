<template>
  <!-- 工作台相关 -->
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
        <ContentDetails />
      </n-layout-content>
    </n-layout>
  </div>
</template>

<script setup lang="ts">
import { loadAsyncComponent } from '@/utils'
import { HeaderPro } from '@/layout/components/HeaderPro'

const HeaderLeftBtn = loadAsyncComponent(() =>
  import('./HeaderLeftBtn/index.vue')
)
const HeaderRightBtn = loadAsyncComponent(() =>
  import('./HeaderRightBtn/index.vue')
)
const HeaderTitle = loadAsyncComponent(() =>
  import('./HeaderTitle/index.vue')
)
const ContentLayers = loadAsyncComponent(() =>
  import('./ContentLayers/index.vue')
)
const ContentCharts = loadAsyncComponent(() =>
  import('./ContentCharts/index.vue')
)
const ContentDetails = loadAsyncComponent(() =>
  import('./ContentDetails/index.vue')
)
</script>

<style lang="scss" scoped>
@include go('chart') {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  @include background-image('background-image');
}
</style>
