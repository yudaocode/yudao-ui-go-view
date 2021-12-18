<template>
  <div class="go-items-list">
    <n-grid
      :x-gap="20"
      :y-gap="20"
      cols="2 s:2 m:3 l:4 xl:4 xxl:4"
      responsive="screen"
    >
      <n-grid-item v-for="item in list" :key="item.id">
        <n-card hoverable size="small">
          <div class="list-content">
            <n-space>
              <n-button size="small">
                <template #icon>
                  <n-icon>
                    <EllipsisHorizontalCircleSharpIcon />
                  </n-icon>
                </template>
              </n-button>
            </n-space>
            <div class="list-content-top"></div>
            <n-image
              object-fit="cover"
              width="100"
              src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
              :alt="item.title"
            />
          </div>
          <template #action>
            <n-skeleton v-if="loading" round size="medium" />
            <n-space v-else justify="space-between">
              <n-text>
                奔跑的模板
              </n-text>
              <!-- 工具 -->
              <n-space>
                <n-button size="small">
                  <template #icon>
                    <n-icon>
                      <EllipsisHorizontalCircleSharpIcon />
                    </n-icon>
                  </template>
                </n-button>
                <n-button size="small">
                  <template #icon>
                    <n-icon>
                      <CopyIcon />
                    </n-icon>
                  </template>
                </n-button>
              </n-space>
              <!-- end -->
            </n-space>
          </template>
        </n-card>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import {
  EllipsisHorizontalSharp as EllipsisHorizontalCircleSharpIcon,
  CopyOutline as CopyIcon
} from '@vicons/ionicons5'
const loading = ref<boolean>(true)

setTimeout(() => {
  loading.value = false
}, 200)

const list = reactive([
  {
    id: 1,
    title: '物料1'
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
