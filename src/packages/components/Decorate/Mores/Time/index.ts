import Time from './index.vue'
import image from '@/assets/images/chart/decorates/time.png'
import { ConfigType } from '@/packages/index.d'
import { ChatCategoryEnum } from '../../index.d'

export const TimeConfig: ConfigType = {
  key: 'Time',
  title: '时间',
  category: ChatCategoryEnum.MORE,
  node: Time,
  image
}
