<template>
  <n-card>
    <!-- 函数体 -->
    <div v-for="eventName in EventLife" :key="eventName">
      <p><span class="func-keyword">async {{eventName}}</span> (e) {</p>
      <p class="go-ml-4"><n-code :code="(targetData.events || {})[eventName]" language="typescript"></n-code></p>
      <p>}<span>,</span></p>
    </div>
    <template #footer>
      <n-space justify="end">
        <n-button type="primary" tertiary size="small" @click="showModal = true">
          <template #icon>
            <n-icon>
              <filter-edit-icon />
            </n-icon>
          </template>
          编辑
        </n-button>
      </n-space>
    </template>
  </n-card>

  <!-- 弹窗 -->
  <n-modal class="go-chart-data-monaco-editor" v-model:show="showModal" :mask-closable="false">
    <n-card :bordered="false" role="dialog" size="small" aria-modal="true" style="width: 1200px; height: 700px">
      <template #header>
        <n-space>
          <n-text>事件代码</n-text>
        </n-space>
      </template>
      <template #header-extra> </template>
        <n-layout has-sider sider-placement="right">
          <n-layout-content style="height: 580px">
            <div class="go-p-4">
              <div >
                <div class="go-ml-2" v-for="(eventName) in EventLife" :key="eventName">
                  <input class="checkbox--hidden" type="checkbox" v-show="false" :id="eventName">
                  <label :for="eventName">
                    <span class="func-keyword">async {{eventName}} (e) </span>{
                    <n-icon :component="ChevronDownIcon"/>
                    <br/>
                  </label>
                  <monaco-editor v-model:modelValue="events[eventName]" language="javascript" />
                  <p>},</p>
                </div>
              </div>
            </div>
          </n-layout-content>
          <n-layout-sider
            collapse-mode="transform"
            :collapsed-width="14"
            :width="340"
            show-trigger="arrow-circle"
            content-style="padding: 24px;"
            bordered
          >
              <n-tabs default-value="1" justify-content="space-evenly" type="segment">
                <!-- 验证结果 -->
                <n-tab-pane tab="验证结果" name="1">
                  <n-collapse class="go-mt-3" arrow-placement="right" :default-expanded-names="['1', '2', '3']">
                    <template v-for="(error) in [validEvents()]" :key="error">
                      <n-collapse-item title="错误函数" name="1">
                        <n-text depth="3">{{error.errorFn}}</n-text>
                      </n-collapse-item>
                      <n-collapse-item title="错误信息" name="2">
                        <n-text depth="3">{{error.name}}</n-text>
                      </n-collapse-item>
                      <n-collapse-item title="堆栈信息" name="3">
                        <n-text depth="3">{{error.message}}</n-text>
                      </n-collapse-item>
                    </template>
                  </n-collapse>
                </n-tab-pane>
                <!-- 辅助说明 -->
                <n-tab-pane tab="变量说明" name="2">
                  <n-text depth="3">以下变量均可在代码块中使用</n-text>
                  <n-collapse class="go-mt-3" arrow-placement="right">
                    <n-collapse-item title="e">
                      <n-text depth="3">触发对应生命周期事件时接收的参数</n-text>
                    </n-collapse-item>
                    <n-collapse-item title="this">
                      <n-text depth="3">图表组件实例</n-text><br/>
                      <n-tag class="go-m-1" v-for="prop in ['refs', 'setupState', 'ctx', 'props']" :key="prop">{{ prop }}</n-tag>...
                    </n-collapse-item>
                    <n-collapse-item title="components">
                      <n-text depth="3">当前大屏内所有组件的集合id 图表组件中的配置id，可以获取其他图表组件进行控制</n-text>
                      <n-code :code="`{\n  [id]: component\n}`" language="typescript"></n-code>
                    </n-collapse-item>
                    <n-collapse-item title="node_modules">
                      <n-text depth="3">以下是内置在代码环境中可用的包变量</n-text>
                      <n-tag class="go-m-1" v-for="pkg in Object.keys(npmPkgs || {})" :key="pkg">{{ pkg }}</n-tag>
                    </n-collapse-item>
                  </n-collapse>
                </n-tab-pane>
                <!-- 远程加载 -->
                <n-tab-pane tab="远程加载" name="3">
                  <n-card size="small">
                    <n-code :code="`//查看当前浏览器是否兼容 ${hTMLScriptElement.supports('importmap') ? '√' : '×'}
//HTMLScriptElement.supports('importmap')
const react = await import('https://cdn.skypack.dev/react@17.0.1')`" language="typescript"></n-code>
                  </n-card>
                </n-tab-pane>
              </n-tabs>
          </n-layout-sider>
        </n-layout>

      <template #action>
        <n-space justify="space-between">
          <div class="go-flex-items-center">
            <n-tag :bordered="false" type="primary">
              <template #icon>
                <n-icon :component="DocumentTextIcon" />
              </template>
              提示
            </n-tag>
            <n-text class="go-ml-2" depth="2">通过提供的参数可为图表增加定制化的tooltip、交互事件等等</n-text>
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

<script lang="ts" setup>
import { ref, computed, watch, toRefs, toRaw } from 'vue'
import { MonacoEditor } from '@/components/Pages/MonacoEditor'
import { useTargetData } from '../../../hooks/useTargetData.hook'
import { npmPkgs } from '@/hooks'
import { icon } from '@/plugins'
import { goDialog, toString } from '@/utils'
import { CreateComponentType, EventLife } from '@/packages/index.d'
import { Script } from 'vm'

const { DocumentTextIcon, ChevronDownIcon } = icon.ionicons5
const { FilterEditIcon } = icon.carbon
const { targetData, chartEditStore } = useTargetData()
const hTMLScriptElement = HTMLScriptElement as any

// 受控弹窗
const showModal = ref(false)
// events 函数模板
let events = ref({ ...targetData.value.events })
// 事件错误标识
const errorFlag = ref(false)

// 验证语法
const validEvents = () => {

  let errorFn = ''
  let message = ''
  let name = ''

  errorFlag.value = Object.entries(events.value).every(([eventName, str]) => {
    try {
      // 支持await，验证语法
      const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
      new AsyncFunction(str)
      return true
    } catch (error : any) {
      message = error.message
      name = error.name
      errorFn = eventName
      console.log(error)
      return false
    }
  })
  return {
    errorFn,
    message,
    name
  }
}

// 关闭事件
const closeEvents = () => {
  showModal.value = false
}

// 新增事件
const saveEvents = () => {
  if (validEvents().errorFn) {
    window['$message'].error('事件函数错误，无法进行保存')
    return
  }
  if (Object.values(events.value).join('').trim() === '') {
    // 清空事件
    targetData.value.events = undefined
  } else {
    targetData.value.events = { ...events.value }
  }
  closeEvents()
}

watch(
  () => showModal.value,
  (newData: boolean) => {
    if (newData) {
      events.value = { ...targetData.value.events }
    }
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
}
@include deep() {
  .go-editor-area {
    max-height: 530px;
  }
  .checkbox--hidden:checked {
    &+label {
      .n-icon {
        transition: all 0.3s;
        transform: rotate(180deg);
      }
    }
    &~.go-editor-area {
      display: none;
    }
  }
  // 优化代码换行
  .n-code>pre {
    white-space: break-spaces;
  }
}

</style>
