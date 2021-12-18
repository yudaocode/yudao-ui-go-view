<template>
  <div class="go-aside-footer">
    <n-divider class="go-mt-0" />
    <n-space justify="space-around" :wrap="false">
      <n-button secondary @click="handleDoc">
        <template #icon>
          <n-icon size="18">
            <HelpOutlineIcon />
          </n-icon>
        </template>
        <n-text>帮助中心</n-text>
      </n-button>
      <n-button secondary @click="handleCode">
        <template #icon>
          <n-icon size="18">
            <CodeSlashIcon />
          </n-icon>
        </template>
        <n-text>仓库地址</n-text>
      </n-button>
    </n-space>
  </div>
</template>
<script setup lang="ts">
import { openDoc, openGiteeSourceCode } from '@/utils/page'

import {
  HelpCircleOutline as HelpOutlineIcon,
  CodeSlash as CodeSlashIcon
} from '@vicons/ionicons5'

const handleDoc = () => {
  openDoc()
}
const handleCode = () => {
  openGiteeSourceCode()
}
</script>

<style lang="scss" scoped>
@include go('aside-footer') {
  padding-bottom: 20px;
}
</style>
