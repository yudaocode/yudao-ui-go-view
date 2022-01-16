import WeatherTime from './index.vue'
import image from '@/assets/images/chart/decorates/weather_time.png'
import { ConfigType } from '@/packages/index.d'
import { ChatCategoryEnum } from '../../index.d'

export const WeatherTimeConfig: ConfigType = {
  key: 'VWeatherTime',
  title: '天气和时间',
  category: ChatCategoryEnum.MORE,
  node: WeatherTime,
  image
}
