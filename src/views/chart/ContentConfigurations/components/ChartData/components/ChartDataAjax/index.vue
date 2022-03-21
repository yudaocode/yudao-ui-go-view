<template>
  <div class="go-chart-configurations-data-ajax">
    <setting-item-box name="类型" :alone="true">
      <n-select
        v-model:value="targetData.data.requestHttpType"
        :options="selectOptions"
      />
    </setting-item-box>
    <setting-item-box :alone="true">
      <template #name>
        地址
        <n-tooltip trigger="hover" v-if="ISDEV">
          <template #trigger>
            <n-icon size="21" :depth="3">
              <help-outline-icon></help-outline-icon>
            </n-icon>
          </template>
          <span>
            开发环境使用 mock 数据，请输入【
            <n-text type="info">
              {{ featchMockData }}
            </n-text>
            】
          </span>
        </n-tooltip>
      </template>
      <n-input
        v-model:value="targetData.data.requestUrl"
        :min="1"
        placeholder="http(s)://..."
      />
    </setting-item-box>
    <setting-item-box name="测试" :alone="true">
      <n-space>
        <n-button @click="sendHandle">
          <template #icon>
            <n-icon>
              <flash-icon />
            </n-icon>
          </template>
          发送地址请求
        </n-button>
      </n-space>
    </setting-item-box>
    <chart-data-matching-and-show
      v-show="showMatching"
      :targetData="targetData"
    ></chart-data-matching-and-show>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, toRefs } from 'vue'
import { icon } from '@/plugins'
import { CreateComponentType } from '@/packages/index.d'
import { SettingItemBox } from '@/components/ChartItemSetting/index'
import { RequestHttpEnum } from '@/enums/httpEnum'
import { SelectHttpType } from '../../index.d'
import { featchMockData } from '@/api/mock'
import { http } from '@/api/http'
import { ChartDataMatchingAndShow } from '../ChartDataMatchingAndShow'

const { HelpOutlineIcon, FlashIcon } = icon.ionicons5

const props = defineProps({
  targetData: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

// 是否是开发环境
const ISDEV = import.meta.env.DEV === true
// 是否展示数据分析
const showMatching = ref(false)
// 请求相关
const { requestUrl, requestHttpType } = toRefs(props.targetData.data)

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
  if(!requestUrl || !requestUrl.value) {
    window['$message'].warn('请求参数不正确，请检查！')
    return
  }
  const res = await http(requestHttpType.value)(requestUrl.value as string, {})
  console.log(res)
}
</script>

<style lang="scss" scoped>
@include go('chart-configurations-data-ajax') {
}
</style>
