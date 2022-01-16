import TextCloud from './index.vue'
import image from '@/assets/images/chart/informations/words_cloud.png'
import { ConfigType } from '@/packages/index.d'
import { ChatCategoryEnum } from '../../index.d'

export const TextCloudConfig: ConfigType = {
  key: 'VTextCloud',
  title: '词云',
  category: ChatCategoryEnum.MORE,
  node: TextCloud,
  image
}
