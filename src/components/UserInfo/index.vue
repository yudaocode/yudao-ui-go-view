<template>
  <n-dropdown
    trigger="hover"
    @select="handleSelect"
    :show-arrow="true"
    :options="options"
  >
    <n-button quaternary circle>
      <n-icon size="20" :depth="1">
        <PersonOutlineIcon v-show="fallback" />
      </n-icon>
      <n-avatar
        v-show="!fallback"
        round
        size="small"
        :src="imageUrl"
        @error="errorHandle"
      />
    </n-button>
  </n-dropdown>
</template>

<script lang="ts" setup>
import { h, ref } from 'vue'
import { NAvatar, NText } from 'naive-ui'
import { renderIcon } from '@/utils/index'
import { openDoc, logout } from '@/utils/page'
import {
  Person as PersonOutlineIcon,
  LogOutOutline as LogOutOutlineIcon,
  DocumentText as DocumentTextIcon
} from '@vicons/ionicons5'

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

const options = [
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
    label: '说明文档',
    key: 'doc',
    icon: renderIcon(DocumentTextIcon)
  },
  {
    type: 'divider',
    key: 'd2'
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: renderIcon(LogOutOutlineIcon)
  }
]

// 图片渲染错误
const errorHandle = (e: Event) => {
  fallback.value = true
}

const handleSelect = (key: string) => {
  switch (key) {
    case 'doc':
      openDoc()
      break
    case 'logout':
      logout()
      break
  }
}
</script>
