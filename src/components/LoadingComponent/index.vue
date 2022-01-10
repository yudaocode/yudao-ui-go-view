<template>
  <div>
    <Skeleton repeat="3" :load="true"/>
  </div>
</template>

<script setup lang="ts">
import { Skeleton } from '@/components/Skeleton/index'
</script>