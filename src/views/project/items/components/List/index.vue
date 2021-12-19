<template>
  <div class="go-items-list">
    <n-grid
      :x-gap="20"
      :y-gap="20"
      cols="2 s:2 m:3 l:4 xl:4 xxl:4"
      responsive="screen"
    >
      <n-grid-item v-for="item in list" :key="item.id">
        <Card :CardData="item" />
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Card } from '../Card/index'
import {
  EllipsisHorizontalSharp as EllipsisHorizontalCircleSharpIcon,
  CopyOutline as CopyIcon
} from '@vicons/ionicons5'
const loading = ref<boolean>(true)

setTimeout(() => {
  loading.value = false
}, 500)

const list = reactive([
  {
    id: 1,
    title: '物料1',
    release: true
  },
  {
    id: 2,
    title: '物料1'
  },
  {
    id: 3,
    title: '物料1'
  },
  {
    id: 4,
    title: '物料1'
  },
  {
    id: 5,
    title: '物料1'
  }
])
</script>

<style lang="scss" scoped>
$contentHeight: 250px;
@include go('items-list') {
  .list-content {
    position: relative;
    height: $contentHeight;
  }
}
</style>
