import test from './test.mock'
import { MockMethod } from 'vite-plugin-mock'
import { RequestHttpEnum } from '@/enums/httpEnum'

// 单个X数据
export const mockDataUrl = '/mock/mockData'

const mockObject: MockMethod[] =[{
  // 正则
  // url: /\/mock\/mockData(|\?\S*)$/,
  url: '/mock/mockData',
  method: RequestHttpEnum.GET,
  response: () => test.featchMockData
}]

export default mockObject