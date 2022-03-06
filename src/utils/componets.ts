import { defineAsyncComponent, AsyncComponentLoader } from 'vue'
import { AsyncLoading, AsyncSkeletonLoading } from '@/components/LoadingComponent'
import { ConfigType } from '@/packages/index.d'
import { fetchChartComponent } from '@/packages/index'
/**
 * * 预览页面动态注册 package 组件
 * @param  {ConfigType} dropData
 */
export const componentPackageInstall = async (dropData: Omit<ConfigType, "node">)  => {
  const key = dropData.key.substring(1)
  console.log(window['$vue']);
  if (!window['$vue'].component(key)) {
    const chart = await fetchChartComponent(dropData)
    window['$vue'].component(key, chart)
  }
}
/**
 * * 动态注册组件
 */
export const componentInstall = <T> (key:string, node: T)  => {
  if(!window['$vue'].component(key) && node) {
    window['$vue'].component(key, node)
  }
}

/**
 * * 异步加载组件
 * @param loader
 * @returns
 */
export const loadAsyncComponent = (loader: AsyncComponentLoader<any>) =>
  defineAsyncComponent({
    loader,
    loadingComponent: AsyncLoading,
    delay: 20,
  })
  
export const loadSkeletonAsyncComponent = (loader: AsyncComponentLoader<any>) =>
  defineAsyncComponent({
    loader,
    loadingComponent: AsyncSkeletonLoading,
    delay: 20,
  })
