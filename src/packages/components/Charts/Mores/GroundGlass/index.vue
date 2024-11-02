<template>
  <div class="backdrop-class"
  :style="`
    background-color: ${glassBackgroundColor};
              backdrop-filter: blur(${glassBackdropFilterBlur}px)
  `">
  </div>
</template>
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
  glassBackgroundColor,
  glassBackdropFilterBlur
} = toRefs(props.chartConfig.option)
const option = shallowReactive({
  dataset: configOption.dataset
})

</script>


<style>
body {
  margin: 0;
  overflow: hidden;
}

.backdrop-class {
  width: 99999px;
  height: 99999px;
}
</style>