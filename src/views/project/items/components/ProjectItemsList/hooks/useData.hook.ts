import { ref, reactive } from 'vue';
import { goDialog } from '@/utils'
import { DialogEnum } from '@/enums/pluginEnum'
import { projectListApi } from '@/api/path/project'
import { ChartList } from '../../../index.d'

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
    try {
      const res: any = await projectListApi({
        page: paginat.page,
        limit: paginat.limit
      })
      if (res.data) {
        const { count } = res
        paginat.count = count
        list.value = res.data.map((e:any) => {
          const {id, projectName, state, createTime, createUserId} = e
          return {
            id: id,
            title: projectName,
            createId: createUserId,
            time: createTime,
            release: state !== -1
          }
        })
      }
    } catch (error) {
      window['$message'].error(window['$t']('http.error_message'))
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
  const deleteHandle = (cardData: object, index: number) => {
    goDialog({
      type: DialogEnum.DELETE,
      promise: true,
      onPositiveCallback: () =>
        new Promise(res => setTimeout(() => res(1), 1000)),
      promiseResCallback: (e: any) => {
        window['$message'].success('删除成功')
        list.value.splice(index, 1)
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
