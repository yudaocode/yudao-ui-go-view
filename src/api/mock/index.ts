import test from './test.mock'
import { MockMethod } from 'vite-plugin-mock'
import { RequestHttpEnum } from '@/enums/httpEnum'

// 单个X数据
export const chartDataUrl = '/mock/chartData'
export const rankListUrl = '/mock/rankList'
export const numberFloatUrl = '/mock/number/float'
export const numberIntUrl = '/mock/number/int'
export const textUrl = '/mock/text'

const mockObject: MockMethod[] = [
  {
    // 正则
    // url: /\/mock\/mockData(|\?\S*)$/,
    url: chartDataUrl,
    method: RequestHttpEnum.GET,
    response: () => test.fetchMockData,
  },
  {
    url: rankListUrl,
    method: RequestHttpEnum.GET,
    response: () => test.fetchRankList,
  },
  {
    url: numberFloatUrl,
    method: RequestHttpEnum.GET,
    response: () => test.fetchNumberFloat,
  },
  {
    url: numberIntUrl,
    method: RequestHttpEnum.GET,
    response: () => test.fetchNumberInt,
  },
  {
    url: textUrl,
    method: RequestHttpEnum.GET,
    response: () => test.fetchText,
  },
]

export default mockObject
