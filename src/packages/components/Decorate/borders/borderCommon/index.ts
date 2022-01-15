import BorderCommon from './index.vue'
import image from '@/assets/images/chart/decorates/border.png'
import { ConfigType } from '@/packages/index.d'
import { ChatCategoryEnum } from '../../index.d'

export const BorderCommonConfig: ConfigType = {
  key: 'BorderCommon',
  title: '边框',
  category: ChatCategoryEnum.Border,
  node: BorderCommon,
  image
}
