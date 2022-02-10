<template>
  <div class="go-canvas-setting">
    <n-form inline :label-width="45" size="small" label-placement="left">
      <n-form-item label="宽度">
        <!-- 尺寸选择 -->
        <n-input-number
          size="small"
          v-model:value="canvasConfig.width"
          :validator="validator"
          @update:value="chartEditStoreStore.computedScale"
        />
      </n-form-item>
      <n-form-item label="高度">
        <n-input-number
          size="small"
          v-model:value="canvasConfig.height"
          :validator="validator"
          @update:value="chartEditStoreStore.computedScale"
        />
      </n-form-item>
    </n-form>

    <n-card class="upload-box">
      <n-upload
        v-model:file-list="uploadFileListRef"
        :show-file-list="false"
        :customRequest="customRequest"
        :onBeforeUpload="beforeUploadHandle"
      >
        <n-upload-dragger>
          <img
            class="upload-show"
            v-if="canvasConfig.backgroundImage"
            :src="canvasConfig.backgroundImage"
            alt="背景"
          />
          <div class="upload-img" v-show="!canvasConfig.backgroundImage">
            <img src="@/assets/images/canvas/noImage.png" />
            <n-text class="upload-desc" depth="3">
              背景图需小于 {{backgroundImageSize}}M ，格式为 png/jpg/gif 的文件
            </n-text>
          </div>
        </n-upload-dragger>
      </n-upload>
    </n-card>
    <n-space vertical :size="12">
      <n-space>
        <n-text>背景色</n-text>
        <n-color-picker
          style="width: 326px;"
          :showPreview="true"
          :swatches="[
            '#232324',
            '#2a2a2b',
            '#313132',
            '#373739',
            '#757575',
            '#e0e0e0',
            '#eeeeee',
            '#fafafa'
          ]"
          v-model:value="canvasConfig.background"
        />
      </n-space>
      <n-space>
        <n-text>使用颜色</n-text>
        <n-switch
          size="small"
          v-model:value="canvasConfig.selectColor"
          :loading="switchSelectColorLoading"
          :round="false"
          :disabled="!canvasConfig.backgroundImage"
          :onUpdate="switchSelectColorHandle"
        />
      </n-space>
      <n-space>
        <n-text>背景</n-text>
        <n-button
          size="small"
          :disabled="!canvasConfig.backgroundImage"
          @click="clearImage"
        >
          清除背景图
        </n-button>
        <n-button
          size="small"
          :disabled="!canvasConfig.background"
          @click="clearColor"
        >
          清除颜色
        </n-button>
      </n-space>
    </n-space>

    <n-divider />

    <!-- 主题选择和全局配置 -->
    <n-tabs v-show="!selectTarget" class="tabs-box" size="small" type="segment">
      <n-tab-pane
        v-for="item in globalTabList"
        :key="item.key"
        :name="item.key"
        size="small"
        display-directive="show:lazy"
      >
        <template #tab>
          <n-space>
            <span>{{ item.title }}</span>
            <n-icon size="16" class="icon-position">
              <component :is="item.icon"></component>
            </n-icon>
          </n-space>
        </template>
        <component :is="item.render"></component>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { backgroundImageSize } from '@/settings/designSetting'
import { useChartEditStoreStore } from '@/store/modules/chartEditStore/chartEditStore'
import { EditCanvasConfigEnum } from '@/store/modules/chartEditStore/chartEditStore.d'
import { UploadCustomRequestOptions } from 'naive-ui'
import { ChartTheme } from './components/ChartTheme/index'
import { ChartSysSetting } from './components/ChartSysSetting/index'
import { fileToUrl } from '@/utils'
import { icon } from '@/plugins'

const { ColorPaletteIcon } = icon.ionicons5
const { ZAxisIcon } = icon.carbon

const chartEditStoreStore = useChartEditStoreStore()
const canvasConfig = chartEditStoreStore.getEditCanvasConfig

const uploadFileListRef = ref()
const switchSelectColorLoading = ref(false)

// 页面设置
const globalTabList = [
  {
    key: 'ChartTheme',
    title: '主题',
    icon: ColorPaletteIcon,
    render: ChartTheme
  },
  {
    key: 'ChartSysSetting',
    title: '全局图表',
    icon: ZAxisIcon,
    render: ChartSysSetting
  }
]

// 规则
const validator = (x: number) => x > 50

// 前置处理
//@ts-ignore
const beforeUploadHandle = async ({ file }) => {
  uploadFileListRef.value = []
  const type = file.file.type
  const size = file.file.size

  if (size > 1024 * 1024 * backgroundImageSize) {
    window['$message'].warning(`图片超出 ${backgroundImageSize}M 限制，请重新上传！`)
    return false
  }
  if (type !== 'image/png' && type !== 'image/jpeg' && type !== 'image/gif') {
    window['$message'].warning('文件格式不符合，请重新上传！')
    return false
  }
  return true
}

// 清除背景
const clearImage = () => {
  chartEditStoreStore.setCanvasConfig(
    EditCanvasConfigEnum.BACKGROUND_IAMGE,
    undefined
  )
}

// 清除颜色
const clearColor = () => {
  chartEditStoreStore.setCanvasConfig(
    EditCanvasConfigEnum.BACKGROUND,
    undefined
  )
}

// 启用背景
const switchSelectColorHandle = () => {
  switchSelectColorLoading.value = true
  setTimeout(() => {
    switchSelectColorLoading.value = false
  }, 1000)
}

// 自定义上传操作
const customRequest = (options: UploadCustomRequestOptions) => {
  const {
    file,
    data,
    headers,
    withCredentials,
    action,
    onFinish,
    onError,
    onProgress
  } = options

  nextTick(() => {
    if (file.file) {
      const ImageUrl = fileToUrl(file.file)
      chartEditStoreStore.setCanvasConfig(
        EditCanvasConfigEnum.BACKGROUND_IAMGE,
        ImageUrl
      )
    } else {
      window['$message'].error('添加图片失败，请稍后重试！')
    }
  })
}
</script>

<style lang="scss" scoped>
@include go(canvas-setting) {
  padding-top: 20px;
  .upload-box {
    cursor: pointer;
    margin-bottom: 20px;
    @include deep() {
      .n-card__content {
        padding: 0px;
        overflow: hidden;
      }
    }
    .upload-show {
      display: block;
      width: 326px;
      height: 193px;
      margin-bottom: -7px;
      border-radius: 5px;
    }
    .upload-img {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 326px;
      img {
        height: 150px;
      }
      .upload-desc {
        padding: 10px 0;
      }
    }
  }
  .icon-position {
    padding-top: 2px;
  }
}
</style>
