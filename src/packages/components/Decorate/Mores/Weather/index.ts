import Weather from './index.vue'
import image from '@/assets/images/chart/decorates/weather.png'
import { ConfigType } from '@/packages/index.d'
import { ChatCategoryEnum } from '../../index.d'

export const WeatherConfig: ConfigType = {
  key: 'Weather',
  title: '天气',
  category: ChatCategoryEnum.MORE,
  node: Weather,
  image
}
