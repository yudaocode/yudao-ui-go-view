<template>
  <ContentBox class="go-content-charts" title="图表" :depth="2">
    <n-scrollbar></n-scrollbar>
  </ContentBox>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { renderIcon } from '@/utils'
import { icon } from '@/plugins'
const {} = icon.ionicons5
import { ContentBox } from '../ContentBox/index'
</script>

<style lang="scss" scoped>
$wight: 200px;
@include go(content-charts) {
  width: $wight;
}
</style>
