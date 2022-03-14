<template>
  <div class="go-items-list">
    <n-grid
      :x-gap="20"
      :y-gap="20"
      cols="2 s:2 m:3 l:4 xl:4 xxl:4"
      responsive="screen"
    >
      <n-grid-item v-for="(item, index) in list" :key="item.id">
        <card
          :cardData="item"
          @resize="resizeHandle"
          @delete="deleteHandle($event, index)"
          @edit="editHandle"
       ></card>
      </n-grid-item>
    </n-grid>
  </div>
  <ModalCard
    v-if="modalData"
    v-model:modalShow="modalShow"
    :cardData="modalData"
    @close="closeModal"
    @edit="editHandle"
 ></ModalCard>
</template>

<script setup lang="ts">
import { Card } from '../Card/index'
import { ModalCard } from '../ModalCard/index'
import { icon } from '@/plugins'
import { useModalDataInit } from './hooks/useModal.hook'
import { useDataListInit } from './hooks/useData.hook'

const { CopyIcon, EllipsisHorizontalCircleSharpIcon } = icon.ionicons5
const { list, deleteHandle } = useDataListInit()
const {
  modalData,
  modalShow,
  closeModal,
  resizeHandle,
  editHandle
} = useModalDataInit()
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
