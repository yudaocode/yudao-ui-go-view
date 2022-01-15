import Image from './index.vue'
import image from '@/assets/images/chart/informations/photo.png'
import { ConfigType } from '@/packages/index.d'
import { ChatCategoryEnum } from '../../index.d'

export const ImageConfig: ConfigType = {
  key: 'Image',
  title: '图片',
  category: ChatCategoryEnum.MORE,
  node: Image,
  image
}
