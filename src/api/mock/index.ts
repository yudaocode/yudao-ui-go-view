import test from './test.mock'
import { MockMethod } from 'vite-plugin-mock'
import { RequestHttpEnum } from '@/enums/httpEnum'

// 单个X数据
export const chartDataUrl = '/mock/chartData'
export const rankListUrl = '/mock/RankList'

const mockObject: MockMethod[] = [
  {
    // 正则
    // url: /\/mock\/mockData(|\?\S*)$/,
    url: '/mock/chartData',
    method: RequestHttpEnum.GET,
    response: () => test.fetchMockData,
  },
  {
    url: '/mock/rankList',
    method: RequestHttpEnum.GET,
    response: () => test.fetchRankList,
  },
]

export default mockObject
