import { reactive, ref, watch } from 'vue'
import { ConfigType } from '@/packages/index.d'

export const useHandleOptions = (packages) => {
  watch(
    // @ts-ignore
    () => props.selectOptions,
    (newData: { list: ConfigType[] }) => {
      if (!newData) return
      newData.list.forEach((e: ConfigType) => {
        const value: ConfigType[] = (packages.categorys as any)[e.category]
        // @ts-ignore
        packages.categorys[e.category] =
          value && value.length ? [...value, e] : [e]
      })
      for (const val in packages.categorys) {
        packages.menuOptions.push({
          key: val,
          label: val
        })
      }
      selectValue.value = packages.menuOptions[0]['key']
    },
    {
      deep: true,
      immediate: true
    }
  )
}
