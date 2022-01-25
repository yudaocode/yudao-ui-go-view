<template>
  <div class="go-edit-bottom">
    <n-popselect :options="shortcutKeyOptions" size="medium">
      <n-button class="scale-btn" secondary size="mini">
        <n-icon class="lock-icon" size="18" :depth="2">
          <DicomOverlayIcon />
        </n-icon>
      </n-button>
    </n-popselect>

    <n-space class="bottom-ri">
      <!-- 缩放比例 -->
      <n-select
        :disabled="lockScale"
        class="scale-btn"
        v-model:value="filterValue"
        size="mini"
        :options="filterOptions"
        @update:value="selectHandle"
      />

      <!-- 锁定缩放 -->
      <n-tooltip trigger="hover">
        <template #trigger>
          <n-button @click="lockHandle" text>
            <n-icon
              class="lock-icon"
              :class="{ color: lockScale }"
              size="18"
              :depth="3"
            >
              <LockClosedOutlineIcon v-if="lockScale" />
              <LockOpenOutlineIcon v-else />
            </n-icon>
          </n-button>
        </template>
        <span>{{ lockScale ? '解锁' : '锁定' }}当前比例</span>
      </n-tooltip>

      <!-- 拖动 -->
      <n-slider
        class="scale-slider"
        v-model:value="sliderValue"
        :default-value="50"
        :min="10"
        :max="200"
        :step="5"
        :format-tooltip="v => `${v}%`"
        :disabled="lockScale"
        :marks="sliderMaks"
        @update:value="sliderHandle"
      />
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs, shallowReactive, watchEffect } from 'vue'
import { icon } from '@/plugins'
const { LockClosedOutlineIcon, LockOpenOutlineIcon } = icon.ionicons5
const { DicomOverlayIcon } = icon.carbon
import { getChartEditStore, getChartEditStoreEnum } from '../../hooks/useStore.hook'
import { useDesignStore } from '@/store/modules/designStore/designStore'

// 全局颜色
const designStore = useDesignStore()
const themeColor = ref(designStore.getAppTheme)

const chartEditStore = getChartEditStore()
const chartEditStoreEnum = getChartEditStoreEnum()
const { lockScale, scale } = toRefs(chartEditStore.getEditCanvas)

// 缩放选项
let filterOptions = reactive([
  {
    label: '自适应',
    value: 0
  },
  {
    label: '50%',
    value: 50
  },
  {
    label: '100%',
    value: 100
  },
  {
    label: '150%',
    value: 150
  },
  {
    label: '200%',
    value: 200
  }
])

// 选择值
const filterValue = ref('')

// 用户自选择
const selectHandle = (v: number) => {
  if (v === 0) {
    chartEditStore.computedScale()
    return
  }
  chartEditStore.setScale(v / 100)
}

// 点击锁处理
const lockHandle = () => {
  chartEditStore.setEditCanvasItem(
    chartEditStoreEnum.LOCK_SCALE,
    !lockScale.value
  )
}

// 拖动
const sliderValue = ref(100)

// 拖动处理
const sliderHandle = (v: number) => {
  chartEditStore.setScale(v / 100)
}

const sliderMaks = reactive({
  100: ''
})

// 快捷键
const shortcutKeyOptions = shallowReactive([
  {
    label: '键盘快捷键列表',
    value: '1'
  },
  {
    label: 'Ctrl + C 复制',
    value: '2'
  }
])

// 监听 scale 变化
watchEffect(() => {
  const value = (scale.value * 100).toFixed(0)
  filterValue.value = `${value}%`
  sliderValue.value = parseInt(value)
})
</script>

<style lang="scss" scoped>
@include go(edit-bottom) {
  width: 100%;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .bottom-ri {
    position: relative;
    top: 15px;
    .lock-icon {
      padding-top: 4px;
      &.color {
        color: v-bind('themeColor');
      }
    }
    .scale-btn {
      font-size: 12px;
      @include deep() {
        .n-base-selection-label {
          padding: 3px;
        }
      }
    }
    .scale-slider {
      position: relative;
      top: -4px;
      width: 200px;
    }
  }
}
</style>
