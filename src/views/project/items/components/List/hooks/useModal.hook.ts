import { ref, Ref } from 'vue'

export const useModalDataInit = () => {
  const modalShow = ref<boolean>(false)
  const modalData = ref<object | unknown>(null)

  // 关闭 modal
  const closeModal = () => {
    modalShow.value = false
    modalData.value = null
    console.log('close')
  }

  // 打开 modal
  const resizeHandle = (cardData: Ref<object | unknown>) => {
    console.log(cardData)
    modalShow.value = true
    modalData.value = cardData
  }

  return {
    modalData,
    modalShow,
    closeModal,
    resizeHandle
  }
}
