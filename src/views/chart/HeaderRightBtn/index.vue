<template>
  <n-space class="go-mt-0">
    <n-button v-for="item in btnList" :key="item.title" ghost size="small" @click="item.event">
      <template #icon>
        <component :is="item.icon"></component>
      </template>
      <span>{{ item.title }}</span>
    </n-button>
  </n-space>
</template>

<script setup lang="ts">
import { shallowReactive } from 'vue'
import { renderIcon, fetchPathByName, routerTurnByPath, setLocalStorage, getLocalStorage } from '@/utils'
import { PreviewEnum } from '@/enums/pageEnum'
import { StorageEnum } from '@/enums/storageEnum'
import { icon } from '@/plugins'
import { useRoute } from 'vue-router'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'

const { BrowsersOutlineIcon, SendIcon } = icon.ionicons5
const chartEditStore = useChartEditStore()

// TODO 我也不知道为什么不能实时获取，必须初始化获取
const routerParamsInfo = useRoute()

// 预览
const previewHandle = () => {
  const path = fetchPathByName(PreviewEnum.CHART_PREVIEW_NAME, 'href')
  if (!path) return
  const { id } = routerParamsInfo.params
  // id 标识
  const previewId = typeof id === 'string' ? id : id[0]
  const storageInfo = chartEditStore.getStorageInfo
  const localStorageInfo = getLocalStorage(StorageEnum.GO_CHART_STORAGE_LIST) || []

  if (localStorageInfo?.length) {
    const repeateIndex = localStorageInfo.findIndex((e: { id: string }) => e.id === previewId)
    // 重复替换
    if (repeateIndex !== -1) {
      localStorageInfo.splice(repeateIndex, 1, { id: previewId, ...storageInfo })
      setLocalStorage(StorageEnum.GO_CHART_STORAGE_LIST, localStorageInfo)
    } else {
      localStorageInfo.push({
        id: previewId, ...storageInfo
      })
      setLocalStorage(StorageEnum.GO_CHART_STORAGE_LIST, localStorageInfo)
    }
  } else {
    setLocalStorage(StorageEnum.GO_CHART_STORAGE_LIST, [{ id: previewId, ...storageInfo }])
  }
  // 跳转
  routerTurnByPath(path, [previewId], undefined, true)
}

// 发布
const sendHandle = () => {
  window['$message'].warning('该功能暂未实现（因为压根没有后台）')
}

const btnList = shallowReactive([
  {
    key: '',
    select: true,
    title: '预览',
    icon: renderIcon(BrowsersOutlineIcon),
    event: previewHandle
  },
  {
    select: true,
    title: '发布',
    icon: renderIcon(SendIcon),
    event: sendHandle
  }
])
</script>
<style lang="scss" scoped>
.align-center {
  margin-top: -4px;
}
</style>
