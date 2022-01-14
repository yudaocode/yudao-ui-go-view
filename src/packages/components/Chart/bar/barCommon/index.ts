import barCommon from './index.vue'
import barImg from '@/assets/images/chart/bar_y.png'
import { ConfigType } from '@/packages/index.d'

// 柱状图
export const barCommonConfig: ConfigType = {
  key: 'Bar',
  title: '基础',
  node: barCommon,
  image: barImg
}
