<template>
  <div class="go-chart-search">
    <n-popover
      class="chart-search-popover"
      :show-arrow="false"
      :show="showPopover"
      :to="false"
      trigger="hover"
      placement="bottom-start"
    >
      <template #trigger>
        <n-input-group>
          <n-input
            v-model:value.trim="search"
            size="small"
            :loading="loading"
            clearable
            placeholder="请输入组件名称"
            @update:value="searchHandle"
          >
            <template #suffix>
              <n-icon :component="SearchIcon" />
            </template>
          </n-input>
        </n-input-group>
      </template>

      <div class="search-list-box">
        <n-scrollbar style="max-height: 500px">
          <n-text v-show="!searchRes.length">没有找到组件~</n-text>
          <div
            class="list-item ellipsis-1"
            v-for="item in searchRes"
            :key="item.key"
            :title="item.title"
          >
            {{ item.title }}
          </div>
        </n-scrollbar>
        <div class="popover-modal"></div>
      </div>
    </n-popover>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import { icon } from '@/plugins'
import { themeColor, MenuOptionsType } from '../../hooks/useAside.hook'
import { ConfigType } from '@/packages/index.d'
import { isString, addEventListener, removeEventListener } from '@/utils'

const props = defineProps({
  menuOptions: {
    type: Array,
    default: () => [],
  },
})

const { SearchIcon } = icon.ionicons5
const showPopover = ref<boolean>(false)
const loading = ref<boolean | undefined>(undefined)
const search = ref<string | null>(null)
const searchRes = ref<ConfigType[]>([])

// 组件数组提取
const listFormatHandle = (options: any[]) => {
  const arr = []
  for (const item of options) {
    arr.push(...item.list)
  }
  return arr
}

// 组件列表
const List = listFormatHandle(props.menuOptions as unknown as ConfigType[])

// 搜索处理
const searchHandle = (key: string | null) => {
  if (!isString(key) || !key.length) {
    showPopover.value = false
    searchRes.value = []
    return
  }
  showPopover.value = true
  searchRes.value = List.filter(
    (e: ConfigType) => !key || e.title.toLowerCase().includes(key.toLowerCase())
  )
}

// 关闭处理
const closeHandle = (e: Event) => {
  if (!showPopover.value) return
  if (!e.target) return
  if (!(e.target as any).closest('.go-chart-search')) {
    showPopover.value = false
  }
}

addEventListener(document, 'click', (e: Event) => {
  closeHandle(e)
})

onUnmounted(() => {
  removeEventListener(document, 'click', closeHandle)
})
</script>

<style lang="scss" scoped>
$width: 146px;
@include go('chart-search') {
  width: $width;
  margin-right: -10px;
  .chart-search-popover {
    .search-list-box {
      width: $width;
      .list-item {
        z-index: 2;
        position: relative;
        cursor: pointer;
        padding: 2px 0 2px 10px;
        margin-bottom: 5px;
        &:hover {
          &::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            opacity: 0.1;
            left: 0;
            top: 0;
            border-radius: 5px;
            background-color: v-bind('themeColor');
          }
        }
      }
  }
}
</style>