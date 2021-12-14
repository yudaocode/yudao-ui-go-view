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
export const renderIcon = (icon: any) => {
  return () => h(NIcon, null, { default: () => h(icon) });
}


