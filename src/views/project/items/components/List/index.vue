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
  <ModalCard :show="modalShow" :cardData="modalData" @close="closeModal" />
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Card } from '../Card/index'
import { ModalCard } from '../ModalCard/index'
import { goDialog } from '@/utils'
import { DialogEnum } from '@/enums/pluginEnum'
import { icon } from '@/plugins'

const { CopyIcon, EllipsisHorizontalCircleSharpIcon } = icon.ionicons5

const list = ref([
  {
    id: 1,
    title: '物料1',
    release: true
  },
  {
    id: 2,
    title: '物料2',
    release: false
  },
  {
    id: 3,
    title: '物料3',
    release: false
  },
  {
    id: 4,
    title: '物料4',
    release: false
  },
  {
    id: 5,
    title: '物料5',
    release: false
  }
])

const modalData = ref({})
const modalShow = ref(false)

// 删除
const deleteHandle = (cardData: object, index: number) => {
  goDialog({
    type: DialogEnum.delete,
    promise: true,
    onPositiveCallback: () =>
      new Promise(res => setTimeout(() => res(1), 1000)),
    promiseResCallback: (e: any) => {
      window.$message.success('删除成功')
      list.value.splice(index, 1)
    }
  })
}

// 关闭 modal
const closeModal = () => {
  modalShow.value = false
}

// 打开 modal
const resizeHandle = (cardData: object) => {
  modalShow.value = true
  modalData.value = cardData
}
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
