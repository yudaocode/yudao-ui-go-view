import { h, unref } from 'vue';
import { NIcon, NTag } from 'naive-ui';
import type { App, Plugin } from 'vue';

/**
 * 生成一个用不重复的ID
 * @param { Number } randomLength
 */
function getUUID(randomLength: number) {
  return Number(
    Math.random()
      .toString()
      .substr(2, randomLength) + Date.now()
  ).toString(36);
}


/**
 * render new Tag
 * */
 const newTagColors = { color: '#f90', textColor: '#fff', borderColor: '#f90' };
 export function renderNew(type = 'warning', text = 'New', color: object = newTagColors) {
   return () =>
     h(
       NTag as any,
       {
         type,
         round: true,
         size: 'small',
         color,
       },
       { default: () => text }
     );
 }

/**
 * render 图标
 * */
export function renderIcon(icon: any) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

export { getUUID };
