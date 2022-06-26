export default {
  // 图表
  fetchMockData: {
    code: 0,
    status: 200,
    msg: '请求成功',
    data: {
      dimensions: ['product', 'dataOne', 'dataTwo'],
      source: [
        {
          product: '@name',
          'dataOne|100-900': 3,
          'dataTwo|100-900': 3,
        },
        {
          product: '@name',
          'dataOne|100-900': 3,
          'dataTwo|100-900': 3,
        },
        {
          product: '@name',
          'dataOne|100-900': 3,
          'dataTwo|100-900': 3,
        },
        {
          product: '@name',
          'dataOne|100-900': 3,
          'dataTwo|100-900': 3,
        },
        {
          product: '@name',
          'dataOne|100-900': 3,
          'dataTwo|100-900': 3,
        },
        {
          product: '@name',
          'dataOne|100-900': 3,
          'dataTwo|100-900': 3,
        },
      ],
    },
  },
  // 排名列表
  fetchRankList: {
    code: 0,
    status: 200,
    msg: '请求成功',
    data: [
      { name: '@name', 'value|100-900': 5 },
      { name: '@name', 'value|100-900': 5 },
      { name: '@name', 'value|100-900': 5 },
      { name: '@name', 'value|100-900': 5 },
      { name: '@name', 'value|100-900': 5 },
      { name: '@name', 'value|100-900': 5 },
      { name: '@name', 'value|100-900': 5 },
      { name: '@name', 'value|100-900': 5 },
      { name: '@name', 'value|100-900': 5 },
      { name: '@name', 'value|100-900': 5 },
      { name: '@name', 'value|100-900': 5 },
      { name: '@name', 'value|100-900': 5 },
      { name: '@name', 'value|100-900': 5 },
    ],
  },
  // 获取数字
  fetchNumberFloat: {
    code: 0,
    status: 200,
    msg: '请求成功',
    data: '@float(0, 0.99, 1, 2)',
  },
  fetchNumberInt: {
    code: 0,
    status: 200,
    msg: '请求成功',
    data: '@integer(0, 100)',
  },
  fetchText: {
    code: 0,
    status: 200,
    msg: '请求成功',
    data: '@paragraph(1, 10)',
  },
  fetchImage: {
    code: 0,
    status: 200,
    msg: '请求成功',
    data: `https://robohash.org/${Math.round(Math.random()*10)}`,
  },
}
