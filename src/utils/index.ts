import { h } from 'vue';
import { NIcon } from 'naive-ui';
import { ResultEnum } from "@/enums/httpEnum"
import { ErrorPageNameMap } from "@/enums/pageEnum"
import router from '@/router';

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

/**
 * * 错误页重定向
 * @param icon 
 * @returns 
 */
export const redirectErrorPage = (code: ResultEnum) => {
  router.push({
    name: ErrorPageNameMap.get(code)
  })
}

