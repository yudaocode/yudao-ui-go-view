<template>
  <n-config-provider
    :locale="zhCN"
    :theme="getDarkTheme"
    :theme-overrides="getThemeOverrides"
    :date-locale="dateZhCN"
  >
    <app-provider>
      <router-view />
    </app-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import {
  zhCN,
  dateZhCN,
  darkTheme,
  NConfigProvider,
  GlobalThemeOverrides,
} from 'naive-ui'
import { AppProvider } from '@/components/Application'
import { useDesignStore } from '@/store/modules/designStore/designStore'
import { borderRadius } from '@/settings/designSetting'

const designStore = useDesignStore()

const getThemeOverrides = computed(
  (): GlobalThemeOverrides => {
    return {
      common: {
        primaryColor: designStore.appTheme,
        borderRadius
      },
      LoadingBar: {
        colorLoading: designStore.appTheme
      }
    }
  }
)
const getDarkTheme = computed(() =>
  designStore.getDarkTheme ? darkTheme : undefined
)
</script>

<style lang="scss"></style>
