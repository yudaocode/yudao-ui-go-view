<template>
  <n-config-provider
    :locale="zhCN"
    :theme="darkTheme"
    :hljs="hljsTheme"
    :date-locale="dateZhCN"
    :theme-overrides="overridesTheme"
  >
    <app-provider>
      <I18n></I18n>
      <router-view></router-view>
    </app-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { zhCN, dateZhCN, NConfigProvider } from 'naive-ui'
import { AppProvider } from '@/components/AppProvider'
import { I18n } from '@/components/I18n'

import { useDarkThemeHook, useThemeOverridesHook, useHook } from '@/hooks'

// 暗黑主题
const darkTheme = useDarkThemeHook()

// 主题配置
const overridesTheme = useThemeOverridesHook()

// 代码主题
const hljsTheme = useHook()
</script>
