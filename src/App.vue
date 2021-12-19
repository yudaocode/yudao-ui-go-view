<template>
  <n-config-provider
    :locale="zhCN"
    :theme="getDarkTheme"
    :date-locale="dateZhCN"
    :theme-overrides="getThemeOverrides"
  >
    <AppProvider>
      <router-view />
    </AppProvider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import {
  zhCN,
  dateZhCN,
  darkTheme,
  NConfigProvider,
  GlobalThemeOverrides
} from 'naive-ui'
import { AppProvider } from '@/components/Application'
import { useDesignStore } from '@/store/modules/designStore/designStore'
import { borderRadius } from '@/settings/designSetting'

const designStore = useDesignStore()

// 返回暗黑主题
const getDarkTheme = computed(() =>
  designStore.getDarkTheme ? darkTheme : undefined
)

// 主题配置
const getThemeOverrides = computed(
  (): GlobalThemeOverrides => {
    const commonObj = {
      common: {
        borderRadius
      }
    }
    const lightObject = {
      common: {
        ...commonObj.common
      }
    }
    const dartObject = {
      common: {
        primaryColor: designStore.appTheme,
        ...commonObj.common
      },
      LoadingBar: {
        colorLoading: designStore.appTheme
      }
    }
    return designStore.getDarkTheme ? dartObject : lightObject
  }
)
</script>

<style lang="scss"></style>
