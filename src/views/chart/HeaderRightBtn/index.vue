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
import { renderIcon, fetchPathByName, routerTurnByPath, setSessionStorage, getLocalStorage } from '@/utils'
import { PreviewEnum } from '@/enums/pageEnum'
import { StorageEnum } from '@/enums/storageEnum'
import { icon } from '@/plugins'
import { canvasCut, downloadTextFile } from '@/utils'
import { useRoute } from 'vue-router'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { EditCanvasTypeEnum } from '@/store/modules/chartEditStore/chartEditStore.d'

const { BrowsersOutlineIcon, SendIcon, DownloadIcon } = icon.ionicons5
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
  const sessionStorageInfo = getLocalStorage(StorageEnum.GO_CHART_STORAGE_LIST) || []

  if (sessionStorageInfo?.length) {
    const repeateIndex = sessionStorageInfo.findIndex((e: { id: string }) => e.id === previewId)
    // 重复替换
    if (repeateIndex !== -1) {
      sessionStorageInfo.splice(repeateIndex, 1, { id: previewId, ...storageInfo })
      setSessionStorage(StorageEnum.GO_CHART_STORAGE_LIST, sessionStorageInfo)
    } else {
      sessionStorageInfo.push({
        id: previewId, ...storageInfo
      })
      setSessionStorage(StorageEnum.GO_CHART_STORAGE_LIST, sessionStorageInfo)
    }
  } else {
    setSessionStorage(StorageEnum.GO_CHART_STORAGE_LIST, [{ id: previewId, ...storageInfo }])
  }
  // 跳转
  routerTurnByPath(path, [previewId], undefined, true)
}

// 导出
const exportHandle = () => {
  // 导出数据
  downloadTextFile(JSON.stringify(chartEditStore.getStorageInfo || []), undefined, 'json')

  // 导出图片
  const ruler = document.getElementById('mb-ruler')
  const range = document.querySelector('.go-edit-range') as HTMLElement

  // 隐藏边距线
  if (!ruler || !range) {
    window['$message'].error('导出失败！')
    return
  }
  // 记录缩放比例
  const scaleTemp = chartEditStore.getEditCanvas.scale
  // 去除标尺Dom
  ruler.style.display = 'none'
  // 百分百展示页面
  chartEditStore.setScale(1, true)

  window['$message'].warning('生成截图和数据中, 请耐心等待...')
  setTimeout(() => {
    canvasCut(range, () => {
      // 放开边距线
      if (ruler) ruler.style.display = 'block'
      // 还原页面大小
      chartEditStore.setScale(scaleTemp, true)
    })
  }, 600)
}

// 发布
const sendHandle = () => {
  window['$message'].warning('该功能暂未实现（因为压根没有后台）')
}

const btnList = shallowReactive([
  {
    select: true,
    title: '预览',
    icon: renderIcon(BrowsersOutlineIcon),
    event: previewHandle
  },
  {
    select: true,
    title: '下载',
    icon: renderIcon(DownloadIcon),
    event: exportHandle
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
