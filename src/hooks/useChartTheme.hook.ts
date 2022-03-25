import { onMounted, ref, watch } from 'vue'
import cloneDeep from 'lodash/cloneDeep'
import merge from 'lodash/merge'

/**
 * border-hook
 * @param props
 * @param _defaultColor 默认颜色
 * @param afterResizeFun resize容器之后执行函数
 */
export const useBorderBox = (props: any, _defaultColor: string[]) => {
  const mergedColor = ref([])
  const defaultColor = ref(_defaultColor)

  function mergeColor() {
    mergedColor.value = merge(cloneDeep(defaultColor.value), props.color || [])
  }

  watch(
    () => [props.color, props.reverse],
    () => {
      mergeColor()
    }
  )
  onMounted(() => {
    mergeColor()
  })

  return {
    defaultColor,
    mergeColor,
    mergedColor
  }
}
