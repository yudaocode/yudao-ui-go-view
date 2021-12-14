<template>
  <NConfigProvider
    :locale="zhCN"
    :theme="getDarkTheme"
    :theme-overrides="getThemeOverrides"
    :date-locale="dateZhCN"
  >
    <AppProvider>
      <router-view />
    </AppProvider>
  </NConfigProvider>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { zhCN, dateZhCN, darkTheme, GlobalThemeOverrides } from 'naive-ui'
import { AppProvider } from '@/components/Application'
import { useRoute } from 'vue-router'
import { useDesignStore } from '@/store/modules/designStore/designStore'

const route = useRoute()
const designStore = useDesignStore()

const getThemeOverrides = computed(
  (): GlobalThemeOverrides => {
    return {
      common: {
        primaryColor: designStore.appTheme
      },
      LoadingBar: {
        colorLoading: designStore.appTheme
      }
    }
  }
)

const getDarkTheme = computed(() =>
  designStore.darkTheme ? darkTheme : undefined
)
</script>

<style lang="scss"></style>
