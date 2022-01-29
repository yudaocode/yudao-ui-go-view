<template>
  <div class="go-content-layers-list-item go-flex-center">
    <n-image
      class="list-img"
      object-fit="contain"
      preview-disabled
      :src="image"
      :fallback-src="requireFallbackImg()"
    />
    <n-ellipsis>
      <b-text class="list-text">
        {{ title }}
      </b-text>
    </n-ellipsis>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { requireFallbackImg } from '@/utils'
import { useDesignStore } from '@/store/modules/designStore/designStore'
// 全局颜色
const designStore = useDesignStore()
const themeColor = ref(designStore.getAppTheme)

const props = defineProps({
  componentData: {
    type: Object,
    required: true
  }
})
const { image, title } = toRefs(props.componentData.chartData)
</script>

<style lang="scss" scoped>
$centerHeight: 40px;
$textSize: 10px;

@include go(content-layers-list-item) {
  justify-content: start !important;
  padding: 6px 10px;
  cursor: pointer;
  margin-bottom: 5px;
  @extend .go-transition-quick;
  &:hover {
    @include filter-bg-color('background-color4');
    color: v-bind('themeColor');
  }
  .list-img {
    flex-shrink: 0;
    height: $centerHeight;
    border-radius: 5px;
    overflow: hidden;
    border: 1px solid;
    padding: 2px;
    @include hover-border-color('hover-border-color')
  }
  .list-text {
    padding-left: 10px;
    font-size: $textSize;
  }
}
</style>
