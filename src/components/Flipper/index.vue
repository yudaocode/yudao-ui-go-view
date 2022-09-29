<template>
  <div class="M-Flipper" :class="[flipType, { go: isFlipping }]">
    <div class="digital front" :class="_textClass(frontTextFromData)"></div>
    <div class="digital back" :class="_textClass(backTextFromData)"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
type FlipType = 'up' | 'down'

const name = 'Flipper'

const props = defineProps({
  frontText: {
    type: [Number, String],
    default: 0
  },
  backText: {
    type: [Number, String],
    default: 1
  },
  duration: {
    type: Number,
    default: 600
  },
  width: {
    type: Number,
    default: 60
  },
  height: {
    type: Number,
    default: 100
  },
  radius: {
    type: Number,
    default: 10
  },
  frontColor: {
    type: String,
    default: '#ffffff'
  },
  backColor: {
    type: String,
    default: '#000000'
  }
})

const isFlipping = ref(false)
const flipType = ref<FlipType>('down')
const frontTextFromData = ref(props.frontText)
const backTextFromData = ref(props.backText)

const _textClass = (number: string | number) => `number${number}`
const _flip = (type: FlipType, front: string | number, back: string | number) => {
  // 如果处于翻转中，则不执行
  if (isFlipping.value) return
  frontTextFromData.value = front
  backTextFromData.value = back
  // 根据传递过来的type设置翻转方向
  flipType.value = type
  // 设置翻转状态为true
  isFlipping.value = true
  setTimeout(() => {
    // 设置翻转状态为false
    isFlipping.value = false
    frontTextFromData.value = back
  }, props.duration)
}
// 下翻牌
const flipDown = (front: string | number, back: string | number) => _flip('down', front, back)
// 上翻牌
const flipUp = (front: string | number, back: string | number) => _flip('up', front, back)
// 设置前牌文字
const setFront = (text: string | number) => {
  frontTextFromData.value = text
}
// 设置后牌文字
const setBack = (text: string | number) => {
  backTextFromData.value = text
}

defineExpose({
  name,
  flipDown,
  flipUp
})
</script>

<style lang="scss" scoped>
@keyframes frontFlipDown {
  0% {
    transform: perspective(160px) rotateX(0deg);
  }
  100% {
    transform: perspective(160px) rotateX(-180deg);
  }
}
@keyframes backFlipDown {
  0% {
    transform: perspective(160px) rotateX(180deg);
  }
  100% {
    transform: perspective(160px) rotateX(0deg);
  }
}
@keyframes frontFlipUp {
  0% {
    transform: perspective(160px) rotateX(0deg);
  }
  100% {
    transform: perspective(160px) rotateX(180deg);
  }
}
@keyframes backFlipUp {
  0% {
    transform: perspective(160px) rotateX(-180deg);
  }
  100% {
    transform: perspective(160px) rotateX(0deg);
  }
}

$frontColor: v-bind('props.frontColor');
$backColor: v-bind('props.backColor');
$radius: v-bind('props.radius');

.M-Flipper {
  display: inline-block;
  position: relative;
  width: v-bind('`${width}px`');
  height: v-bind('`${height}px`');
  line-height: v-bind('`${height}px`');
  border: solid 1px $backColor;
  border-radius: v-bind('`${radius}px`');
  background: $frontColor;
  font-size: v-bind('`${width * 1.1}px`');
  color: v-bind('props.frontColor');
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
  text-align: center;
  font-family: 'Helvetica Neue';

  .digital:before,
  .digital:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    background: v-bind('props.backColor');
    overflow: hidden;
    box-sizing: border-box;
  }
  // .digital.front:after {
  //   content: v-bind(frontTextFromData) !important;
  // }
  // .digital.back:after {
  //   content: v-bind(backTextFromData) !important;
  // }
  .digital:before {
    top: 0;
    bottom: 50%;
    border-radius: v-bind('`${radius}px`') v-bind('`${radius}px`') 0 0;
    border-bottom: solid 1px #666;
  }
  .digital:after {
    top: 50%;
    bottom: 0;
    border-radius: 0 0 v-bind('`${radius}px`') v-bind('`${radius}px`');
    line-height: 0;
  }
  /*向下翻*/
  &.down .front:before {
    z-index: 3;
  }
  &.down .back:after {
    z-index: 2;
    transform-origin: 50% 0%;
    transform: perspective(v-bind('`${height * 1.6}px`')) rotateX(180deg);
  }
  &.down .front:after,
  &.down .back:before {
    z-index: 1;
  }
  &.down.go .front:before {
    transform-origin: 50% 100%;
    animation: frontFlipDown v-bind('`${props.duration / 1000}s`') ease-in-out both;
    box-shadow: 0 -2px 6px rgba(255, 255, 255, 0.3);
    backface-visibility: hidden;
  }
  &.down.go .back:after {
    animation: backFlipDown v-bind('`${props.duration / 1000}s`') ease-in-out both;
  }
  /*向上翻*/
  &.up .front:after {
    z-index: 3;
  }
  &.up .back:before {
    z-index: 2;
    transform-origin: 50% 100%;
    transform: perspective(v-bind('`${height * 1.6}px`')) rotateX(-180deg);
  }
  &.up .front:before,
  &.up .back:after {
    z-index: 1;
  }
  &.up.go .front:after {
    transform-origin: 50% 0;
    animation: frontFlipUp v-bind('`${props.duration / 1000}s`') ease-in-out both;
    box-shadow: 0 2px 6px rgba(255, 255, 255, 0.3);
    backface-visibility: hidden;
  }
  &.up.go .back:before {
    animation: backFlipUp v-bind('`${props.duration / 1000}s`') ease-in-out both;
  }

  .number0:before,
  .number0:after {
    content: '0';
  }
  .number1:before,
  .number1:after {
    content: '1';
  }
  .number2:before,
  .number2:after {
    content: '2';
  }
  .number3:before,
  .number3:after {
    content: '3';
  }
  .number4:before,
  .number4:after {
    content: '4';
  }
  .number5:before,
  .number5:after {
    content: '5';
  }
  .number6:before,
  .number6:after {
    content: '6';
  }
  .number7:before,
  .number7:after {
    content: '7';
  }
  .number8:before,
  .number8:after {
    content: '8';
  }
  .number9:before,
  .number9:after {
    content: '9';
  }
}
</style>
