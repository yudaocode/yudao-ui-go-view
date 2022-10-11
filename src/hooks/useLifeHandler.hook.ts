import { CreateComponentType, EventLife } from '@/packages/index.d'
import * as echarts from 'echarts'

// 所有图表组件集合对象
const components: {[K in string]?: any} = {};

// 项目提供的npm 包变量
export const npmPkgs = { echarts }

export const useLifeHandler = (chartConfig: CreateComponentType) => {
    const events = chartConfig.events || {}
    // 生成生命周期事件
    const lifeEvents = {
        [EventLife.BEFORE_MOUNT] (e:any) {
            // 存储组件
            components[chartConfig.id] = e.component
            const fnStr = (events[EventLife.BEFORE_MOUNT] || '').trim()
            generateFunc(fnStr, e)
        },
        [EventLife.MOUNTED] (e:any){
            const fnStr = (events[EventLife.MOUNTED] || '').trim()
            generateFunc(fnStr, e)
        },
    }
    return lifeEvents
}

/**
 * 
 * @param fnStr 用户方法体代码
 * @param e 执行生命周期的动态组件实例
 */
 function generateFunc(fnStr: string, e: any){
    try {
        Function(`
            "use strict";
            return (
                async function(e, components, node_modules){
                    const {${Object.keys(npmPkgs).join()}} = node_modules;
                    ${fnStr}
                }
            )`)().bind(e?.component)
            // 便于拷贝echarts示例时设置option 的formatter等相关内容
            (e, components, npmPkgs);
    } catch (error) {
        console.error(error)
    }
}