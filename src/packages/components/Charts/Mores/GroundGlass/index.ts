// 公共类型声明
import { ConfigType, PackagesCategoryEnum } from '@/packages/index.d'
// 当前[信息模块]分类声明
import { ChatCategoryEnum,ChatCategoryEnumName } from '../../index.d'



export const GroundGlassConfig: ConfigType = {
  // 唯一key
  key: 'GroundGlass',
  // 图表组件渲染 Components 格式: V + key
  chartKey: 'VGroundGlass',
  // 配置组件渲染 Components 格式: VC + key
  conKey: 'VCGroundGlass',
  // 名称
  title: '磨砂玻璃透视',
  // 子分类目录
  category: ChatCategoryEnum.MORE,
  // 子分类目录
  categoryName: ChatCategoryEnumName.MORE,
  // 包分类
  package: PackagesCategoryEnum.CHARTS,
  // 图片
  image: 'ground_glass.png'
}