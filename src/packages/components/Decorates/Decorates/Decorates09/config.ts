import { PublicConfigClass } from '@/packages/public'
import { chartInitConfig } from '@/settings/designSetting'
import { CreateComponentType } from '@/packages/index.d'
import { Decorates09Config } from './index'
import cloneDeep from 'lodash/cloneDeep'




export const option = {
    dataset: '状态',//标题
    roundDotNum:100,//点数量
    roundDotColor: '#FFFFFFFF', //圆点颜色
    roundDotSize: 5,   // 圆点大小

}

export default class Config extends PublicConfigClass implements CreateComponentType {
    public key = Decorates09Config.key
    public attr = { ...chartInitConfig, w: 500, h: 70, zIndex: 1 }
    public chartConfig = cloneDeep(Decorates09Config)
    public option = cloneDeep(option)
}
