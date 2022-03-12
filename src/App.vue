<template>
  <n-config-provider
    :locale="zhCN"
    :theme="getDarkTheme"
    :date-locale="dateZhCN"
    :theme-overrides="getThemeOverrides"
  >
    <AppProvider>
      <I18n />
      <router-view />
    </AppProvider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { zhCN, dateZhCN, NConfigProvider } from 'naive-ui'
import { AppProvider } from '@/components/AppProvider'
import { I18n } from '@/components/I18n'

import { getDarkThemeHook, getThemeOverridesHook } from '@/hooks'

// 返回暗黑主题
const getDarkTheme = getDarkThemeHook()

// 主题配置
const getThemeOverrides = getThemeOverridesHook()
</script>

<style lang="scss"></style>
