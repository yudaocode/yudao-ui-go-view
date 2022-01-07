<template>
  <n-modal v-model:show="modelShow" @afterLeave="closeModal">
    <n-list bordered class="go-system-setting">
      <template #header> 系统设置 </template>

      <n-list-item v-for="item in list" :key="item.name">
        <n-space :size="40">
          <n-space>
            <n-text class="item-left">{{ item.name }}</n-text>
            <template v-if="item.type === 'switch'">
              <n-switch
                v-model:value="item.value"
                size="small"
                @update:value="handleChange($event, item)"
              />
            </template>
          </n-space>
          <n-space>
            <n-text class="item-right">{{ item.desc }}</n-text>
            <n-tooltip trigger="hover">
              <template #trigger>
                <n-icon size="21">
                  <HelpOutlineIcon />
                </n-icon>
              </template>
              <span>
                {{ item.tip }}
              </span>
            </n-tooltip>
          </n-space>
        </n-space>
      </n-list-item>
      <n-list-item></n-list-item>
    </n-list>
  </n-modal>
</template>

<script script lang="ts" setup>
import { reactive, h } from 'vue'
import { ListType } from './index.d'
import { useLangStore } from '@/store/modules/langStore/langStore'
import { icon } from '@/plugins'

const { HelpOutlineIcon } = icon.ionicons5

const emit = defineEmits(['update:modelShow'])

defineProps({
  modelShow: Boolean
})

const langStore = useLangStore()

const list = reactive<ListType[]>([
  {
    key: 'lang',
    value: false,
    type: 'switch',
    name: '切换语言',
    desc: '切换语言是否重新加载页面',
    tip: '不重载可能会导致部分区域语言切换失败'
  }
])

const closeModal = () => {
  emit('update:modelShow', false)
}

const handleChange = (e: Event, item: ListType) => {
  switch (item.key) {
    case 'lang':
      langStore.changeReload(item.value)
      break

    default:
      break
  }
}
</script>

<style lang="scss" scoped>
@include go('system-setting') {
  @extend .go-background-filter;
  min-width: 100px;
  max-width: 60vw;
  .item-left {
    width: 200px;
  }
}
</style>
