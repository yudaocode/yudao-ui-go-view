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

/**
 * * 将通过的百分比与十六进制颜色的R、G或B相加
 * @param {string} color
 * @param {number} amount
 * @returns {string} color
 */
const addLight = (color: string, amount: number): string => {
  const cc = parseInt(color, 16) + amount
  const c = cc > 255 ? 255 : cc
  return c.toString(16).length > 1 ? c.toString(16) : `0${c.toString(16)}`
}

/**
 * * 根据通过的百分比点亮6个字符的十六进制颜色
 * @param {string} color
 * @param {number} amount
 * @returns {string} color
 */
export const toLight = (color: string, amount: number): string => {
  color = color.indexOf('#') >= 0 ? color.substring(1, color.length) : color
  amount = Math.trunc((255 * amount) / 100)
  return `#${addLight(color.substring(0, 2), amount)}${addLight(
    color.substring(2, 4),
    amount
  )}${addLight(color.substring(4, 6), amount)}`
}
