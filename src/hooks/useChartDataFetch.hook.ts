import { ref, toRefs } from 'vue'
import type VChart from 'vue-echarts'
import { http } from '@/api/http'
import { CreateComponentType, ChartFrameEnum } from '@/packages/index.d'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { RequestDataTypeEnum } from '@/enums/httpEnum'
import { isPreview } from '@/utils'

// 获取类型
type ChartEditStoreType = typeof useChartEditStore

/**
 * setdata 数据监听与更改
 * @param targetComponent
 * @param useChartEditStore 若直接引会报错，只能动态传递
 * @param updateCallback 自定义更新函数
 */
export const useChartDataFetch = (
  targetComponent: CreateComponentType,
  useChartEditStore: ChartEditStoreType,
  updateCallback?: (...args: any) => any
) => {
  const vChartRef = ref<typeof VChart | null>(null)
  let fetchInterval: any = 0

  const requestInterval = () => {
    const chartEditStore = useChartEditStore()
    const { requestOriginUrl, requestInterval } = toRefs(
      chartEditStore.getRequestGlobalConfig
    )
    // 组件类型
    const { chartFrame } = targetComponent.chartConfig
    // 请求配置
    const { requestDataType, requestHttpType, requestUrl } = toRefs(
      targetComponent.data
    )
    // 非请求类型
    if (requestDataType.value !== RequestDataTypeEnum.AJAX) return
    // 处理地址
    if (requestUrl?.value && requestInterval.value > 0) {
      // requestOriginUrl 允许为空
      const completePath =
        requestOriginUrl && requestOriginUrl.value + requestUrl.value
      if (!completePath) return

      const fetchFn = async () => {
        const res: any = await http(requestHttpType.value)(completePath || '', {})
        if (res.data) {
          try {
            // echarts 组件更新方式
            if (chartFrame === ChartFrameEnum.ECHARTS) {
              if (vChartRef.value) {
                vChartRef.value.setOption({ dataset: res.data })
              }
            } else {
              // 若遵守规范使用 dataset 作为数据 key，则会自动赋值数据
              targetComponent.option.dataset && (targetComponent.option.dataset = res.data)
            }
            // 更新回调函数
            if (updateCallback) {
              updateCallback(res.data)
            }
          } catch (error) {
            console.error(error)
          }
        }
      }
      
      // 立即调用
      fetchFn()
      // 开启定时
      setInterval(fetchFn, requestInterval.value * 1000)
    }
  }

  isPreview() && requestInterval()
     

  return { vChartRef }
}
