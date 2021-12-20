<template>
  <n-layout-sider
    class="go-project-sider"
    bordered
    collapse-mode="width"
    show-trigger="bar"
    :collapsed="collapsed"
    :native-scrollbar="false"
    :collapsed-width="asideCollapsedWidth"
    :width="asideWidth"
    @collapse="collapsed = true"
    @expand="collapsed = false"
  >
    <div class="go-project-sider-flex">
      <aside>
        <n-space vertical class="go-project-sider-top">
          <Create :collapsed="collapsed" />
        </n-space>
        <n-menu
          :value="menuValue"
          :options="menuOptions"
          :collapsed-width="asideCollapsedWidth"
          :collapsed-icon-size="22"
          :default-expanded-keys="defaultExpandedKeys"
          @update:value="handleUpdateValue"
        />
      </aside>
      <!-- 底部提示 -->
      <div class="sider-bottom">
        <AsideFooter :collapsed="collapsed" />
      </div>
    </div>
  </n-layout-sider>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Create } from '../Create/index'
import { AsideFooter } from '../AsideFooter/index'
import { asideWidth, asideCollapsedWidth } from '@/settings/designSetting'
import { menuOptionsInit, expandedKeys } from './menu'
import { useRoute } from 'vue-router'

const collapsed = ref<boolean>(false)

const route = useRoute()
const routeRame = computed(() => route.name)
const menuValue = ref(routeRame)

const menuOptions = menuOptionsInit()

const defaultExpandedKeys = expandedKeys()

const watchWidth = () => {
  const Width = document.body.clientWidth
  if (Width <= 950) {
    collapsed.value = true
  } else collapsed.value = false
}

onMounted(() => {
  window.addEventListener('resize', watchWidth)
})
</script>

<style lang="scss" scoped>
$siderHeight: 100vh;

@include go(project) {
  &-sider {
    @include filter-bg-color('aside-background_color');
    &-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: column;
      margin-top: 30px;
      margin-bottom: 20px;
    }
    &-flex {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: $siderHeight;
    }
  }
  &-layout-sider {
    height: $siderHeight;
  }
  .content-top {
    top: $--header-height;
    margin-top: 1px;
  }
}
</style>
