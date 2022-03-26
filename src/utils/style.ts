import { useDesignStore } from '@/store/modules/designStore/designStore'
import Color from 'color'

/**
 * * hsla 转换 
 * @param color 颜色
 * @param alpha 默认1
 * @returns 
 */
export function alpha(color: string, alpha = 1 ) {
  return Color(color).alpha(alpha).toString()
}

/**
 * * 颜色透明
 * rgba(10, 10, 10, 0.8) -> rgba(10, 10, 10, 0.4)
 * @param color 颜色
 * @param concentration 0~1 浓度
 * @returns 
 */
export function fade(color: string, fade: number) {
  return Color(color).fade(fade).toString()
}

/**
 * * 颜色变亮
 * hsl(100, 50%, 10%) -> hsl(100, 50%, 50%)
 * @param color 颜色
 * @param concentration 0~1 浓度
 * @returns 
 */
export function lighten(color: string, concentration: number) {
  return Color(color).lighten(concentration).toString()
}

/**
 * * 颜色变暗
 * hsl(100, 50%, 50%) -> hsl(100, 50%, 25%)
 * @param color 颜色
 * @param concentration 0~1 浓度
 * @returns 
 */
export function darken(color: string, concentration: number) {
  return Color(color).darken(concentration).toString()
}

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