<template>
  <div class="go-canvas-chart-color">
    <n-collapse :default-expanded-names="['1']">
      <n-collapse-item title="主题选择" name="1">
        <n-card
          v-for="(value, key) in chartColors"
          :key="key"
          class="card-box"
          :class="{ selected: key === selectName }"
          size="small"
          hoverable
          embedded
          @click="selectTheme(key)"
        >
          <div class="go-flex-items-center">
            <n-text>{{ chartColorsName[key] }}</n-text>
            <span
              class="theme-color-item"
              v-for="colorItem in fetchShowColors(value.color)"
              :key="colorItem"
              :style="{ backgroundColor: colorItem }"
            />
          </div>
          <div
            class="theme-bottom"
            :style="{ backgroundImage: chartColorsshow[key] }"
          ></div>
        </n-card>
      </n-collapse-item>
    </n-collapse>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useChartEditStoreStore } from '@/store/modules/chartEditStore/chartEditStore'
import { EditCanvasFilterEnum } from '@/store/modules/chartEditStore/chartEditStore.d'
import {
  chartColors,
  chartColorsName,
  chartColorsshow
} from '@/settings/chartThemes/index'
import { useDesignStore } from '@/store/modules/designStore/designStore'
import cloneDeep from 'lodash/cloneDeep'
import { icon } from '@/plugins'

const { SquareIcon } = icon.ionicons5
const chartEditStoreStore = useChartEditStoreStore()

// 全局颜色
const designStore = useDesignStore()
const themeColor = ref(designStore.getAppTheme)

const selectName = computed(() => {
  return chartEditStoreStore.getEditCanvasConfig.chartTheme
})

// 获取用来展示的色号
const fetchShowColors = (colors: Array<string>) => {
  return cloneDeep(colors).splice(0, 6)
}

const selectTheme = (theme: string) => {
  chartEditStoreStore.setCanvasConfig(EditCanvasFilterEnum.CHART_THEME, theme)
}
</script>

<style lang="scss" scoped>
@include go(canvas-chart-color) {
  .card-box {
    cursor: pointer;
    margin-top: 15px;
    padding: 0;
    @include filter-bg-color('background-color4-shallow');
    border-radius: 23px;
    overflow: hidden;
    @include deep() {
      .n-card__content {
        padding-top: 5px;
        padding-bottom: 10px;
      }
    }
    &.selected {
      border: 1px solid v-bind('themeColor');
      border-bottom: 1px solid rgba(0, 0, 0, 0);
    }
    &:first-child {
      margin-top: 0;
    }
    .go-flex-items-center {
      justify-content: space-between;
    }
    .theme-color-item {
      display: inline-block;
      width: 20px;
      height: 20px;
      border-radius: 50%;
    }
    .theme-bottom {
      position: absolute;
      left: 0;
      bottom: 0px;
      width: 100%;
      height: 3px;
      background-image: linear-gradient(to right, #e0c3fc 0%, #8ec5fc 100%);
    }
  }
}
</style>
