<template>
  <n-dropdown
    trigger="hover"
    @select="handleSelect"
    :show-arrow="true"
    :options="options"
  >
    <n-button quaternary>
      <n-icon size="20" :depth="1">
        <LanguageIcon />
      </n-icon>
    </n-button>
  </n-dropdown>
</template>

<script lang="ts" setup>
import { useLangStore } from '@/store/modules/langStore/langStore'
import { Language as LanguageIcon } from '@vicons/ionicons5'
import { langList } from '@/settings/designSetting'
import { LangEnum } from '@/enums/styleEnum'

const langStore = useLangStore()
const options = langList

const handleSelect = (key: LangEnum) => {
  langStore.changeLang(key)
}
</script>
