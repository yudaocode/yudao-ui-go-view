import { isMac, addEventListener, removeEventListener } from '@/utils'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { MenuEnum } from '@/views/chart/hooks/useContextMenu.hook'

const chartEditStore = useChartEditStore()


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
  // if (key === keyboardValue.delete) {
  //   chartEditStore.removeComponentList()
  //   return
  // }
  
  // 前进
  if (e.altKey && e.shiftKey && key == keyboardValue.back) {
    chartEditStore.setForward()
    return
  }

  if (e.altKey) {
    switch (key) {
      // 删除
      case keyboardValue.delete: chartEditStore.removeComponentList()
        break;
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
