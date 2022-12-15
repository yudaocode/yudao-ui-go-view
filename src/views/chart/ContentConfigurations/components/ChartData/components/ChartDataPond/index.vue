<template>
  <!-- 选中内容 -->
  <div class="go-chart-data-pond">
    <n-card class="n-card-shallow">
      <setting-item-box name="请求名称" :alone="true">
        <n-input size="small" :placeholder="pondData?.dataPondName || '暂无'" :disabled="true">
          <template #prefix>
            <n-icon :component="FishIcon" />
          </template>
        </n-input>
      </setting-item-box>

      <setting-item-box name="接口地址" :alone="true">
        <n-input size="small" :placeholder="pondData?.dataPondRequestConfig.requestUrl || '暂无'" :disabled="true">
          <template #prefix>
            <n-icon :component="FlashIcon" />
          </template>
        </n-input>
      </setting-item-box>

      <div class="edit-text" @click="controlModelHandle">
        <div class="go-absolute-center">
          <n-button type="primary" secondary>编辑配置</n-button>
        </div>
      </div>
    </n-card>
  </div>

  <!-- 编辑 / 新增弹窗 -->
  <chart-data-pond-control v-model:modelShow="controlModel"></chart-data-pond-control>
</template>

<script setup lang="ts">
import { ref, toRefs, computed } from 'vue'
import { icon } from '@/plugins'
import { SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { ChartDataPondControl } from './components/ChartDataPondControl'
import { useDesignStore } from '@/store/modules/designStore/designStore'
import { useTargetData } from '../../../hooks/useTargetData.hook'

const designStore = useDesignStore()
const { HelpOutlineIcon, FlashIcon, PulseIcon, FishIcon } = icon.ionicons5
const { targetData, chartEditStore } = useTargetData()

const {
  requestDataPond,
  requestInterval: GlobalRequestInterval,
  requestIntervalUnit: GlobalRequestIntervalUnit
} = toRefs(chartEditStore.getRequestGlobalConfig)

const controlModel = ref(false)

// 所选数据池
const pondData = computed(() => {
  const selectId = targetData.value.request.requestDataPondId
  if (!selectId) return undefined
  const data = requestDataPond.value.filter(item => {
    return selectId === item.dataPondId
  })
  return data[0]
})

// 颜色
const themeColor = computed(() => {
  return designStore.getAppTheme
})

// 请求配置 model
const controlModelHandle = () => {
  controlModel.value = true
}
</script>

<style scoped lang="scss">
@include go('chart-data-pond') {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  .n-card-shallow {
    &.n-card {
      @extend .go-background-filter;
      @include deep() {
        .n-card__content {
          padding: 10px;
        }
      }
    }
    .edit-text {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 325px;
      height: 136px;
      cursor: pointer;
      opacity: 0;
      transition: all 0.3s;
      @extend .go-background-filter;
      backdrop-filter: blur(2px) !important;
    }
    &:hover {
      border-color: v-bind('themeColor');
      .edit-text {
        opacity: 1;
      }
    }
  }
}
</style>
