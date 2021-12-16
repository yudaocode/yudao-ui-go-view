<template>
  <router-view>
    <template #default="{ Component, route }">
      <transition name="list-complete" mode="out-in" appear>
        <keep-alive>
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </template>
  </router-view>
</template>
