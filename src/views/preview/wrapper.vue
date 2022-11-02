<template>
  <Preview :key="key"></Preview>
</template>

<script setup lang="ts">
import { getSessionStorageInfo } from './utils'
import type { ChartEditStorageType } from './index.d'
import { SavePageEnum } from '@/enums/editPageEnum'
import { setSessionStorage } from '@/utils'
import { StorageEnum } from '@/enums/storageEnum'
import { ref } from 'vue'
import Preview from './index.vue'

let key = ref(Date.now())
let localStorageInfo: ChartEditStorageType = getSessionStorageInfo() as ChartEditStorageType

// 数据变更 -> 同步sessionStorage -> reload页面 （重新执行Mounted）
;[SavePageEnum.JSON, SavePageEnum.CHART].forEach((saveEvent: string) => {
  opener.addEventListener(saveEvent, (e: any) => {
    setSessionStorage(StorageEnum.GO_CHART_STORAGE_LIST, [{ ...e.detail, id: localStorageInfo.id }])
    key.value = Date.now()
  })
})

</script>
