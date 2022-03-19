<template>
  <div class="go-chart-configurations-data" v-if="targetData">
    <setting-item-box name="请求方式" :alone="true">
      <n-select
        v-model:value="targetData.data.requestDataType"
        :options="selectOptions"
        @on-update="selectHandle"
      />
    </setting-item-box>
    <n-timeline>
      <n-timeline-item type="info" title="数据映射">
        <n-table striped>
          <thead>
            <tr>
              <th v-for="item in tableTitle" :key="item">{{ item }}</th>
            </tr>
          </thead>
          <go-skeleton :repeat="3" :load="tableLoad" style="width: 300px;"></go-skeleton>
          <tbody v-show="!tableLoad">
            <tr v-for="(item, index) in getDimensionsAndSource" :key="index">
              <td>{{ item.field }}</td>
              <td>{{ item.mapping }}</td>
              <td>
                <n-space v-if="item.result === 0">
                  <n-badge dot type="success"></n-badge>
                  <n-text>无</n-text>
                </n-space>
                <n-space v-else>
                  <n-badge dot :type="item.result === 1 ? 'success' : 'error'"></n-badge>
                  <n-text>匹配{{ item.result === 1 ? '成功' : '失败' }}</n-text>
                </n-space>
              </td>
            </tr>
          </tbody>
        </n-table>
      </n-timeline-item>
      <n-timeline-item type="success" title="静态数据">
        <n-space vertical>
          <n-space class="source-btn-box">
            <n-upload
              v-model:file-list="uploadFileListRef"
              :show-file-list="false"
              :customRequest="customRequest"
              @before-upload="beforeUpload"
            >
              <n-button class="sourceBtn-item">
                <template #icon>
                  <n-icon>
                    <document-add-icon />
                  </n-icon>
                </template>
                导入（json / txt）
              </n-button>
            </n-upload>
            <n-button class="sourceBtn-item" @click="download">
              <template #icon>
                <n-icon>
                  <document-download-icon />
                </n-icon>
              </template>
              下载
            </n-button>
          </n-space>
          <n-card>
            <n-code :code="getSource" language="json"></n-code>
          </n-card>
        </n-space>
      </n-timeline-item>
    </n-timeline>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, computed, watch, nextTick } from 'vue'
import { SettingItemBox } from '@/components/ChartItemSetting/index'
import { RequestDataTypeEnum } from '@/store/modules/chartEditStore/chartEditStore.d'
import { useTargetData } from '../hooks/useTargetData.hook'
import { UploadCustomRequestOptions } from 'naive-ui'
import { FileTypeEnum } from '@/enums/fileTypeEnum'
import { readFile, downloadFile } from '@/utils'
import { DataResultEnum, SelcetOptionsLableEnum, SelectOptionsType } from './index.d'
import { icon } from '@/plugins'

const { DocumentAddIcon, DocumentDownloadIcon } = icon.carbon

const uploadFileListRef = ref()
const { targetData } = useTargetData()
const source = ref()
const dimensions = ref()

// 表格标题
const tableTitle = ['字段', '映射', '状态']
// 选项
const selectOptions: SelectOptionsType[] = [
  {
    label: SelcetOptionsLableEnum.STATIC,
    value: RequestDataTypeEnum.STATIC
  },
  {
    label: SelcetOptionsLableEnum.AJAX,
    value: RequestDataTypeEnum.AJAX,
    disabled: true,
  }
]


// 获取数据
const getSource = computed(() => {
  return JSON.stringify(source.value)
})

watch(() => targetData.value?.option?.dataset, (newData) => {
  if (newData) {
    source.value = newData.source
    dimensions.value = newData.dimensions
  }
}, {
  immediate: true
})

// 处理映射列表状态结果
const matchingHandle = (mapping: string) => {
  for (let i = 0; i < source.value.length; i++) {
    let res = DataResultEnum.FAILURE
    if (source.value[i][mapping] !== undefined) {
      return DataResultEnum.SUCCESS
    }
    return res
  }
  return DataResultEnum.SUCCESS
}
// 处理映射列表
const getDimensionsAndSource = computed(() => {
  // 去除首项数据轴标识
  return dimensions.value.map((item: string, index: number) => {
    return index === 0 ?
      {
        // 字段
        field: '通用标识',
        // 映射
        mapping: item,
        // 结果
        result: DataResultEnum.NULL
      } : {
        field: `数据项-${index}`,
        mapping: item,
        result: matchingHandle(item)
      }
  })
})

// 表格数据加载
const tableLoad = computed(() => {
  return !getDimensionsAndSource.value || getDimensionsAndSource.value.length === 0
})

// 选择方式
const selectHandle = () => { }

//@ts-ignore
const beforeUpload = ({ file }) => {
  uploadFileListRef.value = []
  const type = file.file.type
  if (type !== FileTypeEnum.JSON && type !== FileTypeEnum.TXT) {
    window['$message'].warning('仅支持上传 【JSON】 格式文件，请重新上传！')
    return false
  }
  return true
}

// 自定义上传操作
const customRequest = (options: UploadCustomRequestOptions) => {
  const { file } = options
  nextTick(() => {
    if (file.file) {
      readFile(file.file).then((fileData: any) => {
        targetData.value.option.dataset = JSON.parse(fileData)
      });
    } else {
      window['$message'].error('导入数据失败，请稍后重试或联系管理员！')
    }
  })
}

// 下载文件
const download = () => {
  window['$message'].success('正在下载文件...')
  downloadFile(getSource.value, undefined, 'json')
}
</script>

<style>
</style>
<style lang="scss" scoped>
@include go("chart-configurations-data") {
  @include deep() {
    pre {
      white-space: pre-wrap;
      word-wrap: break-word;
    }
  }
  .source-btn-box {
    margin-top: 10px !important;
  }
}
</style>
