<template>
  <n-divider style="margin: 10px 0;" />
  <n-collapse arrow-placement="right">
    <!-- 右侧 -->
    <template #header-extra>
      <div @click="click">
        <slot name="header" />
      </div>
    </template>

    <n-collapse-item :title="name" name="1">
      <slot />
    </n-collapse-item>
  </n-collapse>
</template>

<script setup lang="ts">
defineProps({
  name: {
    type: String,
    required: true
  }
})
const click = (e:MouseEvent) => {
  e.preventDefault()
  e.stopPropagation()
}
</script>
