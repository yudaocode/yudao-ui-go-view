<template>
  <n-empty description="你什么也找不到">
    <template #extra>
      <n-button size="small" @click="goHome">看看别的</n-button>
    </template>
  </n-empty>
</template>
<script lang="ts" setup>
import { onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const goHome = () => {
  router.replace({ path: '/' })
}
// onBeforeMount(() => {
//   const { params, query } = route
//   const { path } = params
//   router.replace({
//     path: '/' + (Array.isArray(path) ? path.join('/') : path),
//     query
//   })
// })
</script>
