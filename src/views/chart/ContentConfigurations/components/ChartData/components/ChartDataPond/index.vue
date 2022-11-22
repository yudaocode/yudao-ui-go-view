<template>
  <div class="go-chart-data-pond">
    <n-card class="n-card-shallow">
      <setting-item-box name="请求配置">
        <setting-item name="类型">
          <n-tag :bordered="false" type="primary" style="border-radius: 5px">
            {{ targetData.request.requestContentType === RequestContentTypeEnum.DEFAULT ? '普通请求' : 'SQL请求' }}
          </n-tag>
        </setting-item>

        <setting-item name="方式">
          <n-input size="small" :placeholder="targetData.request.requestHttpType || '暂无'" :disabled="true"></n-input>
        </setting-item>

        <setting-item name="组件间隔（高级）">
          <n-input size="small" :placeholder="`${targetData.request.requestInterval || '暂无'}`" :disabled="true">
            <template #suffix> {{ SelectHttpTimeNameObj[targetData.request.requestIntervalUnit] }} </template>
          </n-input>
        </setting-item>

        <setting-item name="全局间隔（默认）">
          <n-input size="small" :placeholder="`${GlobalRequestInterval || '暂无'} `" :disabled="true">
            <template #suffix> {{ SelectHttpTimeNameObj[GlobalRequestIntervalUnit] }} </template>
          </n-input>
        </setting-item>
      </setting-item-box>

      <setting-item-box name="源地址" :alone="true">
        <n-input size="small" :placeholder="requestOriginUrl || '暂无'" :disabled="true">
          <template #prefix>
            <n-icon :component="PulseIcon" />
          </template>
        </n-input>
      </setting-item-box>

      <setting-item-box name="组件地址" :alone="true">
        <n-input size="small" :placeholder="targetData.request.requestUrl || '暂无'" :disabled="true">
          <template #prefix>
            <n-icon :component="FlashIcon" />
          </template>
        </n-input>
      </setting-item-box>

      <div class="edit-text" @click="requestModelHandle">
        <div class="go-absolute-center">
          <n-button type="primary" secondary>编辑配置</n-button>
        </div>
      </div>
    </n-card>

    <!-- 列表 -->
    <div class="pond-list-box">
      <div v-for="(item, index) in requestDataPond" :key="index">
        {{ item }}
      </div>
    </div>
  </div>
  <!-- 编辑 / 新增弹窗 -->
</template>

<script setup lang="ts">
import { ref, toRefs, computed } from 'vue'
import { icon } from '@/plugins'
import { SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { useDesignStore } from '@/store/modules/designStore/designStore'
import { useTargetData } from '../../../hooks/useTargetData.hook'
import { SelectHttpTimeNameObj, RequestContentTypeEnum } from '@/enums/httpEnum'

const designStore = useDesignStore()
const { HelpOutlineIcon, FlashIcon, PulseIcon } = icon.ionicons5
const { targetData, chartEditStore } = useTargetData()

const {
  requestOriginUrl,
  requestDataPond,
  requestInterval: GlobalRequestInterval,
  requestIntervalUnit: GlobalRequestIntervalUnit
} = toRefs(chartEditStore.getRequestGlobalConfig)

const requestShow = ref(false)

// 颜色
const themeColor = computed(() => {
  return designStore.getAppTheme
})

// 请求配置 model
const requestModelHandle = () => {
  requestShow.value = true
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
      height: 270px;
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

  /* 列表 */
  .pond-list-box {

  }
}
</style>
