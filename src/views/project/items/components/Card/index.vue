<template>
  <div class="go-items-list-card">
    <n-card hoverable size="small">
      <div class="list-content">
        <!-- 顶部按钮 -->
        <n-space class="list-content-top">
          <AppleControlBtn @close="deleteHanlde" />
        </n-space>
        <!-- 中间 -->
        <div class="list-content-img">
          <n-image
            object-fit="contain"
            height="200"
            :src="requireUrl('.', '20211219181327.png')"
            :alt="CardData.title"
          />
        </div>
      </div>
      <template #action>
        <Skeleton v-if="loading" :loading="loading" text round size="small" />
        <n-space v-else justify="space-between">
          <n-text>
            {{ CardData.title || '' }}
          </n-text>

          <!-- 工具 -->
          <n-space>
            <n-text>
              <n-badge class="animation-twinkle" dot :color="CardData.release ? '#34c749' : '#fcbc40'" />
              {{ CardData.release ? '已发布' : '未发布' }}
            </n-text>

            <template v-for="item in fnBtnList" :key="item.key">
              <template v-if="item.key === 'select'">
                <n-dropdown
                  trigger="hover"
                  placement="bottom-start"
                  :options="selectOptions"
                  :show-arrow="true"
                  @select="handleSelect"
                >
                  <n-button size="small">
                    <template #icon>
                      <component :is="item.icon" />
                    </template>
                  </n-button>
                </n-dropdown>
              </template>

              <n-button v-else size="small">
                <template #icon>
                  <component :is="item.icon" />
                </template>
              </n-button>
            </template>
          </n-space>
          <!-- end -->
        </n-space>
      </template>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { renderIcon, goDialog } from '@/utils/index'
import { icon } from '@/plugins'
import { AppleControlBtn } from '@/components/AppleControlBtn'
import { useMessage, useDialog } from 'naive-ui'
const {
  EllipsisHorizontalCircleSharpIcon,
  CopyIcon,
  TrashIcon,
  PencilIcon,
  ApertureSharpIcon,
  DownloadIcon
} = icon.ionicons5

const loading = ref<boolean>(true)
const dialog = useDialog()
const message = useMessage()
defineProps({
  CardData: Object
})

const fnBtnList = [
  {
    lable: '更多',
    key: 'select',
    icon: renderIcon(EllipsisHorizontalCircleSharpIcon)
  }
]

const selectOptions = [
  {
    label: '预览',
    key: 'preview',
    icon: renderIcon(ApertureSharpIcon)
  },
  {
    label: '复制',
    key: 'copy',
    icon: renderIcon(CopyIcon)
  },
  {
    label: '重命名',
    key: 'rename',
    icon: renderIcon(PencilIcon)
  },
  {
    label: '下载',
    key: 'download',
    icon: renderIcon(DownloadIcon)
  },
  {
    type: 'divider',
    key: 'd1'
  },
  {
    label: '删除',
    key: 'delete',
    icon: renderIcon(TrashIcon)
  }
]

const handleSelect = (key: string) => {
  console.log(key)
}

const requireUrl = (path: string, name: string) => {
  return new URL(`${path}/${name}`, import.meta.url).href
}

const deleteHanlde = () => {
  goDialog(dialog.warning, {
    type: 'delete',
    onPositiveCallback: () => {
      message.success('确定')
    }
  })
}

setTimeout(() => {
  loading.value = false
}, 1500)
</script>

<style lang="scss" scoped>
$contentHeight: 200px;
@include go('items-list-card') {
  position: relative;
  .list-content {
    margin-top: 20px;
    margin-bottom: 5px;
    border-radius: $--border-radius-base;
    @include background-point('background-point');
    @extend .go-point-bg;
    &-top {
      position: absolute;
      top: 5px;
      left: 10px;
      height: 22px;
    }
    &-img {
      height: $contentHeight;
      @extend .go-flex-center;
      @extend .go-border-radius;
      @include deep() {
        img {
          @extend .go-border-radius;
        }
      }
    }
  }
}
</style>
