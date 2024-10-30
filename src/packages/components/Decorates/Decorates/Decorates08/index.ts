import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const Decorates08Config: ConfigType = {
    key: 'Decorates08',
    chartKey: 'VDecorates08',
    conKey: 'VCDecorates08',
    title: '装饰-08',
    category: ChatCategoryEnum.DECORATE,
    categoryName: ChatCategoryEnumName.DECORATE,
    package: PackagesCategoryEnum.DECORATES,
    chartFrame: ChartFrameEnum.COMMON,
    image: 'decorates08.png'
}
