<template>
  <div class="go-project">
    <n-layout has-sider position="absolute">
      <n-space vertical>
        <Sider />
      </n-space>
      <n-layout>
        <Header />
        <n-layout
          class="content-top"
          position="absolute"
          :native-scrollbar="false"
        >
          <n-layout-content>
            <TransitionMain>
              <router-view />
            </TransitionMain>
          </n-layout-content>
        </n-layout>
      </n-layout>
    </n-layout>
  </div>
</template>

<script setup lang="ts">
import { Sider } from './layout/components/Sider'
import { Header } from './layout/components/Header/index'
import { TransitionMain } from '@/layout/components/TransitionMain/index'
</script>

<style lang="scss" scoped>
@include go(project) {
  .content-top {
    top: $--header-height;
    margin-top: 1px;
  }
}
</style>
