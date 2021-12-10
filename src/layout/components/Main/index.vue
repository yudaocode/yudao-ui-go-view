<template>
  <RouterView>
    <template #default="{ Component, route }">
      <transition name="zoom-fade" mode="out-in" appear>
        <keep-alive>
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </template>
  </RouterView>
</template>

<script lang="ts" setup>
import { defineProps} from 'vue'
const props = defineProps(['notNeedKey', 'animate'])
</script>
