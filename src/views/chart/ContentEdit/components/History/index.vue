<template>
  <div class="go-edit-history go-flex-items-center">
    <n-dropdown
      @select="handleSelect"
      :show="showDropdownRef"
      :options="options"
      scrollable
      size="small"
      placement="top-start"
      style="max-height: 100vh; overflow-y: auto;"
    >
      <n-button
        class="mr-10"
        secondary
        size="small"
        :disabled="options.length === 0"
        @click="handleClick"
      >
        <span class="btn-text">历史记录</span>
        <!-- <n-icon class="lock-icon" size="18" :depth="2">
          <TimeOutlineIcon />
        </n-icon> -->
      </n-button>
    </n-dropdown>

    <n-tooltip trigger="hover">
      <template #trigger>
        <n-icon size="21" :depth="3">
          <HelpOutlineIcon />
        </n-icon>
      </template>
      <span>最多只保留 20 条记录</span>
    </n-tooltip>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { icon } from '@/plugins'
import { renderIcon } from '@/utils'
import { useChartHistoryStoreStore } from '@/store/modules/chartHistoryStore/chartHistoryStore'
import { historyActionTypeName } from '@/store/modules/chartHistoryStore/chartHistoryDefine'
import { CreateComponentType } from '@/packages/index.d'
import {
  HistoryItemType,
  HistoryTargetTypeEnum,
  HistoryActionTypeEnum
} from '@/store/modules/chartHistoryStore/chartHistoryStore.d'

const {
  TimeOutlineIcon,
  DesktopOutlineIcon,
  PencilIcon,
  TrashIcon,
  CopyIcon,
  LayersIcon,
  DuplicateIcon,
  HelpOutlineIcon
} = icon.ionicons5
const { StackedMoveIcon } = icon.carbon
const showDropdownRef = ref(false)

const chartHistoryStoreStore = useChartHistoryStoreStore()

// 设置类型对应图标
const iconHandle = (e: HistoryItemType) => {
  // 画布编辑
  if (e.targetType === HistoryTargetTypeEnum.CANVAS) {
    return renderIcon(DesktopOutlineIcon)
  }
  switch (e.actionType) {
    case HistoryActionTypeEnum.UPDATE:
      return renderIcon(PencilIcon)
    case HistoryActionTypeEnum.DELETE:
      return renderIcon(TrashIcon)
    case HistoryActionTypeEnum.PASTE:
      return renderIcon(CopyIcon)
    case HistoryActionTypeEnum.TOP:
        return renderIcon(LayersIcon)
    case HistoryActionTypeEnum.BOTTOM:
      return renderIcon(LayersIcon)
    case HistoryActionTypeEnum.UP:
      return renderIcon(LayersIcon)
    case HistoryActionTypeEnum.DOWN:
      return renderIcon(LayersIcon)
    case HistoryActionTypeEnum.MOVE:
      return renderIcon(StackedMoveIcon)
    case HistoryActionTypeEnum.ADD:
      return renderIcon(DuplicateIcon)
    default:
      return renderIcon(PencilIcon)
  }
}

// 设置类型对应文本
const labelHandle = (e: HistoryItemType) => {
  // 画布编辑
  if (e.targetType === HistoryTargetTypeEnum.CANVAS) {
    return historyActionTypeName[HistoryTargetTypeEnum.CANVAS]
  }
  return `${historyActionTypeName[e.actionType]} - ${
    (e.historyData as CreateComponentType).chartData.title
  }`
}

const options = computed(() => {
  const backStack: HistoryItemType[] = chartHistoryStoreStore.getBackStack
  const options = backStack.map((e: HistoryItemType) => {
    return {
      label: labelHandle(e),
      key: e.id,
      icon: iconHandle(e)
    }
  })
  return options
})

const handleClick = () => {
  showDropdownRef.value = !showDropdownRef.value
}
const handleSelect = (key: string) => {}
</script>

<style lang="scss" scoped>
@include go(edit-history) {
  max-height: 50vh;
  .mr-10 {
    margin-right: 10px;
  }
  .btn-text {
    font-size: 12px;
    margin-right: 3px;
  }
}
</style>
