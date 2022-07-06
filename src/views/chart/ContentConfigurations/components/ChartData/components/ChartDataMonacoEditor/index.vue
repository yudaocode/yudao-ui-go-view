<template>
  <template v-if="targetData.filter">
    <n-card>
      <p><span class="func-keyword">function</span>&nbsp;&nbsp;filter(data)&nbsp;&nbsp;{</p>
      <!-- 函数体 -->
      <div class="go-ml-4">
        <n-code :code="targetData.filter" language="typescript"></n-code>
      </div>
      <p>}</p>
      <template #footer>
        <n-space justify="end">
          <n-button tertiary size="small" @click="delFilter">
            <template #icon>
              <n-icon>
                <trash-icon />
              </n-icon>
            </template>
            删除
          </n-button>
          <n-button type="info" tertiary size="small" @click="addFilter">
            <template #icon>
              <n-icon>
                <pencil-icon />
              </n-icon>
            </template>
            编辑
          </n-button>
        </n-space>
      </template>
    </n-card>
  </template>
  <template v-else>
    <n-space justify="space-around">
      <n-button @click="addFilter">
        <template #icon>
          <n-icon>
            <filter-icon />
          </n-icon>
        </template>
        新增过滤器
      </n-button>
    </n-space>
  </template>

  <!-- 弹窗 -->
  <n-modal class="go-chart-data-monaco-editor" v-model:show="showModal" :mask-closable="false">
    <n-card :bordered="false" role="dialog" size="small" aria-modal="true" style="width: 1000px; height: 600px">
      <template #header>
        <n-space>
          <n-text>过滤器函数编辑器</n-text>
        </n-space>
      </template>
      <template #header-extra> </template>
      <n-space size="small" vertical>
        <n-space justify="space-between">
          <div>
            <n-space vertical>
              <n-tag type="info">
                <span class="func-keyword">function</span>&nbsp;&nbsp;filter(data)&nbsp;&nbsp;{
              </n-tag>
              <monaco-editor v-model:modelValue="filter" width="460px" height="380px" language="javascript" />
              <n-tag type="info">}</n-tag>
            </n-space>
          </div>
          <n-divider vertical style="height: 480px" />
          <n-scrollbar style="max-height: 480px">
            <n-space :size="15" vertical>
              <div class="editor-data-show">
                <n-space>
                  <n-text depth="3">目标数据：</n-text>
                  <n-code :code="toString(sourceData)" language="typescript" :word-wrap="true"></n-code>
                </n-space>
              </div>
              <div class="editor-data-show">
                <n-space>
                  <n-text depth="3">过滤器结果：</n-text>
                  <n-code :code="filterRes" language="typescript" :word-wrap="true"></n-code>
                </n-space>
              </div>
            </n-space>
          </n-scrollbar>
        </n-space>
      </n-space>
      <template #action>
        <n-space justify="space-between">
          <div class="go-flex-items-center">
            <n-tag :bordered="false" type="success">
              <template #icon>
                <n-icon :component="DocumentTextIcon" />
              </template>
              规则
            </n-tag>
            <n-text class="go-ml-2" depth="3">过滤器将对接口返回值的「data」字段进行处理</n-text>
          </div>

          <n-space>
            <n-button size="medium" @click="closeFilter">取消</n-button>
            <n-button size="medium" type="primary" @click="saveFilter">保存</n-button>
          </n-space>
        </n-space>
      </template>
    </n-card>
  </n-modal>
</template>

<script lang="ts" setup>
import { ref, computed, watch, toRefs } from 'vue'
import { MonacoEditor } from '@/components/Pages/MonacoEditor'
import { useTargetData } from '../../../hooks/useTargetData.hook'
import { RequestHttpEnum, RequestDataTypeEnum, ResultEnum } from '@/enums/httpEnum'
import { icon } from '@/plugins'
import { goDialog, toString } from '@/utils'
import { http } from '@/api/http'
import cloneDeep from 'lodash/cloneDeep'

const { PencilIcon, TrashIcon, FilterIcon, DocumentTextIcon } = icon.ionicons5
const { targetData, chartEditStore } = useTargetData()
const { requestDataType } = toRefs(targetData.value.data)
const { requestOriginUrl } = toRefs(chartEditStore.getRequestGlobalConfig)

// 受控弹窗
const showModal = ref(false)
// filter 函数模板
const filter = ref(targetData.value.filter || `return data`)
// 过滤错误标识
const errorFlag = ref(false)
// 目标静态/接口数据
const sourceData = ref<any>('')

// 动态获取数据
const fetchTargetData = async () => {
  try {
    const { requestUrl, requestHttpType } = targetData.value.data
    if (!requestUrl) {
      window['$message'].warning('请求参数不正确，请检查！')
      sourceData.value = '请求参数不正确，请检查！'
      return
    }
    const completePath = requestOriginUrl && requestOriginUrl.value + requestUrl
    const res = await http(requestHttpType)(completePath || '', {})
    if (res.status === ResultEnum.SUCCESS) {
      sourceData.value = res.data
      console.log(sourceData.value)
      return
    }
  } catch (error) {
    window['$message'].warning('数据异常，请检查接口数据！')
  }
}

// 过滤结果
const filterRes = computed(() => {
  try {
    const fn = new Function('data', filter.value)
    const res = fn(cloneDeep(sourceData.value))
    errorFlag.value = false
    return JSON.stringify(res)
  } catch (error) {
    errorFlag.value = true
    return '过滤函数错误'
  }
})

// 新增过滤器
const addFilter = () => {
  showModal.value = true
}

// 删除过滤器
const delFilter = () => {
  goDialog({
    message: '是否删除过滤器',
    onPositiveCallback: () => {
      targetData.value.filter = undefined
    }
  })
}

// 关闭过滤器
const closeFilter = () => {
  showModal.value = false
}

// 新增过滤器
const saveFilter = () => {
  if (errorFlag.value) {
    window['$message'].error('过滤函数错误，无法进行保存')
    return
  }
  targetData.value.filter = filter.value
  closeFilter()
}

watch(
  () => showModal.value,
  (newData: boolean) => {
    if (newData) fetchTargetData()
  }
)
</script>

<style lang="scss" scoped>
.func-keyword {
  color: #b478cf;
}
@include go('chart-data-monaco-editor') {
  &.n-card.n-modal,
  .n-card {
    @extend .go-background-filter;
  }
  .editor-data-show {
    @include fetch-bg-color('filter-color');
    width: 420px;
    padding: 20px;
    border-radius: 5px;
  }
}
</style>
