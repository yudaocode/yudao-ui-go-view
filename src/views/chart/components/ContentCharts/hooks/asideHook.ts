import { reactive, ref } from 'vue'
import { icon } from '@/plugins'
import { Charts } from '../components/Charts'
import { Tables } from '../components/Tables'
import { Texts } from '../components/Texts'
import { Decorates } from '../components/Decorates'
import { renderLang, renderIcon } from '@/utils'
import { themeColor, setItem, getCharts } from './layoutHook'
// 图表
import { usePackagesStore } from '@/store/modules/packagesStore/packagesStore'
// 图标
const { BarChartIcon } = icon.ionicons5
const {
  TableSplitIcon,
  RoadmapIcon,
  SpellCheckIcon,
  GraphicalDataFlowIcon
} = icon.carbon

// 图表
const { packagesList } = usePackagesStore()
const menuOptions: any[] = reactive([])

const infoObj = new Map([
  [
    'Charts',
    {
      icon: renderIcon(RoadmapIcon),
      label: renderLang('图表'),
      node: Charts
    }
  ],
  [
    'Tables',
    {
      icon: renderIcon(TableSplitIcon),
      label: renderLang('表格'),
      node: Tables
    }
  ],
  [
    'Texts',
    {
      icon: renderIcon(SpellCheckIcon),
      label: renderLang('信息'),
      node: Tables
    }
  ],
  [
    'Decorates',
    {
      icon: renderIcon(GraphicalDataFlowIcon),
      label: renderLang('表格'),
      node: Decorates
    }
  ],
])

Object.getOwnPropertyNames(packagesList).forEach(function (key) {
  menuOptions.push({
    key: key,
    icon: infoObj.get(key)?.icon,
    label: infoObj.get(key)?.label,
    node: infoObj.get(key)?.node,
    // @ts-ignore string 赋值给 any 的问题
    packagesList: packagesList[key]
  })
})

// 记录选中值
let beforeSelect: string = menuOptions[0]['key']
const selectValue = ref<string>(menuOptions[0]['key'])
// 选中的对象值
const selecOptions = ref(menuOptions[0])

// 点击 item
const clickItemHandle = <T extends { node: any }>(key: string, item: T) => {
  // 处理渲染的 node
  selecOptions.value = item
  // 处理折叠
  if (beforeSelect === key) {
    setItem('charts', !getCharts.value)
  } else {
    setItem('charts', true)
  }
  beforeSelect = key
}

export {
  getCharts,
  BarChartIcon,
  themeColor,
  selecOptions,
  selectValue,
  clickItemHandle,
  menuOptions
}
