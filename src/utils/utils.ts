import { h } from 'vue'
import { NIcon } from 'naive-ui'
import screenfull from 'screenfull'

/**
 * * 生成一个用不重复的ID
 * @param { Number } randomLength
 */
export function getUUID(randomLength: number) {
  return Number(
    Math.random().toString().substr(2, randomLength) + Date.now()
  ).toString(36)
}

/**
 * * render 图标
 */
export const renderIcon = (icon: any, set = {}) => {
  return () => h(NIcon, set, { default: () => h(icon) })
}

/**
 * * 处理 vite 中无法使用 require 的问题
 * @param name
 * @returns url
 */
export const requireUrl = (path: string, name: string) => {
  return new URL(`${path}/${name}`, import.meta.url).href
}

export const screenfullFn = (isFullscreen?: boolean, isEnabled?: boolean) => {
  // 是否是全屏
  if (isFullscreen) return screenfull.isFullscreen

  // 是否支持全屏
  if (isEnabled) return screenfull.isEnabled

  if (screenfull.isEnabled) {
    screenfull.toggle()
    return
  }
  // TODO lang
  window['$message'].warning('您的浏览器不支持全屏功能！')
}
