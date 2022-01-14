import BorderCommon from './index.vue'
import barImg from '@/assets/images/chart/bar_y.png'
import { ConfigType } from '@/packages/index.d'

// 柱状图
export const barCommonConfig: ConfigType = {
  key: 'Border',
  title: '柱状图',
  node: BorderCommon,
  coverGraph: barImg
}
