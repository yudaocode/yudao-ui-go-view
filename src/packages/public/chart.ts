/**
 * * ECharts option 统一前置处理
 * @param option
 */
export const echartOptionProfixHandle = (option: any) => {
  option['backgroundColor'] = 'rgba(0,0,0,0)'
  return option
}
