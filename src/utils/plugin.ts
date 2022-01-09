import { icon } from '@/plugins'
import { DialogEnum } from '@/enums/pluginEnum'
import { dialogIconSize, maskClosable } from '@/settings/designSetting'
import { DialogReactive } from 'naive-ui'
const { InformationCircleIcon } = icon.ionicons5
import { renderIcon } from '@/utils'

/**
 * * render 对话框
 * @param { Object} params 配置参数
 * @param { Function } dialogFn 函数
 */
export const goDialog = (
  params: {
    // 基本
    type?: DialogEnum
    message?: string
    // 回调
    onPositiveCallback: Function
    onNegativeCallback?: Function
    // 异步
    promise?: boolean
    promiseResCallback?: Function
    promiseRejCallback?: Function
  },
  dialogFn?: Function
) => {
  const {
    type,
    message,
    onPositiveCallback,
    onNegativeCallback,
    promise,
    promiseResCallback,
    promiseRejCallback
  } = params

  const typeObj = {
    // 自定义
    delete: {
      fn: dialogFn || window['$dialog'].warning,
      message: message || '是否删除此数据?'
    },
    // 原有
    warning: {
      fn: window['$dialog'].warning,
      message: message || '是否执行此操作?'
    },
    error: {
      fn: window['$dialog'].error,
      message: message || '是否执行此操作?'
    },
    success: {
      fn: window['$dialog'].success,
      message: message || '是否执行此操作?'
    }
  }

  const d: DialogReactive = (typeObj as any)[type || DialogEnum.warning]['fn']({
    title: '提示',
    icon: renderIcon(InformationCircleIcon, { size: dialogIconSize }),
    content: (typeObj as any)[type || DialogEnum.warning]['message'],
    positiveText: '确定',
    negativeText: '取消',
    // 是否通过遮罩关闭
    maskClosable: maskClosable,
    onPositiveClick: async () => {
      // 执行异步
      if (promise && onPositiveCallback) {
        d.loading = true
        try {
          const res = await onPositiveCallback()
          promiseResCallback && promiseResCallback(res)
        } catch (err) {
          promiseRejCallback && promiseRejCallback(err)
        }
        d.loading = false
        return
      }
      onPositiveCallback && onPositiveCallback(d)
    },
    onNegativeClick: async () => {
      onNegativeCallback && onNegativeCallback(d)
    }
  })
}
