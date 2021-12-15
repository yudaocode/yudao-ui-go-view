import { useDesignStore } from '@/store/modules/designStore/designStore'
import { theme as themeEnum } from '@/settings/designSetting'

export const setHtmlTheme = (themeName?: string) => {
  const e = window.document.documentElement
  if (themeName) {
    e.setAttribute("data-theme", themeName);
    return
  }
  const designStore = useDesignStore()
  e.setAttribute("data-theme", designStore.getDarkTheme ? themeEnum.darkThemeName : themeEnum.lightThemeName);
}