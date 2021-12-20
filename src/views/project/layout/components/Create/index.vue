<template>
  <n-tooltip v-if="collapsed" placement="right" trigger="hover">
    <template #trigger>
      <n-button ghost type="primary" size="small">
        <template #icon>
          <n-icon>
            <DuplicateOutlineIcon v-show="designStore.getDarkTheme" />
            <DuplicateIcon v-show="!designStore.getDarkTheme" />
          </n-icon>
        </template>
      </n-button>
    </template>
    <span>
      新建
    </span>
  </n-tooltip>
  <n-button v-else ghost type="primary" size="large">
    <template #icon>
      <n-icon>
        <DuplicateOutlineIcon v-show="designStore.getDarkTheme" />
        <DuplicateIcon v-show="!designStore.getDarkTheme" />
      </n-icon>
    </template>
    <span>
      新建
    </span>
  </n-button>
</template>
<script setup lang="ts">
import { icon } from '@/plugins'
import { computed } from 'node_modules/vue/dist/vue'
import { useDesignStore } from '@/store/modules/designStore/designStore'

const { DuplicateIcon, DuplicateOutlineIcon } = icon.ionicons5
const designStore = useDesignStore()

const props = defineProps({
  collapsed: Boolean
})
</script>
