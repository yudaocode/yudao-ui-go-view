<template>
  <Header>
    <template #ri-left>
    </template>
    <template #ri-right>
      <UserInfo />
    </template>
  </Header>
</template>
<script setup lang="ts">
import { Header } from '@/layout/components/Header'
import { UserInfo } from '@/components/UserInfo'
</script>
