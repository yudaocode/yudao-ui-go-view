<template>
  <GoHeader>
    <template #left>
      <slot name="left"></slot>
    </template>
    <template #center>
      <slot name="center"></slot>
    </template>
    <template #ri-left>
      <slot name="ri-left"></slot>
    </template>
    <template #ri-right>
      <uer-info></uer-info>
      <slot name="ri-right"></slot>
    </template>
  </GoHeader>
</template>
<script setup lang="ts">
import { GoHeader } from '@/layout/components/GoHeader'
import { UserInfo } from '@/components/UserInfo'
</script>
