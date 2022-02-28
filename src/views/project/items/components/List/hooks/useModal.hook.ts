import { ref, Ref } from 'vue'
import { ChartEnum } from '@/enums/pageEnum'
import { fetchPathByName, routerTurnByPath } from '@/utils'
export const useModalDataInit = () => {
  const modalShow = ref<boolean>(false)
  // TODO 补充 modalData 类型格式
  const modalData = ref<object | null>(null)

  // 关闭 modal
  const closeModal = () => {
    modalShow.value = false
    modalData.value = null
  }

  // 打开 modal
  const resizeHandle = (cardData: Ref<object | null>) => {
    modalShow.value = true
    modalData.value = cardData
  }

  // 打开 modal
  const editHandle = (cardData: Ref<object | null>) => {
    const path = fetchPathByName(ChartEnum.CHART_HOME_NAME, 'href')
    routerTurnByPath(path, [(<any>cardData).id], undefined, true)
  }

  return {
    modalData,
    modalShow,
    closeModal,
    resizeHandle,
    editHandle
  }
}
