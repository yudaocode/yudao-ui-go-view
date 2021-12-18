<template>
  <router-view #default="{ Component, route }">
    <n-collapse-transition appear>
      <component :is="Component" :key="route.fullPath" />
    </n-collapse-transition>
    <!-- todo 暂时不生效，待处理 -->
    <!-- <transition name="v-modal" mode="out-in" appear>
      <component
        v-if="route.noKeepAlive"
        :is="Component"
        :key="route.fullPath"
      />
      <keep-alive v-else>
        <component :is="Component" :key="route.fullPath" />
      </keep-alive>
    </transition> -->
  </router-view>
</template>
