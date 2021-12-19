<template>
  <div class="go-apple-control-btn">
    <template v-for="item in btnList" :key="item.key">
      <div
        class="btn"
        :class="[item.key, disabled && 'disabled']"
        @click="handleClick(item.key)"
      >
        <n-icon size="10" class="icon-base" :class="{ hover: !disabled }">
          <component :is="item.icon" />
        </n-icon>
      </div>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { renderIcon } from '@/utils/index'
import { icon } from '@/plugins'

const emit = defineEmits(['close', 'remove', 'resize'])

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
})

const { CloseIcon, RemoveIcon, ResizeIcon } = icon.ionicons5

const btnList = [
  {
    title: '关闭',
    key: 'close',
    icon: CloseIcon
  },
  {
    title: '缩小',
    key: 'remove',
    icon: RemoveIcon
  },
  {
    title: '放大',
    key: 'resize',
    icon: ResizeIcon
  }
]

const handleClick = (key: 'close' | 'remove' | 'resize') => {
  console.log(key)
  emit(key)
}
</script>

<style lang="scss" scoped>
@include go('apple-control-btn') {
  display: flex;
  &:hover {
    .btn {
      .hover {
        cursor: pointer;
        opacity: 1;
      }
    }
  }
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
    margin: 0 4px;
    color: $--color-text;
    font-weight: bold;
    border-radius: 50%;
    &.disabled {
      pointer-events:none;
    }
    .icon-base {
      opacity: 0;
    }
    .hover {
      @extend .go-transition;
    }
  }
  .close {
    background-color: $--color-red;
  }
  .remove {
    background-color: $--color-warn;
  }
  .resize {
    background-color: $--color-success;
  }
}
</style>
