import merge from 'lodash/merge'
import pick from 'lodash/pick'

/**
 * * ECharts option 统一前置处理
 * @param option
 */
export const echartOptionProfixHandle = (option: any) => {
  option['backgroundColor'] = 'rgba(0,0,0,0)'
  return option
}

/**
 * * 合并 color 和全局配置项
 * @param option 配置
 * @param themeSetting 设置
 * @param excludes 排除元素
 * @returns object
 */
export const mergeTheme = <T, U, E extends keyof U> (
  option: T,
  themeSetting: U,
  includes: E[] = []
) => {
  return merge({}, pick(themeSetting, includes), option)
}
