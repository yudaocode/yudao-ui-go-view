<template>
  <router-view #default="{ Component, route }">
    <!-- todo 动画暂时不生效，待处理 -->
    <transition name="v-modal" mode="out-in" appear>
      <component
        v-if="route.noKeepAlive"
        :is="Component"
        :key="route.fullPath"
      />
      <keep-alive v-else>
        <component :is="Component" :key="route.fullPath" />
      </keep-alive>
    </transition>
  </router-view>
</template>
