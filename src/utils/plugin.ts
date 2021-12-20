import { icon } from '@/plugins'
import { dialogIconSize, maskClosable } from '@/settings/designSetting'
const { InformationCircleIcon } = icon.ionicons5
import { renderIcon } from '@/utils'

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
  const instance = dialogFn({
    title: '提示',
    icon: renderIcon(InformationCircleIcon, { size: dialogIconSize }),
    content: message || tip[type] || '',
    positiveText: '确定',
    negativeText: '取消',
    maskClosable: maskClosable,
    onPositiveClick: () => {
      onPositiveCallback && onPositiveCallback(instance)
    },
    onNegativeClick: () => {
      onNegativeCallback && onNegativeCallback(instance)
    }
  })
}