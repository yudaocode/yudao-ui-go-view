<template>
  <n-space class="go-mt-0">
    <n-button v-for="item in btnList" :key="item.title" ghost size="small">
      <template #icon>
        <component :is="item.icon"></component>
      </template>
      <span>
        {{ item.title }}
      </span>
    </n-button>
  </n-space>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { renderIcon } from '@/utils'
import { icon } from '@/plugins'
const { BrowsersOutlineIcon, SendIcon } = icon.ionicons5

const btnList = reactive([
  {
    select: true,
    title: '预览',
    icon: renderIcon(BrowsersOutlineIcon)
  },
  {
    select: true,
    title: '发布',
    icon: renderIcon(SendIcon)
  }
])
</script>
<style lang="scss" scoped>
.align-center {
  margin-top: -4px;
}
</style>
