import { isMac, addEventListener, removeEventListener } from '@/utils'
import { getChartEditStore } from '../ContentEdit/hooks/useStore.hook'
import { MenuEnum } from '@/views/chart/hooks/useContextMenu.hook'

const chartEditStore = getChartEditStore()


export const keyboardValue = {
  [MenuEnum.COPY]: 'c',
  [MenuEnum.CUT]: 'x',
  [MenuEnum.PARSE]: 'v',
  [MenuEnum.DELETE]: 'delete',
  back: 'z',
}

const KeyboardHandle = (e: KeyboardEvent) => {
  const isMacRes = isMac()

  // 暂不支持mac，因为我没有😤👻
  if (isMacRes) return
  const key = e.key.toLowerCase()

  // 删除
  if (key === keyboardValue.delete) {
    chartEditStore.removeComponentList()
    return
  }
  
  // 前进
  if (e.ctrlKey && e.shiftKey && key == keyboardValue.back) {
    chartEditStore.setForward()
    return
  }

  if (e.ctrlKey) {
    switch (key) {
      // 复制
      case keyboardValue.copy: chartEditStore.setCopy()
        break;
      // 剪切
      case keyboardValue.cut: chartEditStore.setCut()
        break;
      // 粘贴
      case keyboardValue.parse: chartEditStore.setParse()
        break;
      // 撤回
      case keyboardValue.back: chartEditStore.setBack()
        break;
    }
    e.preventDefault()
  }
}

export const useAddKeyboard = () => {
  addEventListener(document, 'keyup', KeyboardHandle)
}

export const useRemoveKeyboard = () => {
  removeEventListener(document, 'keyup', KeyboardHandle)
}
