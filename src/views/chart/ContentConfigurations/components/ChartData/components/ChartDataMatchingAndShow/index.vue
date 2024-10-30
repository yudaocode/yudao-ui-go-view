<template>
  <n-timeline class="go-chart-configurations-timeline">
    <n-timeline-item v-show="isCharts && dimensionsAndSource" type="info" :title="TimelineTitleEnum.MAPPING">
      <n-table striped>
        <thead>
        <tr>
          <th v-for="item in tableTitle" :key="item">{{ item }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in dimensionsAndSource" :key="index">
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
    <n-timeline-item v-show="filterShow" color="#97846c" :title="TimelineTitleEnum.FILTER">
      <n-space :size="18" vertical>
        <n-text depth="3">过滤器默认处理接口返回值的「data」字段</n-text>
        <chart-data-monaco-editor></chart-data-monaco-editor>
      </n-space>
    </n-timeline-item>
    <n-timeline-item type="success" :title="TimelineTitleEnum.CONTENT">
      <n-space vertical>
        <n-space class="source-btn-box">
          <n-button class="sourceBtn-item" :disabled="noData" @click="openEdit">
            <template #icon>
              <n-icon>
                <save-icon />
              </n-icon>
            </template>
            编辑
          </n-button>
          <n-upload
              v-model:file-list="uploadFileListRef"
              :show-file-list="false"
              :customRequest="customRequest"
              @before-upload="beforeUpload"
          >
            <n-space>
              <n-button v-if="!ajax" class="sourceBtn-item" :disabled="noData">
                <template #icon>
                  <n-icon>
                    <document-add-icon />
                  </n-icon>
                </template>
                导入
              </n-button>
            </n-space>
          </n-upload>
          <div>
            <n-button class="sourceBtn-item" :disabled="noData" @click="download">
              <template #icon>
                <n-icon>
                  <document-download-icon />
                </n-icon>
              </template>
              下载
            </n-button>
            <n-tooltip trigger="hover">
              <template #trigger>
                <n-icon class="go-ml-1" size="21" :depth="3">
                  <help-outline-icon></help-outline-icon>
                </n-icon>
              </template>
              <n-text depth="3">点击【下载】查看完整数据</n-text>
            </n-tooltip>
          </div>
        </n-space>
        <n-card size="small">
          <n-code :code="toString(source)" :trim="false" language="json"></n-code>
        </n-card>
      </n-space>
    </n-timeline-item>
  </n-timeline>


  <!-- 弹窗 -->
  <n-modal class="go-chart-data-monaco-editor" v-model:show="showModal" :mask-closable="false">
    <n-card :bordered="false" role="dialog" size="small" aria-modal="true" style="width: 1200px; height: 700px">
      <template #header>
        <n-space>
          <n-text>JSON数据编辑器</n-text>
        </n-space>
      </template>

      <template #header-extra> </template>
      <n-layout has-sider sider-placement="right">
        <n-layout style="height: 580px; padding-right: 20px">
          <monaco-editor
              v-model:modelValue="content"
              language="json"
              :editorOptions="{
                  lineNumbers: 'on',
                  minimap: { enabled: true }
                }"
          />
        </n-layout>
      </n-layout>

      <template #action>
        <n-space justify="space-between">
          <div class="go-flex-items-center">
            <n-tag :bordered="false" type="primary">
              <template #icon>
                <n-icon :component="DocumentTextIcon" />
              </template>
              说明
            </n-tag>
            <n-text class="go-ml-2" depth="2">编写方式同正常JSON写法</n-text>
          </div>

          <n-space>
            <n-button size="medium" @click="closeEvents">取消</n-button>
            <n-button size="medium" type="primary" @click="saveEvents">保存</n-button>
          </n-space>
        </n-space>
      </template>
    </n-card>
  </n-modal>


</template>

