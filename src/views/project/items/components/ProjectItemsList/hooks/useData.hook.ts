import { ref, reactive } from 'vue';
import { goDialog, httpErrorHandle } from '@/utils'
import { DialogEnum } from '@/enums/pluginEnum'
import { projectListApi, deleteProjectApi } from '@/api/path/project'
import { Chartype, ChartList } from '../../../index.d'
import { ResultEnum } from '@/enums/httpEnum'

// 数据初始化
export const useDataListInit = () => {

  const paginat = reactive({
    // 当前页数
    page: 1,
    // 每页值
    limit: 12,
    // 总数
    count: 10,
  })

  const list = ref<ChartList>([])

  // 数据请求
  const fetchList = async () => {
    const res: any = await projectListApi({
      page: paginat.page,
      limit: paginat.limit
    })
    if (res.data) {
      const { count } = res
      paginat.count = count
      list.value = res.data.map((e: any) => {
        const { id, projectName, state, createTime, createUserId } = e
        return {
          id: id,
          title: projectName,
          createId: createUserId,
          time: createTime,
          release: state !== -1
        }
      })
    }

  }

  // 修改页数
  const changePage = (_page: number) => {
    paginat.page = _page
    fetchList()
  }

  // 修改大小
  const changeSize = (_size: number) => {
    paginat.limit = _size
    fetchList()
  }

  // 删除
  const deleteHandle = (cardData: Chartype, index: number) => {
    goDialog({
      type: DialogEnum.DELETE,
      promise: true,
      onPositiveCallback: () => new Promise(res => {
        res(deleteProjectApi({
          ids: cardData.id
        }))
      }),
      promiseResCallback: (res: any) => {
        if (res.code === ResultEnum.SUCCESS) {
          window['$message'].success('删除成功')
          fetchList()
          return
        }
        httpErrorHandle()
      }
    })
  }

  // 立即请求
  fetchList()

  return {
    paginat,
    list,
    fetchList, changeSize, changePage,
    deleteHandle
  }
}
