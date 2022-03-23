import { toRefs, watchEffect } from 'vue'
import { http } from '@/api/http'
import { CreateComponentType } from '@/packages/index.d'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { RequestDataTypeEnum } from '@/enums/httpEnum'

/**
 * 数据监听与更改
 * @param chartConfig
 */
export const useChartDataFetch = (chartConfig: CreateComponentType) => {
  let fetchInterval = 0

  watchEffect(() => {
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
      const completePath = requestOriginUrl && requestOriginUrl.value + requestUrl.value
      if (!completePath) return

      fetchInterval = setInterval(async () => {
        const res = await http(requestHttpType.value)(completePath || '', {})
        if(res.data) {
          chartConfig.option.dataset = res.data as any
        }
      }, requestInterval.value * 1000)
    }
  })
}
