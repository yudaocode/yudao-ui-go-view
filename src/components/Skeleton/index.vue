<template>
  <div v-show="load">
    <div v-show="repeat == 1">
      <n-skeleton v-bind="$attrs" />
    </div>
    <div v-show="repeat == 2">
      <n-skeleton v-bind="$attrs" />
      <n-skeleton v-bind="$attrs" style="width: 60%;" />
    </div>
    <div v-show="repeat > 2">
      <n-skeleton v-bind="$attrs" :repeat="repeat - 2" />
      <n-skeleton v-bind="$attrs" style="width: 60%;" />
      <n-skeleton v-bind="$attrs" style="width: 50%;" />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  repeat: {
    type: Number,
    default: 1
  },
  load: {
    type: Boolean,
    default: true
  }
})
</script>
