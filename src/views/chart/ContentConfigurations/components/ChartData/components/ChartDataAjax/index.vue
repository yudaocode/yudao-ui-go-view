<template>
  <div class="go-chart-configurations-data-ajax">
    <n-button type="primary" @click="requestModelHandle">配置请求</n-button>
    <setting-item-box name="配置">
      <setting-item name="类型">
        <n-select v-model:value="targetData.request.requestHttpType" :options="selectOptions" />
      </setting-item>
      <setting-item name="默认使用全局间隔">
        <n-input-number
          v-model:value.trim="targetData.request.requestInterval"
          min="5"
          :show-button="false"
          placeholder="可以为空"
        >
          <template #suffix> 秒 </template>
        </n-input-number>
      </setting-item>
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
      <n-input v-model:value.trim="targetData.request.requestUrl" :min="1" placeholder="请输入地址（去除源）" />
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

    <!-- 底部数据展示 -->
    <chart-data-matching-and-show :show="showMatching && !loading" :ajax="true"></chart-data-matching-and-show>
    <!-- 骨架图 -->
    <go-skeleton :load="loading" :repeat="3"></go-skeleton>
    <!-- 请求配置model -->
    <chart-data-request v-model:modelShow="requestShow"></chart-data-request>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, onBeforeUnmount, watchEffect } from 'vue'
import { icon } from '@/plugins'
import { SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { ChartDataRequest } from '../ChartDataRequest/index'
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
const requestShow = ref(false)
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

// 请求配置 model
const requestModelHandle = () => {
  requestShow.value = true
}

// 发送请求
const sendHandle = async () => {
  loading.value = true
  if (!targetData.value) return
  const { requestUrl, requestHttpType } = targetData.value.request
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
