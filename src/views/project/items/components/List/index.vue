<template>
  <div class="go-items-list">
    <n-grid
      :x-gap="20"
      :y-gap="20"
      cols="2 s:2 m:3 l:4 xl:4 xxl:4"
      responsive="screen"
    >
      <n-grid-item v-for="(item, index) in list" :key="item.id">
        <Card
          :cardData="item"
          @resize="resizeHandle"
          @delete="deleteHandle($event, index)"
        />
      </n-grid-item>
    </n-grid>
  </div>
  <ModalCard v-model:show="modalShow" :cardData="modalData" @close="closeModal" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Card } from '../Card/index'
import { ModalCard } from '../ModalCard/index'
import { icon } from '@/plugins'
import { useModalDataInit } from './hooks/useModal.hook'
import { useDataListInit } from './hooks/useData.hook'

const { CopyIcon, EllipsisHorizontalCircleSharpIcon } = icon.ionicons5

const { modalData, modalShow, closeModal, resizeHandle } = useModalDataInit()

const { list, deleteHandle } = useDataListInit()
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
