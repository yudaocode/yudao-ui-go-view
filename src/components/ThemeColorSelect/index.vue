<template>
  <n-button quaternary @click="modelShow = true" title="颜色">
    <n-icon size="20" :depth="1">
      <ColorWandIcon />
    </n-icon>
  </n-button>
  <n-modal v-model:show="modelShow">
    <div class="go-system-color-setting">
      <n-space justify="space-between">
        <n-h3 class="title">主题颜色选择</n-h3>
        <n-icon size="20" class="go-cursor-pointer" @click="modelShow = false">
          <CloseIcon />
        </n-icon>
      </n-space>
      <n-divider />
      <div class="model-content">
        <n-scrollbar>
          <div class="content-left">
            <ColorList @colorSelectHandle="colorSelectHandle" />
          </div>
        </n-scrollbar>
        <div class="content-right">
          <div class="color-name-detail">
            <n-text v-if="appThemeDetail" class="color-name">{{ appThemeDetail.name }}</n-text>
            <n-text v-else="appThemeDetail" class="color-name">中国色</n-text>
            <n-text
              v-if="appThemeDetail"
              class="color-name-Pinyin"
            >{{ appThemeDetail.pinyin.toUpperCase() }}</n-text>
            <div
              v-if="appThemeDetail"
              class="select-color"
              :style="{ backgroundColor: designStore.appTheme }"
            />
          </div>
          <img :src="themeColorLogo" />
        </div>
      </div>
      <div class="model-footer">
        中国色列表来自于：
        <n-a href="http://zhongguose.com">http://zhongguose.com</n-a>
      </div>
    </div>
  </n-modal>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useDesignStore } from '@/store/modules/designStore/designStore'
import { AppThemeColorType } from '@/store/modules/designStore/designStore.d'
import { icon } from '@/plugins'
import themeColorLogo from '@/assets/images/exception/theme-color.png'
import { loadAsyncComponent } from '@/utils'

const ColorList = loadAsyncComponent(() =>
  import('./components/ColorList.vue')
)
const { ColorWandIcon, CloseIcon } = icon.ionicons5

const designStore = useDesignStore()
const modelShow = ref(false)

const appThemeDetail = computed(() => {
  return designStore.getAppThemeDetail
})

const colorSelectHandle = (color: AppThemeColorType) => {
  designStore.setAppColor(color)
}
</script>

<style lang="scss" scoped>
$height: 85vh;
@include go("system-color-setting") {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 90%;
  min-width: 1000px;
  padding: 20px 25px;
  height: $height;
  border-radius: 15px;
  overflow: hidden;
  @extend .go-background-filter;
  @include hover-border-color("background-color5");
  .title {
    margin: 0;
  }
  .model-content {
    flex: 1;
    height: calc(#{$height} - 40px - 48px - 36px);
    /* 左侧 */
    .content-left {
      display: flex;
      flex-wrap: wrap;
      margin-right: 200px;
    }
    /* 右侧 */
    .content-right {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 300px;
      height: 100%;
      right: 50px;
      top: 0px;
      .color-name-detail {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 40px;
        .go-flex-items-center {
          flex-direction: column;
        }
        .select-color {
          margin-top: 20px;
          width: 100px;
          height: 20px;
          border-radius: 3px;
          background-image: url("@/assets/images/exception/texture.png");
        }
        .color-name {
          font-family: serif;
          font-size: 80px;
          color: #fff;
          margin: 0 auto;
          display: block;
          width: 110px;
          text-align: center;
          background-position: center top;
          background-repeat: no-repeat;
        }
        .color-name-Pinyin {
          text-align: center;
          font-family: Georgia;
          font-size: 16px;
        }
      }
    }
  }
  .model-footer {
    text-align: end;
  }
}
</style>
