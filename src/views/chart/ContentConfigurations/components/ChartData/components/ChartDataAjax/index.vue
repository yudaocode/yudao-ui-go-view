<template>
  <div class="go-chart-configurations-data-ajax">
    <setting-item-box name="类型" :alone="true">
      <n-select v-model:value="targetData.data.requestHttpType" :options="selectOptions" />
    </setting-item-box>

    <setting-item-box name="源地址:" :alone="true">
      <n-text type="info">{{ requestOriginUrl || '暂无' }}</n-text>
    </setting-item-box>

    <setting-item-box :alone="true">
      <template #name>
        地址
        <n-tooltip trigger="hover" v-if="isDev()">
          <template #trigger>
            <n-icon size="21" :depth="3">
              <help-outline-icon></help-outline-icon>
            </n-icon>
          </template>
          <ul class="go-pl-0">
            开发环境使用 mock 数据，请输入
            <li v-for="item in apiList" :key="item.value">
              <n-text type="info"> {{ item.value }} </n-text>
            </li>
          </ul>
        </n-tooltip>
      </template>
      <n-input v-model:value.trim="targetData.data.requestUrl" :min="1" placeholder="请输入地址（去除源）" />
    </setting-item-box>

    <setting-item-box :alone="true">
      <template #name>
        测试
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-icon size="21" :depth="3">
              <help-outline-icon></help-outline-icon>
            </n-icon>
          </template>
          默认赋值给 dataset 字段
        </n-tooltip>
      </template>
      <n-space>
        <n-button @click="sendHandle">
          <template #icon>
            <n-icon>
              <flash-icon />
            </n-icon>
          </template>
          发送请求
        </n-button>
      </n-space>
    </setting-item-box>

    <chart-data-matching-and-show :show="showMatching && !loading" :ajax="true"></chart-data-matching-and-show>
    <go-skeleton :load="loading" :repeat="3"></go-skeleton>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, onBeforeUnmount, watchEffect } from 'vue'
import { icon } from '@/plugins'
import { SettingItemBox } from '@/components/Pages/ChartItemSetting'
import { RequestHttpEnum, ResultEnum } from '@/enums/httpEnum'
import { chartDataUrl, rankListUrl, scrollBoardUrl, numberFloatUrl, numberIntUrl, textUrl, imageUrl } from '@/api/mock'
import { http } from '@/api/http'
import { SelectHttpType } from '../../index.d'
import { ChartDataMatchingAndShow } from '../ChartDataMatchingAndShow'
import { useTargetData } from '../../../hooks/useTargetData.hook'
import { isDev, newFunctionHandle } from '@/utils'

const { HelpOutlineIcon, FlashIcon } = icon.ionicons5
const { targetData, chartEditStore } = useTargetData()
const { requestOriginUrl } = toRefs(chartEditStore.getRequestGlobalConfig)
// 是否展示数据分析
const loading = ref(false)
const showMatching = ref(false)
let lastFilter: any = undefined

const apiList = [
  {
    value: `【图表】${chartDataUrl}`
  },
  {
    value: `【文本】${textUrl}`
  },
  {
    value: `【0~100 整数】${numberIntUrl}`
  },
  {
    value: `【0~1小数】${numberFloatUrl}`
  },
  {
    value: `【图片地址】${imageUrl}`
  },
  {
    value: `【排名列表】${rankListUrl}`
  },
  {
    value: `【滚动表格】${scrollBoardUrl}`
  }
]

// 选项
const selectOptions: SelectHttpType[] = [
  {
    label: RequestHttpEnum.GET,
    value: RequestHttpEnum.GET
  },
  {
    label: RequestHttpEnum.POST,
    value: RequestHttpEnum.POST
  }
]

// 发送请求
const sendHandle = async () => {
  loading.value = true
  if(!targetData.value) return
  const { requestUrl, requestHttpType } = targetData.value.data
  if (!requestUrl) {
    window['$message'].warning('请求参数不正确，请检查！')
    return
  }
  const completePath = requestOriginUrl && requestOriginUrl.value + requestUrl
  const res = await http(requestHttpType)(completePath || '', {})
  loading.value = false
  if (res.status === ResultEnum.SUCCESS) {
    targetData.value.option.dataset = newFunctionHandle(res.data, targetData.value.filter)
    showMatching.value = true
    return
  }
  window['$message'].warning('数据异常，请检查接口数据！')
}

watchEffect(() => {
  const filter = targetData.value?.filter
  if (lastFilter !== filter) {
    lastFilter = filter
    sendHandle()
  }
})

onBeforeUnmount(() => {
  lastFilter = null
})
</script>

<style lang="scss" scoped>
@include go('chart-configurations-data-ajax') {
}
</style>
