import { computed, toRefs } from 'vue'
import { darkTheme, GlobalThemeOverrides } from 'naive-ui'
import { useDesignStore } from '@/store/modules/designStore/designStore'
import { borderRadius } from '@/settings/designSetting'
import { toLight } from '@/utils'

/**
 * 设置全局主题
 */
export const getThemeOverridesHook = () => {
  const designStore = useDesignStore()
  const { getAppTheme } = toRefs(designStore)
  const getDarkTheme = computed(
    (): GlobalThemeOverrides => {
      // 通用
      const commonObj = {
        common: {
          primaryColor: getAppTheme.value,
          primaryColorHover: toLight(getAppTheme.value, 6),
          primaryColorPressed: toLight(getAppTheme.value, 6),
          primaryColorSuppl: getAppTheme.value,
          borderRadius
        }
      }
      // 亮色主题
      const lightObject = {
        common: {
          ...commonObj.common
        }
      }
      // 暗色主题
      const dartObject = {
        common: {
          ...commonObj.common
        },
        LoadingBar: {
          colorLoading: getAppTheme.value
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
