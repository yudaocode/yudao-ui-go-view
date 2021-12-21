<template>
  <!-- mask-closable 暂时是失效的，不知道为啥 -->
  <n-modal
    class="go-modal-box"
    v-model:show="show"
    @on-after-leave="closeHandle"
  >
    <n-card hoverable size="small">
      <div class="list-content">
        <!-- 标题 -->
        <n-space class="list-content-top go-px-0" justify="center">
          <n-space>
            <n-text>
              {{ cardData?.title || '' }}
            </n-text>
          </n-space>
        </n-space>
        <!-- 顶部按钮 -->
        <n-space class="list-content-top">
          <AppleControlBtn
            :narrow="true"
            :hidden="['close']"
            @remove="closeHandle"
          />
        </n-space>
        <!-- 中间 -->
        <div class="list-content-img">
          <img
            :src="
              requireUrl('../assets/images/project', 'moke-20211219181327.png')
            "
            :alt="cardData?.title"
          />
        </div>
      </div>
      <template #action>
        <n-space class="list-footer" justify="space-between">
          <n-text depth="3">
            最后编辑于：
            <n-time :time="new Date()" format="yyyy-MM-dd hh:mm" />
          </n-text>
          <!-- 工具 -->
          <n-space>
            <n-text>
              <n-badge
                class="animation-twinkle"
                dot
                :color="cardData?.release ? '#34c749' : '#fcbc40'"
              />
              {{ cardData?.release ? '已发布' : '未发布' }}
            </n-text>

            <template v-for="item in fnBtnList" :key="item.key">
              <n-tooltip placement="bottom" trigger="hover">
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
  </n-modal>
</template>

<script setup lang="ts">
import { watchEffect } from 'vue'
import { renderIcon, requireUrl, requireFallbackImg } from '@/utils'
import { icon } from '@/plugins'
import { AppleControlBtn } from '@/components/AppleControlBtn'
const { HammerIcon } = icon.ionicons5

const emit = defineEmits(['close'])

const props = defineProps({
  show: Boolean,
  cardData: Object
})

// 解决点击模态层不会触发 @on-after-leave 的问题
watchEffect(() => {
  if (!props.show && props.cardData) {
    closeHandle()
  }
})

const fnBtnList = [
  {
    label: '编辑',
    key: 'edit',
    icon: renderIcon(HammerIcon)
  }
]

// 关闭对话框
const closeHandle = () => {
  emit('close')
}
</script>

<style lang="scss" scoped>
$padding: 30px;
$contentHeight: calc(80vh);
$contentWidth: calc(82vw);

@include go('modal-box') {
  width: $contentWidth;
  .list-content {
    margin-top: 20px;
    border-radius: $--border-radius-base;
    overflow: hidden;
    @include background-point('background-point');
    @extend .go-point-bg;
    &-top {
      position: absolute;
      top: 7px;
      left: 0px;
      padding-left: 10px;
      height: 22px;
      width: $contentWidth;
    }
    &-img {
      @extend .go-flex-center;
      img {
        max-height: $contentHeight;
        min-height: 200px;
        max-width: 100%;
        @extend .go-border-radius;
      }
    }
  }
  .list-footer {
    line-height: 30px;
  }
}
</style>
