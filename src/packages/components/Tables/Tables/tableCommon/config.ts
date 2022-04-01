import { publicConfig } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { TableCommonConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export const option = {
  data: dataJson,
  // 表行数
  rowNum: 5,
  // 轮播时间
  waitTime: 2,
  // 数值单位
  unit: '',
  // 自动排序
  sort: true,
  color: '#1370fb',
  textColor: '#ffffff',
  borderColor: '#1370fb80',
  carousel: 'single',
  // 格式化
  valueFormatter({ value }) {
    const reverseNumber = (value + '').split('').reverse()
    let valueStr = ''
    while (reverseNumber.length) {
      const seg = reverseNumber.splice(0, 3).join('')
      valueStr += seg
      if (seg.length === 3) valueStr += ','
    }
    return valueStr.split('').reverse().join('')
  }
}

export default class Config extends publicConfig implements CreateComponentType {
  public key = TableCommonConfig.key
  public chartConfig = cloneDeep(TableCommonConfig)
  public option = option
}
