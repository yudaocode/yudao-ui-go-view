<template>
  <div class="go-items-list-card">
    <n-card hoverable size="small">
      <div class="list-content">
        <!-- 顶部按钮 -->
        <div class="list-content-top">
          <AppleControlBtn
            class="top-btn"
            :hidden="['remove']"
            @close="deleteHanlde"
            @resize="resizeHandle"
          />
        </div>
        <!-- 中间 -->
        <div class="list-content-img">
          <n-image
            object-fit="contain"
            height="200"
            preview-disabled
            :src="
              requireUrl('../assets/images/project', 'moke-20211219181327.png')
            "
            :alt="cardData.title"
            :fallback-src="requireFallbackImg()"
          />
        </div>
      </div>
      <template #action>
        <n-space class="list-footer" justify="space-between">
          <n-text>
            {{ cardData.title || '' }}
          </n-text>
          <!-- 工具 -->
          <n-space>
            <n-text>
              <n-badge
                class="animation-twinkle"
                dot
                :color="cardData.release ? '#34c749' : '#fcbc40'"
              />
              {{ cardData.release ? '已发布' : '未发布' }}
            </n-text>

            <template v-for="item in fnBtnList" :key="item.key">
              <template v-if="item.key === 'select'">
                <n-dropdown
                  trigger="hover"
                  placement="bottom"
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

              <n-tooltip v-else placement="bottom" trigger="hover">
                <template #trigger>
                  <n-button size="small">
                    <template #icon>
                      <component :is="item.icon" />
                    </template>
                  </n-button>
                </template>
                <span> {{ item.label }}</span>
              </n-tooltip>
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
import { renderIcon, requireUrl, requireFallbackImg } from '@/utils'
import { icon } from '@/plugins'
import { AppleControlBtn } from '@/components/AppleControlBtn'
import { useMessage, useDialog } from 'naive-ui'

const {
  EllipsisHorizontalCircleSharpIcon,
  CopyIcon,
  TrashIcon,
  PencilIcon,
  ApertureSharpIcon,
  DownloadIcon,
  HammerIcon,
  SendIcon
} = icon.ionicons5

const dialog = useDialog()
const message = useMessage()

const emit = defineEmits(['delete', 'resize'])

const props = defineProps({
  cardData: Object
})

const fnBtnList = [
  {
    label: '编辑',
    key: 'edit',
    icon: renderIcon(HammerIcon)
  },
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
    type: 'divider',
    key: 'd1'
  },
  {
    label: props.cardData?.release ? '取消发布' : '发布',
    key: 'send',
    icon: renderIcon(SendIcon)
  },
  {
    label: '下载',
    key: 'download',
    icon: renderIcon(DownloadIcon)
  },
  {
    type: 'divider',
    key: 'd2'
  },
  {
    label: '删除',
    key: 'delete',
    icon: renderIcon(TrashIcon)
  }
]

const handleSelect = (key: string) => {
  switch (key) {
    case 'delete':
      deleteHanlde()
      break

    default:
      break
  }
}

// 删除处理
const deleteHanlde = () => {
  emit('delete', props.cardData)
}

// 放大处理
const resizeHandle = () => {
  emit('resize', props.cardData)
}
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
      top: 10px;
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
  .list-footer {
    line-height: 30px;
  }
}
</style>
