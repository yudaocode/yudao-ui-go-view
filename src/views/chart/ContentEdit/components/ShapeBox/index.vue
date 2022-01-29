<template>
  <div class="go-shape-box">
    <slot></slot>

    <!-- 选中 -->
    <div class="shape-modal" :style="useSizeStyle(item.attr)">
      <div v-if="select" class="shape-modal-select"></div>
      <div v-if="select || hover" class="shape-modal-change"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, PropType } from 'vue'
import { useChartEditStoreStore } from '@/store/modules/chartEditStore/chartEditStore'
import { useDesignStore } from '@/store/modules/designStore/designStore'
import { CreateComponentType } from '@/packages/index.d'
import { useSizeStyle } from '../../hooks/useStyle.hook'

const props = defineProps({
  item: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

// 全局颜色
const designStore = useDesignStore()
const themeColor = ref(designStore.getAppTheme)
const chartEditStore = useChartEditStoreStore()

// 计算当前选中目标
const hover = computed(() => {
  return props.item.id === chartEditStore.getTargetChart.hoverIndex
})

const select = computed(() => {
  return props.item.id === chartEditStore.getTargetChart.selectIndex
})
</script>

<style lang="scss" scoped>
@include go(shape-box) {
  position: absolute;
  .shape-modal {
    position: absolute;
    top: 0;
    left: 0;
    .shape-modal-select {
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0.1;
      border-radius: 10px;
      background-color: v-bind('themeColor');
    }
    .shape-modal-change {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 10px;
      border: 2px solid v-bind('themeColor');
    }
  }
}
</style>
