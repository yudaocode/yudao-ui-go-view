<template>
  <n-loading-bar-provider>
    <n-dialog-provider>
      <DialogContent />
      <LoadingContent />
      <n-notification-provider>
        <n-message-provider>
          <MessageContent />
          <slot></slot>
        </n-message-provider>
      </n-notification-provider>
    </n-dialog-provider>
  </n-loading-bar-provider>
</template>

<script lang="ts" setup>
import {
  NDialogProvider,
  NNotificationProvider,
  NMessageProvider,
  NLoadingBarProvider
} from 'naive-ui'

import { MessageContent } from '@/components/MessageContent'
import { DialogContent } from '@/components/DialogContent'
import { LoadingContent } from '@/components/LoadingContent'

</script>
