<template>
  <div class="go-chart-common">
    <n-menu
      v-show="hidePackageOneCategory"
      class="chart-menu-width"
      v-model:value="selectValue"
      :options="packages.menuOptions"
      :icon-size="16"
      :indent="18"
      @update:value="clickItemHandle"
    />
    <div class="chart-content-list">
      <n-scrollbar>
        <ItemBox :menuOptions="packages.selectOptions" />
      </n-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, reactive, computed } from 'vue'
import { ItemBox } from '../ItemBox/index'
import { ConfigType } from '@/packages/index.d'
import { useSettingStore } from '@/store/modules/settingStore/settingStore'

const props = defineProps({
  selectOptions: {
    type: Object,
    default: () => []
  }
})

// 隐藏设置
const settingStore = useSettingStore()

const hidePackageOneCategory = computed(() => {
  if (packages.categorysNum > 2) return true
  return !settingStore.getHidePackageOneCategory
})

// TODO 调试结束改成 markeRaw
let packages = reactive<{
  [T: string]: any
}>({
  // 侧边栏
  menuOptions: [],
  // 当前选择
  selectOptions: {},
  // 分类归档
  categorys: {
    // 全部
    '全部': []
  },
  // 分类归档数量
  categorysNum: 0,
  // 存储不同类别组件进来的选中值
  saveSelectOptions: {}
})

const selectValue = ref<string>()

// 设置初始列表
const setSelectOptions = (categorys: any) => {
  for (const val in categorys) {
    packages.selectOptions = categorys[val]
    break
  }
}

watch(
  // @ts-ignore
  () => props.selectOptions,
  (newData: { list: ConfigType[] }) => {
    packages.categorysNum = 0
    if (!newData) return
    newData.list.forEach((e: ConfigType) => {
      const value: ConfigType[] = (packages.categorys as any)[e.category]
      // @ts-ignore
      packages.categorys[e.category] = (value && value.length ? [...value, e] : [e])
      packages.categorys['全部'].push(e)
    })
    for (const val in packages.categorys) {
      packages.categorysNum += 1
      packages.menuOptions.push({
        key: val,
        label: val
      })
    }
    setSelectOptions(packages.categorys)
    selectValue.value = packages.menuOptions[0]['key']
  },
  {
    deep: true,
    immediate: true
  }
)

// 处理点击事件
const clickItemHandle = (key: string) => {
  packages.selectOptions = packages.categorys[key]
}
</script>

<style lang="scss" scoped>
/* 此高度与 ContentBox 组件关联*/
$topHeight: 36px;
$menuWidth: 65px;
@include go("chart-common") {
  display: flex;
  height: calc(100vh - #{$--header-height} - #{$topHeight});
  .chart-menu-width {
    width: $menuWidth;
    flex-shrink: 0;
    @include filter-bg-color("background-color2-shallow");
  }
  .chart-content-list {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0;
  }
  @include deep() {
    .n-menu-item {
      height: 30px;
      &.n-menu-item--selected {
        &::before {
          background-color: rgba(0, 0, 0, 0);
        }
      }
      .n-menu-item-content {
        text-align: center;
        padding: 0px 14px !important;
        font-size: 12px !important;
      }
    }
  }
}
</style>
