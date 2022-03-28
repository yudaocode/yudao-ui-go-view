import { ref, toRefs, watchEffect, nextTick } from 'vue'
import type VChart from 'vue-echarts'
import { http } from '@/api/http'
import { CreateComponentType } from '@/packages/index.d'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { RequestDataTypeEnum } from '@/enums/httpEnum'
import { isPreview } from '@/utils'

type ChartEditStoreType = typeof useChartEditStore

/**
 * 图表针对 setdata 数据监听与更改
 * @param chartConfig
 */
export const useChartDataFetch = (chartConfig: CreateComponentType, useChartEditStore: ChartEditStoreType) => {
  const vChartRef = ref<typeof VChart | null>(null)
  let fetchInterval: any = 0

  isPreview() && watchEffect(() => {
    clearInterval(fetchInterval)

    const chartEditStore = useChartEditStore()
    const { requestOriginUrl, requestInterval } = toRefs(
      chartEditStore.getRequestGlobalConfig
    )
    const { requestDataType, requestHttpType, requestUrl } = toRefs(
      chartConfig.data
    )
    if (requestDataType.value !== RequestDataTypeEnum.AJAX) return
    // 处理地址
    if (requestUrl?.value && requestInterval.value > 0) {
      // requestOriginUrl 允许为空
      const completePath =
        requestOriginUrl && requestOriginUrl.value + requestUrl.value
      if (!completePath) return

      fetchInterval = setInterval(async () => {
        const res = await http(requestHttpType.value)(completePath || '', {})
        if (res.data) {
          nextTick(() => {
            if(vChartRef.value) {
              vChartRef.value.setOption({dataset: res.data})
            }
          })
        }
      }, requestInterval.value * 1000)
    }
  })

  return { vChartRef }
}
