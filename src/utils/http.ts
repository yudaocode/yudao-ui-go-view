/**
 * * 请求失败统一处理
 */
export const httpErrorHandle = () => {
  window['$message'].error('请求失败，请稍后重试！')
}