// 公共类型声明
import { ConfigType, PackagesCategoryEnum } from '@/packages/index.d'
// 当前[信息模块]分类声明
import { ChatCategoryEnum,ChatCategoryEnumName } from '../../index.d'

export const WeatherConfig: ConfigType = {
  // 唯一key
  key: 'Weather',
  // 图表组件渲染 Components 格式: V + key
  chartKey: 'VWeather',
  // 配置组件渲染 Components 格式: VC + key
  conKey: 'VCWeather',
  // 名称
  title: '天气组件',
  // 子分类目录
  category: ChatCategoryEnum.MORE,
  // 子分类目录
  categoryName: ChatCategoryEnumName.MORE,
  // 包分类
  package: PackagesCategoryEnum.CHARTS,
  // 图片
  image: 'weather.png'
}