import { isMac, addEventListener, removeEventListener } from '@/utils'
import { getChartEditStore } from './useStore.hook'

const chartEditStore = getChartEditStore()

const KeyboardHandle = (e: KeyboardEvent) => {
  const ismacRes = isMac()

  // 暂不支持mac，因为我没有😤👻
  if(ismacRes) return
  const key = e.key.toLowerCase()

  if (key === 'delete') {
    chartEditStore.removeComponentList()
    return
  }
  if (e.ctrlKey) {
    switch (key) {
      // 复制
      case 'c': chartEditStore.setCopy()
        break;
      // 粘贴
      case 'v': chartEditStore.setParse()
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
