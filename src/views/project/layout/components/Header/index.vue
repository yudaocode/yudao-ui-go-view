<template>
  <go-header>
    <template #ri-left>
    </template>
    <template #ri-right>
      <user-info></user-info>
    </template>
  </go-header>
</template>
<script setup lang="ts">
import { GoHeader } from '@/layout/components/GoHeader'
import { UserInfo } from '@/components/UserInfo'
</script>
