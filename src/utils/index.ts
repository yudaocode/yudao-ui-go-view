import { h, DefineComponent } from 'vue'
import { NIcon } from 'naive-ui'

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
export const renderIcon = (icon: any) => {
  return () => h(NIcon, null, { default: () => h(icon) })
}

/**
 * * 处理 vite 中无法使用 require 的问题
 * @param name
 * @returns url
 */
export const requireUrl = (path: string, name: string) => {
  return new URL(`${path}/${name}`, import.meta.url).href
}

/**
 * * 存储本地会话数据
 * @param k 键名
 * @param v 键值
 * @returns RemovableRef
 */
export const setLocalStorage = <T>(k: string, v: T) => {
  try {
    window.localStorage.setItem(k, JSON.stringify(v))
  } catch (error) {
    return false
  }
}

/**
 * * 获取本地会话数据
 * @returns any
 */
export const getLocalStorage: (k: string) => any = (k: string) => {
  const item = window.localStorage.getItem(k)
  try {
    return item ? JSON.parse(item) : item
  } catch (err) {
    return item
  }
}

/**
 * * 存储临时会话数据
 * @param k 键名
 * @param v 键值
 * @returns RemovableRef
 */
export const setSessionStorage = <T>(k: string, v: T) => {
  try {
    window.sessionStorage.setItem(k, JSON.stringify(v))
  } catch (error) {
    return false
  }
}

/**
 * * 获取临时会话数据
 * @returns any
 */
export const getSessionStorage: (k: string) => any = (k: string) => {
  const item = window.sessionStorage.getItem(k)
  try {
    return item ? JSON.parse(item) : item
  } catch (err) {
    return item
  }
}
