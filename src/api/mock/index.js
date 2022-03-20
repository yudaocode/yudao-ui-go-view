import Mock from 'mockjs'
import test from './test.mock'
Mock.setup({
  timeout: '300-600'
})

// 单个X数据
const featchMockData = '/api/mockData'
Mock.mock(/\/api\/test(|\?\S*)$/, 'get', test.featchMockData)

export {
  featchMockData
}