<script setup lang="ts">
const { DocumentTextIcon, ChevronDownIcon, PencilIcon } = icon.ionicons5
import { ref, computed, watch } from 'vue'
import { ChartFrameEnum } from '@/packages/index.d'
import { RequestDataTypeEnum } from '@/enums/httpEnum'
import { icon } from '@/plugins'
import { DataResultEnum, TimelineTitleEnum } from '../../index.d'
import { ChartDataMonacoEditor } from '../ChartDataMonacoEditor'
import { useFile } from '../../hooks/useFile.hooks'
import { useTargetData } from '../../../hooks/useTargetData.hook'
import isObject from 'lodash/isObject'
import { toString, isArray } from '@/utils'
import {BaseEvent} from "@/enums/eventEnum";
import {MonacoEditor} from "@/components/Pages/MonacoEditor/index";

const { targetData } = useTargetData()
const props = defineProps({
  show: {
    type: Boolean,
    required: false
  },
  ajax: {
    type: Boolean,
    required: true
  }
})
const showModal = ref(false)
const content= ref()
// 表格标题
const tableTitle = ['字段', '映射', '状态']

const { HelpOutlineIcon } = icon.ionicons5
const { DocumentAddIcon, DocumentDownloadIcon,SaveIcon } = icon.carbon

const source = ref()
const dimensions = ref()
const dimensionsAndSource = ref()
const noData = ref(false)

const { uploadFileListRef, customRequest, beforeUpload, download,JSONEditor,JSONEditorReturn } = useFile(targetData)

// 是否展示过滤器
const filterShow = computed(() => {
  return targetData.value.request.requestDataType !== RequestDataTypeEnum.STATIC
})

// 是支持 dataset 的图表类型
const isCharts = computed(() => {
  return targetData.value.chartConfig.chartFrame === ChartFrameEnum.ECHARTS
})


const openEdit = (json:any) => {
  console.log(toString(source.value))
  console.log(targetData)
  content.value = JSONEditor()
  console.log(content.value)
  showModal.value = true
}

// 关闭事件
const closeEvents = () => {
  showModal.value = false
}

// 保存事件
const saveEvents = () => {
  JSONEditorReturn(content.value.toString())
  closeEvents()
}


// 处理映射列表状态结果
const matchingHandle = (mapping: string) => {
  let res = DataResultEnum.SUCCESS
  for (let i = 0; i < source.value.length; i++) {
    if (source.value[i][mapping] === undefined) {
      res = DataResultEnum.FAILURE
      return res
    }
  }
  return DataResultEnum.SUCCESS
}

// 处理映射列表
const dimensionsAndSourceHandle = () => {
  try {
    // 去除首项数据轴标识
    return dimensions.value.map((dimensionsItem: string, index: number) => {
      return index === 0
          ? {
            // 字段
            field: '通用标识',
            // 映射
            mapping: dimensionsItem,
            // 结果
            result: DataResultEnum.NULL
          }
          : {
            field: `数据项-${index}`,
            mapping: dimensionsItem,
            result: matchingHandle(dimensionsItem)
          }
    })
  } catch (error) {
    return []
  }
}

watch(
    () => targetData.value?.option?.dataset,
    (
        newData?: {
          source: any
          dimensions: any
        } | null
    ) => {
      if (newData && targetData?.value?.chartConfig?.chartFrame === ChartFrameEnum.ECHARTS) {
        // 只有 DataSet 数据才有对应的格式
        source.value = newData
        if (isCharts.value) {
          dimensions.value = newData.dimensions
          dimensionsAndSource.value = dimensionsAndSourceHandle()
        }
      } else if (newData !== undefined && newData !== null) {
        dimensionsAndSource.value = null
        source.value = newData
      } else {
        noData.value = true
        source.value = '此组件无数据源'
      }
      if (isArray(newData)) {
        dimensionsAndSource.value = null
      }
    },
    {
      immediate: true
    }
)
</script>

<style lang="scss" scoped>
@include go('chart-configurations-timeline') {
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
