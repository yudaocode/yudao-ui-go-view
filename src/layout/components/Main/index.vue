<template>
  <router-view>
    <template #default="{ Component, route }">
      <component
        v-if="route.noKeepAlive"
        :is="Component"
        :key="route.fullPath"
      />
      <keep-alive v-else>
        <component :is="Component" :key="route.fullPath" />
      </keep-alive>
    </template>
  </router-view>
</template>
