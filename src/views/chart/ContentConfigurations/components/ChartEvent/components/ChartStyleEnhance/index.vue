<template>
  <n-collapse-item title="样式增强编辑器" name="4">
    <template #header-extra>
      <n-button type="primary" tertiary size="small" @click.stop="showModal = true">
        <template #icon>
          <n-icon>
            <pencil-icon />
          </n-icon>
        </template>
        编辑
      </n-button>
    </template>
    <n-card class="collapse-show-box">
      <!-- 函数体 -->
      <div >
        <p>
          <span class="func-annotate">// 样式增强</span>
          <br />
          <span class="func-keyword">&lt;style&gt; </span>
        </p>
        <p class="go-ml-4">
          <n-code :code="targetData.styles.styleEnhance  || ''" language="css"></n-code>
        </p>
        <p>
          <span class="func-keyword">&lt;/style&gt;</span>
        </p>
      </div>
    </n-card>
  </n-collapse-item>

  <!-- 弹窗 -->
  <n-modal class="go-chart-data-monaco-editor" v-model:show="showModal" :mask-closable="false">
    <n-card :bordered="false" role="dialog" size="small" aria-modal="true" style="width: 1200px; height: 700px">
      <template #header>
        <n-space>
          <n-text>样式增强编辑器</n-text>
        </n-space>
      </template>

      <template #header-extra> </template>
      <n-layout has-sider sider-placement="right">
        <n-layout style="height: 580px; padding-right: 20px">

            <!-- 提示 -->
            <template #suffix>
              <n-text class="tab-tip" type="warning">提示:请配合组件ID使用样式</n-text>
            </template>
            <n-tab-pane
              tab="CSS样式增强"
              name="CSS样式增强"
            >
              <!-- 函数名称 -->
              <p class="go-pl-3">
                <span class="func-keyword">&lt;style&gt; </span>
                <span class="func-keyNameWord"></span>
              </p>
              <!-- 编辑主体 -->
              <monaco-editor v-model:modelValue="baseEvent" height="480px" language="css" />
              <!-- 函数结束 -->
              <p class="go-pl-3 func-keyword">
                &lt;/style&gt;
              </p>
            </n-tab-pane>

        </n-layout>
        <n-layout-sider
          :collapsed-width="14"
          :width="340"
          show-trigger="bar"
          collapse-mode="transform"
          content-style="padding: 12px 12px 0px 12px;margin-left: 3px;"
        >

<!--          <n-tabs default-value="1" justify-content="space-evenly" type="segment">-->
            <!-- 验证结果 -->
<!--            <n-tab-pane tab="验证结果" name="1" size="small">-->
<!--              <n-scrollbar trigger="none" style="max-height: 505px">-->
<!--                <n-collapse class="go-px-3" arrow-placement="right" :default-expanded-names="[1, 2, 3]">-->
<!--                  <template v-for="error in [validEvents()]" :key="error">-->
<!--                    <n-collapse-item title="错误函数" :name="1">-->
<!--                      <n-text depth="3">{{ error.errorFn || '暂无' }}</n-text>-->
<!--                    </n-collapse-item>-->
<!--                    <n-collapse-item title="错误信息" :name="2">-->
<!--                      <n-text depth="3">{{ error.name || '暂无' }}</n-text>-->
<!--                    </n-collapse-item>-->
<!--                    <n-collapse-item title="堆栈信息" :name="3">-->
<!--                      <n-text depth="3">{{ error.message || '暂无' }}</n-text>-->
<!--                    </n-collapse-item>-->
<!--                  </template>-->
<!--                </n-collapse>-->
<!--              </n-scrollbar>-->
<!--            </n-tab-pane>-->
<!--            &lt;!&ndash; 辅助说明 &ndash;&gt;-->
<!--            <n-tab-pane tab="变量说明" name="2">-->
<!--              <n-scrollbar trigger="none" style="max-height: 505px">-->
<!--                <n-collapse class="go-px-3" arrow-placement="right" :default-expanded-names="[1, 2]">-->
<!--                  <n-collapse-item title="mouseEvent" :name="1">-->
<!--                    <n-text depth="3">鼠标事件对象</n-text>-->
<!--                  </n-collapse-item>-->
<!--                </n-collapse>-->
<!--              </n-scrollbar>-->
<!--            </n-tab-pane>-->
<!--          </n-tabs>-->

        </n-layout-sider>
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
            <n-text class="go-ml-2" depth="2">编写方式同正常 CSS 写法</n-text>
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
import { ref, computed, watch, toRefs, toRaw } from 'vue'
import { MonacoEditor } from '@/components/Pages/MonacoEditor'
import { useTargetData } from '../../../hooks/useTargetData.hook'
import { BaseEvent } from '@/enums/eventEnum'
import { icon } from '@/plugins'
const { targetData, chartEditStore } = useTargetData()
const { DocumentTextIcon, ChevronDownIcon, PencilIcon } = icon.ionicons5
// import { validateCSS } from 'css-validator';
// import  Linter  from 'stylelint';
const EventTypeName = {
  cssEnhance: 'CSS样式'
}

// 受控弹窗
const showModal = ref(false)
// const linter = new Linter();
// events 函数模板
let baseEvent = ref(targetData.value.styles.styleEnhance)
// 事件错误标识
const errorFlag = ref(false)


// 验证语法
// const validEvents = () => {
//   let errorFn = ''
//   let message = ''
//   let name = ''
//
//   linter.lint({
//     code: baseEvent.value,
//     // 如果你的配置文件在项目的根目录，可以省略config参数
//     // config: '.stylelint.config.js',
//   }, (err:any) => {
//     if (err) {
//       console.error('Stylelint error:', err);
//     } else {
//       console.log('No stylelint errors found.');
//     }
//   });
//
//
//   try {
//   validateCSS( baseEvent.value,  (isValid) => {
//     // message = data.validity
//     // name = data.errors
//     // errorFn = data.warnings
//     return isValid
//   });
//   } catch (error: any) {
//         message = error.message
//         name = error.name
//
//         return false
//       }
//   // errorFlag.value = Object.entries(baseEvent.value).every(([eventName, str]) => {
//   //   try {
//   //     // 支持await，验证语法
//   //     const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor
//   //     new AsyncFunction(str)
//   //     return true
//   //   } catch (error: any) {
//   //     message = error.message
//   //     name = error.name
//   //     errorFn = eventName
//   //     return false
//   //   }
//   // })
//   return {
//     errorFn,
//     message,
//     name
//   }
// }

// 关闭事件
const closeEvents = () => {
  showModal.value = false
}

// 新增事件
const saveEvents = () => {
  // if (validEvents().errorFn) {
  //   window['$message'].error('事件函数错误，无法进行保存')
  //   return
  // }

    targetData.value.styles.styleEnhance = baseEvent.value

  closeEvents()
}

watch(
  () => showModal.value,
  (newData: boolean) => {
    if (newData) {
      baseEvent.value = targetData.value.styles.styleEnhance
    }
  }
)
</script>
<style lang="scss" scoped>
@import '../index.scss';
</style>
