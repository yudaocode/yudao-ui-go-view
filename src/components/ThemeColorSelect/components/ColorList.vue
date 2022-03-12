<template>
  <div
    class="content-left-item go-transition-quick"
    span="12 1000:6 1400:4 1800:4 2200:2"
    v-for="(item, index) in designColor"
    :key="index"
    @click="colorSelectHandle(item)"
  >
    <n-space>
      <div class="content-left-item-color" :style="{ backgroundColor: item.hex }" />
      <n-space vertical>
        <n-space>
          <span :style="{ color: item.hex }">{{ item.name }}</span>
          <span class="Pinyin-upper">{{ item.pinyin.toUpperCase() }}</span>
        </n-space>
        <n-text>
          {{ item.hex }}
          <n-divider vertical />
          {{
            `rgb(${item.RGB[0]}, ${item.RGB[0]}, ${item.RGB[0]})`
          }}
        </n-text>
      </n-space>
    </n-space>
  </div>
</template>

<script lang="ts" setup>
import { AppThemeColorType } from '@/store/modules/designStore/designStore.d'
import designColor from '@/settings/designColor.json'

const emits = defineEmits(['colorSelectHandle'])

const colorSelectHandle = (color: AppThemeColorType) => {
  emits('colorSelectHandle', color)
}
</script>

<style lang="scss" scoped>
.content-left-item {
  position: relative;
  display: flex;
  margin-bottom: 20px;
  margin-right: 20px;
  padding: 10px 20px;
  min-width: 300px;
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0);
  &:hover {
    @include hover-border-color("background-color5");
  }
  &::after {
    content: "";
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.7;
    overflow: hidden;
    border-radius: 5px;
    @extend .go-background-filter-shallow;
  }
  &-color {
    width: 8px;
    height: 40px;
    border-radius: 2px;
  }
  .Pinyin-upper {
    font-size: 8px;
  }
}
</style>
