<template>
  <div class="go-project">
    <n-layout has-sider position="absolute">
      <n-space vertical>
        <Sider></Sider>
      </n-space>
      <n-layout>
        <HeaderPro></HeaderPro>
        <n-layout
          id="go-project-content-top"
          class="content-top"
          position="absolute"
          :native-scrollbar="false"
        >
          <n-layout-content>
            <TransitionMain>
              <router-view></router-view>
            </TransitionMain>
          </n-layout-content>
        </n-layout>
      </n-layout>
    </n-layout>
  </div>
</template>

<script setup lang="ts">
import { Sider } from './layout/components/Sider'
import { HeaderPro } from '@/layout/components/HeaderPro'
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
