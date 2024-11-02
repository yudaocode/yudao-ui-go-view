<script setup lang="ts">
import {reactive, onMounted, PropType, toRefs, shallowReactive} from 'vue'
import config, { option as configOption } from './config'
const props = defineProps({
  chartConfig: {
    type: Object as PropType<config>,
    required: true
  }
})

const {
  roundDotColor,
  roundDotSize,
  roundDotNum
} = toRefs(props.chartConfig.option)
</script>

<template>
  <div class="bg">
    <div class="dotWrapper"
         :style="`
            top: ${Math.floor(Math.random() * 100)}%;
            left: ${Math.floor(Math.random() * 100)}%;
            -webkit-animation: flying ${Math.floor(Math.random() * 100)}s ease-in-out ${Math.floor(Math.random() * 21 - 10)}s infinite alternate;
            animation: flying ${ Math.floor(Math.random() * 91) + 30}s ease-in-out ${Math.floor(Math.random() * 21 - 10)}s infinite alternate;
            `"
         v-for="item in roundDotNum">
      <div class="dot"
           :style="`
        transform-origin: ${Math.floor(Math.random() * 41 - 20)}px ${Math.floor(Math.random() * 41 - 20)}px;
        -webkit-animation: rotating ${ Math.floor(Math.random() * 20)}s ease-in-out ${Math.floor(Math.random() * 21 - 10)}s infinite;
        animation: rotating ${ Math.floor(Math.random() * 91) + 20}s ease-in-out  ${Math.floor(Math.random() * 21 - 10)}s infinite;
  `">
      </div>
    </div>
  </div>
</template>

<style>
body {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0
}

.bg {
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.bg .dotWrapper {
  position: absolute;
}
.bg .dotWrapper-1 {
  top: 87%;
  left: 47%;
  -webkit-animation: flying 62s ease-in-out -4.3s infinite alternate;
  animation: flying 62s ease-in-out -4.3s infinite alternate;
}
.bg .dot {

  width: v-bind(roundDotSize+"px");
  height: v-bind(roundDotSize+"px");
  background: v-bind(roundDotColor);
  border-radius: 50%;
}
.bg .dot-1 {
  transform-origin: -5px 1px;
  -webkit-animation: rotating 25s ease-in-out -1.6s infinite;
  animation: rotating 25s ease-in-out -1.6s infinite;
}

@-webkit-keyframes rotating {
  0% {
    opacity: 0;
    transform: rotate(0deg);
  }
  25%, 75% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0;
    transform: rotate(360deg);
  }
}

@keyframes rotating {
  0% {
    opacity: 0;
    transform: rotate(0deg);
  }
  25%, 75% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0;
    transform: rotate(360deg);
  }
}
@-webkit-keyframes flying {
  0% {
    transform: translate(0, 0);
  }
  10% {
    transform: translate(20px, 50px);
  }
  20% {
    transform: translate(-30px, 10px);
  }
  30% {
    transform: translate(10px, 60px);
  }
  40% {
    transform: translate(50px, 0px);
  }
  50% {
    transform: translate(-10px, -40px);
  }
  60% {
    transform: translate(-40px, 20px);
  }
  70% {
    transform: translate(30px, -30px);
  }
  80% {
    transform: translate(0px, -60px);
  }
  90% {
    transform: translate(40px, 10px);
  }
  100% {
    transform: translate(0, 0);
  }
}
@keyframes flying {
  0% {
    transform: translate(0, 0);
  }
  10% {
    transform: translate(20px, 50px);
  }
  20% {
    transform: translate(-30px, 10px);
  }
  30% {
    transform: translate(10px, 60px);
  }
  40% {
    transform: translate(50px, 0px);
  }
  50% {
    transform: translate(-10px, -40px);
  }
  60% {
    transform: translate(-40px, 20px);
  }
  70% {
    transform: translate(30px, -30px);
  }
  80% {
    transform: translate(0px, -60px);
  }
  90% {
    transform: translate(40px, 10px);
  }
  100% {
    transform: translate(0, 0);
  }
}
</style>