<template>
  <n-dropdown
    trigger="hover"
    @select="handleSelect"
    :show-arrow="true"
    :options="options"
  >
    <div class="user-info-box">
      <PersonIcon v-if="fallback" />
      <n-avatar
        v-if="!fallback"
        round
        object-fit="cover"
        size="medium"
        :src="imageUrl"
        @error="errorHandle"
      />
    </div>
  </n-dropdown>
</template>

<script lang="ts" setup>
import { h, ref, reactive } from 'vue';
import { NAvatar, NText } from 'naive-ui'
import { renderIcon } from '@/utils'
import { openDoc, logout } from '@/utils'
import { useI18n } from 'vue-i18n'

import { icon } from '@/plugins'
const { DocumentTextIcon, ChatboxEllipsesIcon, PersonIcon, LogOutOutlineIcon } = icon.ionicons5

const { t } = useI18n()

const imageUrl = 'https://www.naiveui.com/assets/naivelogo.93278402.svg'

// 是否失败
const fallback = ref(false)

// 用户图标渲染
const renderUserInfo = () => {
  return h(
    'div',
    {
      style: 'display: flex; align-items: center; padding: 8px 12px;'
    },
    [
      h(NAvatar, {
        round: true,
        style: 'margin-right: 12px;',
        src: imageUrl
      }),
      h('div', null, [
        h('div', null, [
          h(NText, { depth: 2 }, { default: () => '奔跑的面条' })
        ])
      ])
    ]
  )
}

const options = reactive([
  {
    label: '我的信息',
    key: 'info',
    type: 'render',
    render: renderUserInfo
  },
  {
    type: 'divider',
    key: 'd1'
  },
  {
    label: t('global.doc'),
    key: 'doc',
    icon: renderIcon(DocumentTextIcon)
  },
  {
    label: t('global.contact'),
    key: 'contact',
    icon: renderIcon(ChatboxEllipsesIcon)
  },
  {
    type: 'divider',
    key: 'd2'
  },
  {
    label: t('global.logout'),
    key: 'logout',
    icon: renderIcon(LogOutOutlineIcon)
  }
])

// 图片渲染错误
const errorHandle = (e: Event) => {
  fallback.value = true
}

const handleSelect = (key: string) => {
  switch (key) {
    case 'doc':
      openDoc()
      break
    case 'contact':
      openDoc()
      break
    case 'logout':
      logout()
      break
  }
}
</script>

<style lang="scss" scoped>
.user-info-box {
  cursor: pointer;
  transform: scale(.7);
}
</style>
