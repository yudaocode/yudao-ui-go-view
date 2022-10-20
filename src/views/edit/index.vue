<template>
  <div class="go-edit">
    <n-layout has-sider sider-placement="right">
      <n-layout-content>
        <div>
          <n-space class="go-mx-1 go-my-1">
            <n-button size="medium" @click="back">返回</n-button>
            <n-button v-if="showOpenFilePicker" size="medium" @click="importJSON">导入</n-button>
            <!-- <n-button size="medium" type="primary" @click="confirm">覆盖</n-button> -->
          </n-space>
        </div>
        <monaco-editor
          v-model:modelValue="content"
          language="json"
          :editorOptions="{
            lineNumbers: 'on',
            minimap: { enabled: true }
          }"
        />
      </n-layout-content>
    </n-layout>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { MonacoEditor } from '@/components/Pages/MonacoEditor'
import { SavePageEnum } from '@/enums/editPageEnum'
import { getSessionStorageInfo } from '../preview/utils'
import type { ChartEditStorageType } from '../preview/index.d'
import { setSessionStorage } from '@/utils'
import { StorageEnum } from '@/enums/storageEnum'

const showOpenFilePicker: Function = (window as any).showOpenFilePicker
let content = ref('')

// 从sessionStorage 获取数据
function getDataBySession () {
  const localStorageInfo: ChartEditStorageType = getSessionStorageInfo() as ChartEditStorageType
  content.value = JSON.stringify(localStorageInfo, undefined, 2)
}
getDataBySession()

// 返回父窗口
function back() {
  opener.name = Date.now()
  window.open(opener.location.href, opener.name)
}


// 导入json文本
async function importJSON() {
  const files = await showOpenFilePicker()
  const file = await files[0].getFile()
  const fr = new FileReader()
  fr.readAsText(file)
  fr.onloadend = () => {
    content.value = (fr.result || '').toString()
  }
}

// 同步 [画布页失去焦点时同步数据到JSON页，JSON页Ctrl+S 时同步数据到画布页]
opener.addEventListener(SavePageEnum.CHART, (e: any) => {
  setSessionStorage(StorageEnum.GO_CHART_STORAGE_LIST, [e.detail])
  content.value = JSON.stringify(e.detail, undefined, 2)
})

document.addEventListener('keydown', function (e) {
  if (e.keyCode == 83 && (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)) {
    e.preventDefault()
    if (!opener) {
      return window['$message'].error('源窗口已关闭，视图同步失败')
    }
    try {
      const detail = JSON.parse(content.value)
      delete detail.id
      // 保持id不变
      opener.dispatchEvent(new CustomEvent(SavePageEnum.JSON, { detail }))
    } catch (e) {
      window['$message'].error('内容格式有误')
      console.log(e)
    }
  }
})

</script>

<style lang="scss" scoped>
.go-edit {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
@include deep() {
  .go-editor-area {
    height: calc(100% - 40px) !important;
  }
}
</style>
