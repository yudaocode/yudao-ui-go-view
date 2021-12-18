<template>
  <n-layout-sider
    class="go-project-layout-sider"
    bordered
    inverted
    collapse-mode="width"
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
          @update:value="handleUpdateValue"
        />
      </aside>
      <!-- 底部提示 -->
      <div class="sider-bottom">
        <AsideFooter />
      </div>
    </div>
  </n-layout-sider>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Create } from '../Create/index'
import { AsideFooter } from '../AsideFooter/index'
import { asideWidth, asideCollapsedWidth } from '@/settings/designSetting'
import { menuOptionsInit } from './menu'
import { useRoute } from 'vue-router'

const collapsed = ref(false)

const route = useRoute()
const routeRame = computed(() => route.name)
const menuValue = ref(routeRame)

const menuOptions = menuOptionsInit()
</script>

<style lang="scss" scoped>
$siderHeight: 100vh;

@include go(project) {
  &-sider {
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
    @include filter-bg-color('aside-bg');
    @include filter-border-color('aside-color');
  }
  .content-top {
    top: $--header-height;
    margin-top: 1px;
  }
}
</style>
