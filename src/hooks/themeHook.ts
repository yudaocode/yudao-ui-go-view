import { computed } from 'vue'
import { darkTheme, GlobalThemeOverrides } from 'naive-ui'
import { useDesignStore } from '@/store/modules/designStore/designStore'
import { borderRadius } from '@/settings/designSetting'

/**
 * 设置全局主题
 */
export const getThemeOverridesHook = () => {
  const designStore = useDesignStore()
  const getDarkTheme = computed(
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
  return getDarkTheme
}

// 返回暗黑主题
export const getDarkThemeHook = () => {
  const designStore = useDesignStore()
  return computed(() => (designStore.getDarkTheme ? darkTheme : undefined))
}
