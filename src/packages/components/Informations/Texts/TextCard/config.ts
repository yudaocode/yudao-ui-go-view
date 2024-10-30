import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { TextCardConfig } from './index'
import { chartInitConfig } from '@/settings/designSetting'
import cloneDeep from 'lodash/cloneDeep'

export enum FontWeightEnum {
  NORMAL = '常规',
  BOLD = '加粗',
}

export const FontWeightObject = {
  [FontWeightEnum.NORMAL]: 'normal',
  [FontWeightEnum.BOLD]: 'bold',
}

export const option = {
  dataset:[{title:'雾霾指数',content:'PM2.5 800'},{title:'灰尘指数',content:'PM2.5 500'},{title:'雾霾指数',content:'PM2.5 800'},{title:'灰尘指数',content:'PM2.5 500'},{title:'雾霾指数',content:'PM2.5 800'},{title:'灰尘指数',content:'PM2.5 500'}],
  cardTitle:'测试文本标题',
  titleSize:32,
  fontSize: 32,
  titleColor:['rgb(85, 85, 85)','rgb(170, 170, 170)'],
  titleBackColor:['#0075ff','#163c92'],
  cardBackColor:['#163c92','#163c92'],
  itemColor1:['#071a53','#071a53'],
  itemColor2:['#051143','#051143'],
  itemFontColor:'#FFFFFF',
  cardBorderRadius:'10px 10px 10px 10px',
  iconType:'GameController', // 图标
  iconColor:'#FFFFFF',
  fontWeight: 'normal',
  itemHeight: 60, // 每个项的高度，根据实际情况调整
  animationDuration: 5000, // 动画持续时间，根据实际情况调整
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = TextCardConfig.key
  public attr = { ...chartInitConfig, w: 500, h: 70, zIndex: -1 }
  public chartConfig = cloneDeep(TextCardConfig)
  public option = cloneDeep(option)
}
