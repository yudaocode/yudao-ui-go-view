import { h } from 'vue';
import { NIcon } from 'naive-ui';

/**
 * * 生成一个用不重复的ID
 * @param { Number } randomLength
 */
export function getUUID(randomLength: number) {
  return Number(
    Math.random()
      .toString()
      .substr(2, randomLength) + Date.now()
  ).toString(36);
}

/**
 * * render 图标
 */
export const renderIcon = (icon: typeof NIcon) => {
  return () => h(NIcon, null, { default: () => h(icon) });
}

/**
 * * 处理 vite 中无法使用 require 的问题
 * @param name 
 * @returns 
 */
export const requireUrl = (path: string, name: string) => {
  return new URL(`${path}/${name}`, import.meta.url).href
}
