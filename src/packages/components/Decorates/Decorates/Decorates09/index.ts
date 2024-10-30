import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const Decorates09Config: ConfigType = {
    key: 'Decorates09',
    chartKey: 'VDecorates09',
    conKey: 'VCDecorates09',
    title: '装饰-09',
    category: ChatCategoryEnum.DECORATE,
    categoryName: ChatCategoryEnumName.DECORATE,
    package: PackagesCategoryEnum.DECORATES,
    chartFrame: ChartFrameEnum.COMMON,
    image: 'round_dot.png'
}
