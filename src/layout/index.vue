<template>
  <MainView />
</template>

<script lang="ts" setup>
import { MainView } from '@/layout/components/Main/index'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

window['$t'] = t

</script>