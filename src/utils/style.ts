import { useDesignStore } from '@/store/modules/designStore/designStore'

/**
 * * 修改主题色
 * @param themeName 主题名称
 * @returns 
 */
export const setHtmlTheme = (themeName?: string) => {
  const e = window.document.documentElement
  if (themeName) {
    e.setAttribute('data-theme', themeName)
    return
  }
  const designStore = useDesignStore()
  e.setAttribute('data-theme', designStore.themeName)
}
