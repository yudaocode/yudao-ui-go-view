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
export const renderIcon = (icon: any) => {
  return () => h(NIcon, null, { default: () => h(icon) })
}

/**
 * * render 弹出确认框
 * @param { Function } dialogFn dialog函数，暂时必须从页面传过来
 * @param { Object} params 配置参数
 */
export const goDialog = (
  dialogFn: Function,
  params: {
    // 基本
    type: 'delete'
    message?: string
    onPositiveCallback?: Function
    onNegativeCallback?: Function
    // 渲染函数
    render?: boolean
    contentFn?: Function
    actionFn?: Function
  }
) => {
  const { type, message, onPositiveCallback, onNegativeCallback } = params
  const tip = {
    delete: '是否删除此数据'
  }
  dialogFn({
    title: '提示',
    content: message || tip[type] || '',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      onPositiveCallback && onPositiveCallback()
    },
    onNegativeClick: () => {
      onNegativeCallback && onNegativeCallback()
    }
  })
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
