<template>
  <n-modal v-model:show="modelShowRef" @afterLeave="closeHandle">
    <n-list bordered class="go-system-info">
      <template #header>
        <n-space justify="space-between">
          <n-h3 class="go-mb-0">关于我们</n-h3>
          <n-icon size="20" class="go-cursor-pointer" @click="closeHandle">
            <close-icon></close-icon>
          </n-icon>
        </n-space>
      </template>

      <n-list-item>
        <n-space class="go-my-2" :size="20">
          <n-text class="item-left">&nbsp; Boot 后端：</n-text>
          <n-text>
            对应 <n-a href="https://gitee.com/zhijiantianya/ruoyi-vue-pro" target="_blank">https://gitee.com/zhijiantianya/ruoyi-vue-pro</n-a> 项目
          </n-text>
        </n-space>
      </n-list-item>
      <n-list-item>
        <n-space class="go-my-2" :size="20">
          <n-text class="item-left">Cloud 后端：</n-text>
          <n-text>
            对应 <n-a href="https://gitee.com/zhijiantianya/yudao-cloud" target="_blank">https://gitee.com/zhijiantianya/yudao-cloud</n-a> 项目
          </n-text>
        </n-space>
      </n-list-item>

      <n-list-item>
        <n-space class="go-my-2" :size="20">
          <n-text class="item-left" type="error">重要重要：</n-text>
          <n-text type="error">
            如下声明来自 GoView，和 ruoyi-vue-pro / yudao-cloud 项目无关，它们还是免费、免授权可使用！！！
          </n-text>
        </n-space>
      </n-list-item>

      <n-list-item>
        <n-space class="go-my-2" :size="20">
          <n-text class="item-left">版权声明：</n-text>
          <n-text>
            GoView 版权属于
            <n-a href="https://gitee.com/MTrun/go-view" target="_blank">https://gitee.com/MTrun/go-view</n-a> 项目作者
          </n-text>
        </n-space>
      </n-list-item>

      <n-list-item>
        <n-space class="go-my-2" :size="20">
          <n-text class="item-left">协议备注：</n-text>
          <n-text>
            请遵守开源 MIT 协议，以上声明 <n-text type="error">不可删除</n-text>，否则视作侵权行为，后果自负！
          </n-text>
        </n-space>
      </n-list-item>

      <n-list-item>
        <n-space  class="go-mt-2" :size="20">
          <n-text class="item-left">商业授权：</n-text>
          <n-text>
            若不想保留版权声明，请通过仓库/交流群 联系项目作者，进行授权
          </n-text>
        </n-space>
      </n-list-item>
    </n-list>
  </n-modal>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { icon } from '@/plugins'

const props = defineProps({
  modelShow: Boolean
})

const emit = defineEmits(['update:modelShow'])
const { HelpOutlineIcon, CloseIcon } = icon.ionicons5
const modelShowRef = ref(false)

watch(() => props.modelShow, (newValue) => {
  modelShowRef.value = newValue
})

const closeHandle = () => {
  emit('update:modelShow', false)
}
</script>

<style lang="scss" scoped>
@include go('system-info') {
  @extend .go-background-filter;
  min-width: 100px;
  max-width: 60vw;
  padding-bottom: 20px;
  .item-left {
    width: 200px;
  }
  @include deep() {
    .n-list-item:not(:last-child) {
      border-bottom: 0;
    }
  }
}
</style>
