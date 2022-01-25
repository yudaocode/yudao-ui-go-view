import { ConfigType, PackagesCategoryEnum } from '@/packages/index.d'

/**
 * * 获取目标拖拽组件信息
 * @param drayData
 */
export const  createComponent = async (drayData: Exclude<ConfigType, 'node'>) => {
  const chart = await import(`./${drayData.categoryName}`)
  return new chart()
}
