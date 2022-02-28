import { ref, Ref } from 'vue'
import { goDialog } from '@/utils'
import { DialogEnum } from '@/enums/pluginEnum'

// 数据初始化
export const useDataListInit = () => {
  const list = ref<{id: number, title:string, release: boolean}[]>([
    {
      id: 1,
      title: '物料1',
      release: true
    },
    {
      id: 2,
      title: '物料2',
      release: false
    },
    {
      id: 3,
      title: '物料3',
      release: false
    },
    {
      id: 4,
      title: '物料4',
      release: false
    },
    {
      id: 5,
      title: '物料5',
      release: false
    }
  ])

  // 删除
  const deleteHandle = (cardData: object, index: number) => {
    goDialog({
      type: DialogEnum.delete,
      promise: true,
      onPositiveCallback: () =>
        new Promise(res => setTimeout(() => res(1), 1000)),
      promiseResCallback: (e: any) => {
        window.$message.success('删除成功')
        list.value.splice(index, 1)
      }
    })
  }

  return {
    list,
    deleteHandle
  }
}
