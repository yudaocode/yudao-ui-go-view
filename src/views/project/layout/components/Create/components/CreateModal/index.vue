<template>
  <n-modal v-model:show="show" class="go-create-modal">
    <n-space size="large">
      <n-card class="card-box" hoverable>
        <template #header>
          <n-text class="card-box-tite">{{ $t('project.create_tip') }}</n-text>
        </template>
        <template #header-extra>
          <n-text @click="closeHandle">
            <n-icon size="20">
              <component :is="CloseIcon" />
            </n-icon>
          </n-text>
        </template>
        <n-space class="card-box-content" justify="center">
          <n-button
            size="large"
            :disabled="item.disabled"
            v-for="item in typeList"
            :key="item.key"
            :title="item.title"
            @click="btnHandle(item.index)"
          >
            <template #icon>
              <n-icon size="18">
                <component :is="item.icon" />
              </n-icon>
            </template>
            <span>{{ item.title }}</span>
          </n-button>
        </n-space>
        <template #action> </template>
      </n-card>
    </n-space>
  </n-modal>
</template>

<script lang="ts" setup>
import { watch, reactive } from 'vue'
import { icon } from '@/plugins'
import { PageEnum, ChartEnum } from '@/enums/pageEnum'
import { routerTurnByName } from '@/utils'

const { FishIcon, LaptopOutlineIcon, BeerIcon, CloseIcon } = icon.ionicons5
const t = window['$t']
const emit = defineEmits(['close'])
const props = defineProps({
  show: Boolean
})

const typeList = reactive([
  {
    title: t('project.new_project'),
    key: ChartEnum.CHART_HOME_NAME,
    icon: FishIcon,
    disabled: false
  },
  {
    title: t('project.my_templete'),
    key: PageEnum.BASE_HOME_TEMPLATE_NAME,
    icon: LaptopOutlineIcon,
    disabled: true
  },
  {
    title: t('project.template_market'),
    key: PageEnum.BASE_HOME_TEMPLATE_MARKET_NAME,
    icon: BeerIcon,
    disabled: true
  }
])

// 解决点击模态层不会触发 @on-after-leave 的问题
watch(props, newValue => {
  if (!newValue.show) {
    closeHandle()
  }
})

// 关闭对话框
const closeHandle = () => {
  emit('close', false)
}

// 处理按钮点击
const btnHandle = (key: string) => {
  closeHandle()
  routerTurnByName(ChartEnum.CHART_HOME_NAME, undefined, true)
}
</script>
<style lang="scss" scoped>
$cardWidth: 570px;

@include go('create-modal') {
  position: fixed;
  top: 200px;
  left: 50%;
  transform: translateX(-50%);
  .card-box {
    width: $cardWidth;
    cursor: pointer;
    border: 1px solid rgba(0, 0, 0, 0);
    @extend .go-transition;
    &:hover {
      @include hover-border-color('hover-border-color');
    }
    &-tite {
      font-size: 14px;
    }
    &-content {
      padding: 0px 10px;
      width: 100%;
    }
  }
}
</style>
