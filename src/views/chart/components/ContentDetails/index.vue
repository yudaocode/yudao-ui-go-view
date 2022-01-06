<template>
  <ContentBox class="go-content-layers go-boderbox" :showTop="false">
    <n-tabs size="small" type="segment">
      <n-tab-pane name="chap1" display-directive="show:lazy">
        <template #tab>
          <n-space>
            <span>配置项</span>
            <n-icon size="16" class="icon-position">
              <CubeIcon />
            </n-icon>
          </n-space>
        </template>
        1
      </n-tab-pane>
      <n-tab-pane name="chap2" display-directive="show:lazy">
         <template #tab>
          <n-space>
            <span>后端数据</span>
            <n-icon size="16" class="icon-position">
              <FlashIcon />
            </n-icon>
          </n-space>
        </template>
        2
      </n-tab-pane>
    </n-tabs>
  </ContentBox>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { renderIcon } from '@/utils'
import { icon } from '@/plugins'
import { ContentBox } from '../ContentBox/index'

const { CubeIcon, FlashIcon } = icon.ionicons5
</script>

<style lang="scss" scoped>
$wight: 400px;
@include go(content-layers) {
  width: $wight;
  padding: 10px;
  .icon-position {
    padding-top: 2px;
    color: #70c0e8;
  }
}
</style>
