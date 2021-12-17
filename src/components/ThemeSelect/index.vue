<template>
  <n-button quaternary @click="changeTheme">
    <n-icon size="20" :depth="1">
      <MoonIcon v-if="designStore.darkTheme" />
      <SunnyIcon v-else />
    </n-icon>
  </n-button>
</template>

<script lang="ts" setup>
import { useDesignStore } from '@/store/modules/designStore/designStore'
import { setHtmlTheme } from '@/utils/style'
import { Moon as MoonIcon, Sunny as SunnyIcon } from '@vicons/ionicons5'

const designStore = useDesignStore()

// 改变样式
const changeTheme = () => {
  designStore.changeTheme()
  setHtmlTheme()
}
</script>
