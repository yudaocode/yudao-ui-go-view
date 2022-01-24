import { h } from 'vue'
import { NIcon } from 'naive-ui'
import screenfull from 'screenfull'
import debounce from 'lodash/debounce'

/**
 * * 生成一个不重复的ID
 * @param { Number } randomLength
 */
export function getUUID(randomLength: number = 10) {
  return Number(
    Math.random().toString().substr(2, randomLength) + Date.now()
  ).toString(36)
}

/**
 * * render 图标
 *  @param icon 图标
 *  @param set 设置项
 */
export const renderIcon = (icon: any, set = {}) => {
  return () => h(NIcon, set, { default: () => h(icon) })
}
/**
 * * render 语言
 *  @param lang 语言标识
 *  @param set 设置项
 *  @param tag 要渲染成的标签
 */
export const renderLang = (lang: string, set = {}, tag = 'span') => {
  return () => h(tag, set, { default: () => window['$t'](lang) })
}

/**
 * * 处理 vite 中无法使用 require 的问题，utils 文件为根路径
 * @param path
 * @param name
 * @returns url
 */
export const requireUrl = (path: string, name: string) => {
  return new URL(`${path}/${name}`, import.meta.url).href
}

/**
 * * 获取错误处理图片，默认 404 图
 * @param path
 * @param name
 * @returns url
 */
export const requireFallbackImg = (path?: string, name?: string) => {
  const url = path && name
  return new URL(
    url ? `${path}/${name}` : '../assets/images/exception/image-404.png',
    import.meta.url
  ).href
}

/**
 * * 全屏操作函数
 * @param isFullscreen
 * @param isEnabled
 * @returns
 */
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

/**
 * * 设置元素属性
 * @param HTMLElement 元素 
 * @param key 键名
 * @param value 键值
 */
export const setDomAttribute = <K extends keyof CSSStyleDeclaration, V extends CSSStyleDeclaration[K]>(
  HTMLElement: HTMLElement,
  key: K,
  value: V
) => {
  if (HTMLElement) {
    HTMLElement.style[key] = value
  }
}

/**
 * * 挂载监听
 */
export const goAddEventListener = <K extends keyof WindowEventMap>(
  target: EventTarget,
  type: K,
  listener: any,
  options?: boolean | AddEventListenerOptions | undefined
) => {
  if (!target) return
  target.addEventListener(
    type,
    debounce(listener, 300, {
      leading: true,
      trailing: false
    }),
    options
  )
}

/**
 * * 卸载监听
 */
export const goRemoveEventListener = <K extends keyof WindowEventMap>(
  target: EventTarget,
  type: K,
  listener: EventListenerOrEventListenerObject
) => {
  if (!target) return
  target.removeEventListener(type, listener)
}
