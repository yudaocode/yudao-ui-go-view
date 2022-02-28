<template>
  <div class="go-aside-footer">
    <n-divider class="go-mt-0" />
    <n-space justify="space-around">
      <n-tooltip v-if="collapsed" placement="right" trigger="hover">
        <template #trigger>
          <n-button secondary @click="handleDoc">
            <template #icon>
              <n-icon size="18">
                <HelpOutlineIcon />
              </n-icon>
            </template>
          </n-button>
        </template>
        <n-text>
          {{ $t('global.help') }}
        </n-text>
      </n-tooltip>

      <n-button v-else secondary @click="handleDoc">
        <template #icon>
          <n-icon size="18">
            <HelpOutlineIcon />
          </n-icon>
        </template>
        <n-text>{{ $t('global.help') }}</n-text>
      </n-button>

      <n-tooltip v-if="collapsed" placement="right" trigger="hover">
        <template #trigger>
          <n-button secondary @click="handleDoc">
            <template #icon>
              <n-icon size="18">
                <CodeSlashIcon />
              </n-icon>
            </template>
          </n-button>
        </template>
        <n-text>
          {{ $t('global.code_addr') }}
        </n-text>
      </n-tooltip>

      <n-button v-else secondary @click="handleCode">
        <template #icon>
          <n-icon size="18">
            <CodeSlashIcon />
          </n-icon>
        </template>
        <n-text v-show="!collapsed">{{ $t('global.code_addr') }}</n-text>
      </n-button>
    </n-space>
  </div>
</template>
<script setup lang="ts">
import { openDoc, openGiteeSourceCode } from '@/utils'

import { icon } from '@/plugins'
const { HelpOutlineIcon, CodeSlashIcon } = icon.ionicons5

const props = defineProps({
  collapsed: Boolean
})

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
