<template>
  <n-loading-bar-provider>
    <n-dialog-provider>
      <DialogContent />
      <n-notification-provider>
        <n-message-provider>
          <MessageContent />
          <slot></slot>
        </n-message-provider>
      </n-notification-provider>
    </n-dialog-provider>
  </n-loading-bar-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Application'
})
</script>

<script lang="ts" setup>
import {
  NDialogProvider,
  NNotificationProvider,
  NMessageProvider,
  NLoadingBarProvider
} from 'naive-ui'

// @ts-ignore
import { MessageContent } from '@/components/MessageContent'
// @ts-ignore
import { DialogContent } from '@/components/DialogContent'
</script>
