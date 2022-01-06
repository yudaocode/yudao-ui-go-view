<template>
  <ContentBox class="go-content-layers" title="图层"> </ContentBox>
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
@include go(content-layers) {
  width: $wight;
}
</style>
