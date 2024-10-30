<template>
  <div class="go-chart-configurations-animations" v-if="targetData">
    <n-button
      class="clear-btn go-my-2"
      :disabled="!targetData.styles.animations.length"
      @click="clearAnimation"
    >
      清除动画
    </n-button>


    <CollapseItem name="配置"  :expanded="true">
<!--      <template #header>-->
<!--        <n-switch v-model:value="targetData.styles.animations" size="small"></n-switch>-->
<!--      </template>-->
      <setting-item-box name="动画开关" :alone="false">
        <setting-item name="启用动画">
          <n-switch v-model:value="targetData.styles.animationsOpen" size="small"></n-switch>
        </setting-item>
        <setting-item name="循环播放">
          <n-switch v-model:value="targetData.styles.animationsCirculate" size="small"></n-switch>
        </setting-item>
      </setting-item-box>

      <setting-item-box name="动画曲线" :alone="true">
        <setting-item>
          <n-tabs default-value="Easy_In" size="large" justify-content="space-evenly">
            <n-tab-pane name="Easy_In" tab="移入动画">
                <n-select
                    v-model:value="targetData.styles.animationsCurve"
                    :options="animationsCurves[0].children" />
            </n-tab-pane>
            <n-tab-pane name="Easy_Out" tab="移出动画">
              <n-select
                  v-model:value="targetData.styles.animationsCurve"
                  :options="animationsCurves[1].children"/>
            </n-tab-pane>
            <n-tab-pane name="Easy_In_Out" tab="出入动画">
              <n-select
                  v-model:value="targetData.styles.animationsCurve"
                  :options="animationsCurves[2].children"/>
            </n-tab-pane>
          </n-tabs>
        </setting-item>
<!--        <setting-item name="交替方向">-->
<!--          <n-select-->
<!--              v-model:value="targetData.styles.animationsDirection"-->
<!--              :options="[-->
<!--            { label: '暂不支持', value: 'top' }-->
<!--          ]"-->
<!--          />-->
<!--        </setting-item>-->
      </setting-item-box>

      <setting-item-box name="动画配置" :alone="false">
          <setting-item name="动画时长">
            <n-input-number v-model:value="targetData.styles.circulatePlayTime" size="small" :min="1"></n-input-number>
          </setting-item>

          <setting-item name="动画延迟">
            <n-input-number v-model:value="targetData.styles.circulateDelayTime" size="small" :min="0"></n-input-number>
          </setting-item>
      </setting-item-box>
    </CollapseItem>

    <collapse-item
      v-for="(item, index) in animations"
      :key="index"
      :name="item.label"
      :expanded="true"
    >
      <n-grid :x-gap="6" :y-gap="10" :cols="3">
        <n-grid-item
          class="animation-item go-transition-quick"
          :class="[
            activeIndex(childrenItem.value) && 'active',
            hoverPreviewAnimate === childrenItem.value &&
              `animate__animated  animate__${childrenItem.value}`
          ]"
          v-for="(childrenItem, index) in item.children"
          :key="index"
          @mouseover="hoverPreviewAnimate = childrenItem.value"
          @click="addAnimation(childrenItem)"
        >
          {{ childrenItem.label }}
        </n-grid-item>
      </n-grid>
    </collapse-item>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { animations,animationsCurves,animationsDirections } from '@/settings/animations/index'
import {CollapseItem, SettingItem, SettingItemBox} from '@/components/Pages/ChartItemSetting'
import { useDesignStore } from '@/store/modules/designStore/designStore'
import { useTargetData } from '../hooks/useTargetData.hook'

// 全局颜色
const designStore = useDesignStore()

const hoverPreviewAnimate = ref('')

const { targetData } = useTargetData()

// 颜色
const themeColor = computed(() => {
  return designStore.getAppTheme
})

// * 选中的动画样式
const activeIndex = (value: string) => {
  const selectValue = targetData.value.styles.animations
  if (!selectValue.length) return false
  return selectValue[0] === value
}

// * 清除动画
const clearAnimation = () => {
  targetData.value.styles.animations = []
}

// * 新增动画，现只支持一种
const addAnimation = (item: { label: string; value: string }) => {
  targetData.value.styles.animations = [item.value]
  console.log(targetData.value)
}
</script>

<style lang="scss" scoped>
@include go('chart-configurations-animations') {
  padding: 0;
  .clear-btn {
    width: 100%;
  }
  .animation-item {
    height: 40px;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
    border-radius: 5px;
    @include hover-border-color('hover-border-color');
    &:hover,
    &.active {
      color: v-bind('themeColor');
      border: 1px solid v-bind('themeColor');
    }
  }
}
.go-setting-item{
  text-align: center;
}
</style>
