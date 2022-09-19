<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/no-mutating-props -->
<template>
  <collapse-item name="视频" expanded>
    <setting-item-box name="源" alone>
      <setting-item name="自定义视频源">
        <n-input v-model:value="optionData.dataset" size="small"></n-input>
      </setting-item>
      <setting-item name="使用内置视频">
        <n-select
          v-model:value="optionData.dataset"
          size="small"
          placeholder="自定义或选择内置视频"
          clearable
          :options="VideoList"
        ></n-select>
      </setting-item>
      <!-- <setting-item>
        <n-upload
          action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
          accept="video/*"
          @finish="finishHandleFinish"
        >
          <n-button size="small">本地上传</n-button>
        </n-upload>
      </setting-item> -->
    </setting-item-box>

    <setting-item-box name="控制">
      <setting-item>
        <n-checkbox v-model:checked="optionData.autoplay" size="small">自动播放</n-checkbox>
      </setting-item>
      <setting-item>
        <n-checkbox v-model:checked="optionData.loop" size="small">循环播放</n-checkbox>
      </setting-item>
      <setting-item>
        <n-checkbox v-model:checked="optionData.muted" size="small">静音</n-checkbox>
      </setting-item>
    </setting-item-box>
  </collapse-item>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { option, VideoList } from './config'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})

// eslint-disable-next-line no-unused-vars
const finishHandleFinish = () => {
  // console.log()
}
</script>
