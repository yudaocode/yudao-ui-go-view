<template>
  <n-timeline class="go-chart-configurations-timeline">
    <n-timeline-item type="info" :title="TimelineTitleEnum.MAPPING">
      <n-table striped>
        <thead>
          <tr>
            <th v-for="item in tableTitle" :key="item">{{ item }}</th>
          </tr>
        </thead>
        <tbody v-show="!tableLoad">
          <go-skeleton :repeat="3" :load="tableLoad" style="width: 200px;"></go-skeleton>
          <tr v-for="(item, index) in tableData" :key="index">
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
    <n-timeline-item type="success" :title="TimelineTitleEnum.CONTENT">
      <n-space vertical>
        <n-text depth="3">数据需要符合 ECharts-setdata 规范</n-text>
        <n-space class="source-btn-box">
          <n-upload
            v-model:file-list="uploadFileListRef"
            :show-file-list="false"
            :customRequest="customRequest"
            @before-upload="beforeUpload"
          >
            <n-space>
              <n-button class="sourceBtn-item">
                <template #icon>
                  <n-icon>
                    <document-add-icon />
                  </n-icon>
                </template>
                导入（json / txt）
              </n-button>
            </n-space>
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
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, PropType } from 'vue'
import { UploadCustomRequestOptions } from 'naive-ui'
import { FileTypeEnum } from '@/enums/fileTypeEnum'
import { readFile, downloadFile } from '@/utils'
import { icon } from '@/plugins'
import { DataResultEnum, TimelineTitleEnum } from '../../index.d'

const props = defineProps({
  tableData: {
    type: Object,
    required: true
  }
})

const tableLoad = ref(true)

// 表格标题
const tableTitle = ['字段', '映射', '状态']

// 表格数据加载
watch(() => props.tableData.value, (newData: object[]) => {
  if (!(newData && newData.length !== 0)) {
    tableLoad.value = false
  }
}, {
  immediate: true
})

const { DocumentAddIcon, DocumentDownloadIcon } = icon.carbon
const uploadFileListRef = ref()
const source = ref()
const dimensions = ref()

// 获取数据
const getSource = computed(() => {
  return JSON.stringify(source.value)
})

watch(() => props.targetData?.option?.dataset, (newData) => {
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
        props.targetData.option.dataset = JSON.parse(fileData)
      });
    } else {
      window['$message'].error('导入数据失败，请稍后重试或联系管理员！')
    }
  })
}

// 下载文件
const download = () => {
  try {
    window['$message'].success('正在下载文件！')
    downloadFile(JSON.stringify(props.targetData?.option?.dataset), undefined, 'json')
  } catch (error) {
    window['$message'].success('下载失败，数据错误！')
  }
}
</script>

<style lang="scss" scoped>
@include go("chart-configurations-data-static") {
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
