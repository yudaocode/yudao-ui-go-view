<template>
  <n-modal v-model:show="modelShow" @afterLeave="closeHandle">
    <n-list bordered class="go-system-setting">
      <template #header>
        <n-h3 class="go-mb-0">系统设置</n-h3>
      </template>

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
            <n-tooltip v-if="item.tip" trigger="hover">
              <template #trigger>
                <n-icon size="21">
                  <HelpOutlineIcon />
                </n-icon>
              </template>
              <span>{{ item.tip }}</span>
            </n-tooltip>
          </n-space>
        </n-space>
      </n-list-item>
      <n-list-item></n-list-item>
    </n-list>
  </n-modal>
</template>

<script script lang="ts" setup>
import { reactive } from 'vue'
import { ListType } from './index.d'
import { useLangStore } from '@/store/modules/langStore/langStore'
import { useDesignStore } from '@/store/modules/designStore/designStore'
import { useSettingStore } from '@/store/modules/settingStore/settingStore'
import { SettingStoreEnums } from '@/store/modules/settingStore/settingStore.d'
import { icon } from '@/plugins'

const { HelpOutlineIcon } = icon.ionicons5

const emit = defineEmits(['update:modelShow'])

defineProps({
  modelShow: Boolean
})

const langStore = useLangStore()
const designStore = useDesignStore()
const settingStore = useSettingStore()

const list = reactive<ListType[]>([
  {
    key: 'aollapsed',
    value: designStore.asideAllCollapsed,
    type: 'switch',
    name: '菜单折叠',
    desc: '左侧菜单全部折叠',
  },
  {
    key: SettingStoreEnums.HIDE_PACKAGE_ONE_CATEGORY,
    value: settingStore.getHidePackageOneCategory,
    type: 'switch',
    name: '隐藏分类',
    desc: '工作空间表单分类只有单项时隐藏',
  },
  {
    key: 'lang',
    value: langStore.getReload,
    type: 'switch',
    name: '切换语言',
    desc: '切换语言重新加载页面',
    tip: '若遇到部分区域语言切换失败，则开启'
  },
])

const closeHandle = () => {
  emit('update:modelShow', false)
}

const handleChange = (e: Event, item: ListType) => {
  switch (item.key) {
    case 'lang':
      langStore.changeReload(item.value)
      break
    case 'aollapsed':
      designStore.changeAsideAllCollapsed()
      break
    case SettingStoreEnums.HIDE_PACKAGE_ONE_CATEGORY:
      settingStore.setItem(SettingStoreEnums.HIDE_PACKAGE_ONE_CATEGORY, item.value)
      break
  }
}
</script>

<style lang="scss" scoped>
@include go("system-setting") {
  @extend .go-background-filter;
  min-width: 100px;
  max-width: 60vw;
  .item-left {
    width: 200px;
  }
}
</style>
