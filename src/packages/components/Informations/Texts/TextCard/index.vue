
<template>
  <div class="scroll-container"
  :style="{background:'linear-gradient(to right,'+cardBackColor[0]+','+cardBackColor[1]+')',
  borderRadius: cardBorderRadius
  }"
  >
    <div
        style="display: flex;
        justify-content: space-evenly;
        align-items: center;"
        class="headCss"
        :style="{background:'linear-gradient(to right,'+titleBackColor[0]+','+titleBackColor[1]+')'}"
    >
      <n-icon
          :size="titleSize"
          :color="iconColor"
          :component="getIconComponent(iconType)" ></n-icon>
      <n-gradient-text
          :size="titleSize"
          :style="{fontWeight:fontWeight}"
          :gradient="{
          deg: 180,
          from:titleColor[0],
          to: titleColor[1],
          }"
          >
        {{cardTitle}}
      </n-gradient-text>


    </div>
    <div class="scroll-wrapper" ref="scrollWrapper">
      <ul class="scroll-list" :style="{ transform: `translateY(${scrollY}px)` }"
          @mouseenter="handleMouseEnter"
          @mouseleave="handleMouseLeave">
        <li v-for="(item, index) in option.dataset"
            :key="index" class="scroll-item scroll-itemData"
            :style="{height: itemHeight+'px',
            lineHeight: itemHeight+'px',
            fontSize:fontSize+'px',
            background:'linear-gradient(to right,'+(index%2===0?itemColor1[0]:itemColor2[0])+','+(index%2===0?itemColor1[1]:itemColor2[1])+')'}"
        >

            <div  class="scroll-time" :style="{color:itemFontColor}">{{ item.title }}</div>
            <div   class="scroll-time" :style="{color:itemFontColor}">{{ item.content }}</div>

        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import {Component ,PropType, toRefs, shallowReactive, watch, computed, ref, onMounted, nextTick} from 'vue'
import { CreateComponentType } from '@/packages/index.d'
import { useChartDataFetch } from '@/hooks'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { option as configOption } from './config'
import * as Icons from '@vicons/ionicons5'

import { values } from 'lodash'
const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType & typeof option>,
    required: true
  }
})
let scrollY    = ref(0)
let timer:any;
const {
  cardTitle,
  fontSize,
  titleSize,
  titleColor,
  iconType,
  iconColor,
  itemColor1,
  itemColor2,
  cardBackColor,
  titleBackColor,
  cardBorderRadius,
  itemFontColor,
  fontWeight,
  itemHeight, // 每个项的高度，根据实际情况调整
  animationDuration, // 动画持续时间，根据实际情况调整
  dataList,
} = toRefs(
    props.chartConfig.option
)

const option = shallowReactive({
  dataset: configOption.dataset
})


watch(
    () => props.chartConfig.option.dataset,
    (newData: any) => {
      option.dataset = newData
    },
    {
      immediate: true,
      deep: false
    }
)


const getIconComponent = (iconName: any) => {
  return (Icons as Record<string, Component>)[iconName]|| null; // 返回相应的图标组件
}


// 预览更新
useChartDataFetch(props.chartConfig, useChartEditStore, (newData: any) => {
  option.dataset = newData
})

onMounted(() => {

console.log('22222222222222222222223')
  console.log(props.chartConfig.option)

  console.log(configOption)
  startScrollAnimation();
})
// onMethods(() => {
//
//
// })


    // 滚动处理
    const startScrollAnimation = () => {
      const totalHeight = itemHeight.value * props.chartConfig.option.dataset.lenght;
      timer = setInterval(() => {
        console.log('滚动测试...')
        scrollY.value -= itemHeight.value;
        if (Math.abs(totalHeight - itemHeight.value * 2) <= Math.abs(scrollY.value)) {
          console.log('滚动测试2...')
          setTimeout(() => {
            scrollY.value = 0;
          }, animationDuration.value / 2);
        }
      }, animationDuration.value);
    }
    // 清除
    const clearTime = () => {
      if (timer) {
        clearInterval(timer)
        timer = null
      }
    }
    // 打开弹窗
    const openModal = (data:any) => {
      window.postMessage({
        type: 'hookEmitEvent',
        data: {
          // 动作类型：单击 click、双击 dblclick、移入 mouseenter、移出 mouseleave、更新 dataUpdate
          eventType: 'click',
          // 需要传递的数据，可以是任意类型
          value: {
            text: ''
          }
        }
      })

    }
    //
    const handleMouseEnter = () => {
      clearTime()
    }
    const handleMouseLeave = () => {
      scrollY.value = 0
      startScrollAnimation()
    }

  const beforeUnmount = () => {
    clearTime()
  }

</script>


<style>
body {
  margin: 0;
  overflow: hidden;
}

html,
body,
#app,
.scroll-container {
  height: 100%;
}

.scroll-container {
  width: 100%;
  overflow: hidden;
  position: relative;


  color: #FFFF;
}

.headCss {

  font-size: 14px;
  min-height: 30px;
  text-align: center;

}


.scroll-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  /* WebKit 浏览器（如 Chrome、Safari）*/
  scrollbar-width: thin;
  /* 确保滚动条尺寸一致 */
  scrollbar-color: transparent transparent;
  /* 隐藏滚动条颜色 */
}

.scroll-wrapper::-webkit-scrollbar {
  width: 0px;
  /* 设置滚动条宽度 */
}

.scroll-wrapper::-webkit-scrollbar-thumb {
  background-color: transparent;
  /* 设置滚动条颜色 */
}

.scroll-list {
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
  transition: transform 500ms ease-in-out;

}

.scroll-itemData {
  display: flex;
}

.scroll-time {
  opacity: 0.6;
  text-align: center;
  background-color: transparent;
  width: 50%;
}

</style>
