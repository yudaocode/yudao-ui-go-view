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
        <div class="list-content-img" @click="resizeHandle">
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
              {{
                cardData.release
                  ? $t('project.release')
                  : $t('project.unreleased')
              }}
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
                  <n-button size="small" @click="handleSelect(item.key)">
                    <template #icon>
                      <component :is="item.icon" />
                    </template>
                  </n-button>
                </template>
                <span> {{ item.label }} </span>
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
import { reactive, h } from 'vue'
import { renderIcon, requireUrl, requireFallbackImg } from '@/utils'
import { icon } from '@/plugins'
import { AppleControlBtn } from '@/components/AppleControlBtn'
import { NText } from 'naive-ui'

const t = window['$t']

const {
  EllipsisHorizontalCircleSharpIcon,
  CopyIcon,
  TrashIcon,
  PencilIcon,
  DesktopOutlineIcon,
  DownloadIcon,
  HammerIcon,
  SendIcon
} = icon.ionicons5

const emit = defineEmits(['delete', 'resize', 'edit'])

const props = defineProps({
  cardData: Object
})
const renderNText = (set = {}) => {
  return () => h(NText, set, { default: () => h('312321') })
}
const fnBtnList = reactive([
  {
    label: t('global.r_edit'),
    key: 'edit',
    icon: renderIcon(HammerIcon)
  },
  {
    lable: t('global.r_more'),
    key: 'select',
    icon: renderIcon(EllipsisHorizontalCircleSharpIcon)
  }
])

const selectOptions = reactive([
  {
    label: t('global.r_preview'),
    key: 'preview',
    icon: renderIcon(DesktopOutlineIcon)
  },
  {
    label: t('global.r_copy'),
    key: 'copy',
    icon: renderIcon(CopyIcon)
  },
  {
    label: t('global.r_rename'),
    key: 'rename',
    icon: renderIcon(PencilIcon)
  },
  {
    type: 'divider',
    key: 'd1'
  },
  {
    label: props.cardData?.release
      ? t('global.r_unpublish')
      : t('global.r_publish'),
    key: 'send',
    icon: renderIcon(SendIcon)
  },
  {
    label: t('global.r_download'),
    key: 'download',
    icon: renderIcon(DownloadIcon)
  },
  {
    type: 'divider',
    key: 'd2'
  },
  {
    label: t('global.r_delete'),
    key: 'delete',
    icon: renderIcon(TrashIcon)
  }
])

const handleSelect = (key: string) => {
  switch (key) {
    case 'delete':
      deleteHanlde()
      break
    case 'edit':
      editHandle()
      break
  }
}

// 删除处理
const deleteHanlde = () => {
  emit('delete', props.cardData)
}

// 编辑处理
const editHandle = () => {
  emit('edit', props.cardData)
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
  border-radius: $--border-radius-base;
  border: 1px solid rgba(0, 0, 0, 0);
  @extend .go-transition;
  &:hover {
    @include hover-border-color('hover-border-color');
  }
  .list-content {
    margin-top: 20px;
    margin-bottom: 5px;
    cursor: pointer;
    border-radius: $--border-radius-base;
    @include background-image('background-point');
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
