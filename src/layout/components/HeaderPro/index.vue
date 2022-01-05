<template>
  <Header>
    <template #left>
      <slot name="left"></slot>
    </template>
    <template #ri-left>
      <slot name="ri-left"></slot>
    </template>
    <template #ri-right>
      <UserInfo />
      <slot name="ri-right"></slot>
    </template>
  </Header>
</template>
<script setup lang="ts">
import { Header } from '@/layout/components/Header'
import { UserInfo } from '@/components/UserInfo'
</script>
