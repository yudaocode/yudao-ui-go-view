<template>
    <div :style="{ position: 'relative', overflow: 'hidden', width: '100%', height: '100%' }">
        <sketch-rule :thick="thick" :scale="scale" :width="canvasBox().width" :height="canvasBox().height"
            :startX="startX" :startY="startY" :lines="lines"
            :palette="{ bgColor: '#18181c', longfgColor: '#4d4d4d', shortfgColor: '#4d4d4d', fontColor: '#4d4d4d', shadowColor: '#18181c', borderColor: '#18181c', cornerActiveColor: '#18181c' }">
        </sketch-rule>
        <div ref="$app" class="screens" @scroll="handleScroll">
            <div ref="$container" class="screenContainer" :style="{ width: screenContainerWidth + 'px' }">
                <div id="refcanvasBox" ref="refcanvasBox" class="canvas" @mousedown="dragCanvas"
                    :style="{ marginLeft: '-' + (canvasBox().width / 2 - 25) + 'px' }">
                    <div :style="{ pointerEvents: isPressSpace ? 'none' : 'auto' }">
                        <slot></slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted, toRefs, watch, onUnmounted, computed } from 'vue'
import { listen } from "dom-helpers"

import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'

const chartEditStore = useChartEditStore()

const thick = 20
const screenContainerWidth = 5000
var prevMoveXVallue = [0, 0]
var prevMoveYVallue = [0, 0]

const $app = ref()
const refcanvasBox = ref()
const $container = ref()

const scale = computed(() => {
    return chartEditStore.getEditCanvas.scale
})
const startX = ref(0)
const startY = ref(0)
const lines = reactive({ h: [], v: [] })

const handleWheel = (e: any) => {
    e.preventDefault()
    if (e.ctrlKey || e.metaKey) {
        // const nextScale = parseFloat(Math.max(.2, scale.value - e.deltaY / canvasBox().height).toFixed(2))
        // chartEditStore.setScale(nextScale)

        chartEditStore.setScale(e.wheelDelta >= 120 ? scale.value + 0.01 : e.wheelDelta <= 120 ? scale.value - 0.01 : scale.value)
    }
}

const isPressSpace = ref(false)
const cursorStyle = ref('auto')

window.onKeySpacePressHold = (isHold: boolean) => {
    isPressSpace.value = isHold
}
watch(
    () => isPressSpace.value,
    newValue => {
        cursorStyle.value = newValue ? 'grab' : 'auto'
    }
)

onMounted(() => {
    $app.value.addEventListener('wheel', handleWheel, { passive: false })
    // 滚动居中
    $app.value.scrollLeft = $container.value.getBoundingClientRect().width / 2 - canvasBox().width / 2

})

const handleScroll = () => {
    const screensRect = $app.value.getBoundingClientRect()
    const canvasRect = refcanvasBox.value.getBoundingClientRect()

    // 标尺开始的刻度
    startX.value = (screensRect.left + thick - canvasRect.left) / scale.value
    startY.value = (screensRect.top + thick - canvasRect.top) / scale.value
}
// 处理标尺重制大小
watch(
    () => scale.value,
    (newValue, oldValue) => {
        if (oldValue !== newValue) {
            handleScroll()
            chartEditStore.setScale(newValue)
        }
    }
)

onUnmounted(() => {
    $app.value.removeEventListener('wheel', handleWheel)
})

const dragCanvas = (e: any) => {
    if (!window.$KeyboardActive?.space) return

    // @ts-ignore
    document.activeElement?.blur()

    e.preventDefault()
    e.stopPropagation()

    const startX = e.pageX
    const startY = e.pageY

    const un1 = listen(window, "mousemove", (e: any) => {

        const nx = e.pageX - startX
        const ny = e.pageY - startY

        const [prevMoveX1, prevMoveX2] = prevMoveXVallue
        const [prevMoveY1, prevMoveY2] = prevMoveYVallue

        prevMoveXVallue = [prevMoveX2, nx]
        prevMoveYVallue = [prevMoveY2, ny]

        $app.value.scrollLeft -= prevMoveX2 > prevMoveX1 ? Math.abs(prevMoveX2 - prevMoveX1) : -Math.abs(prevMoveX2 - prevMoveX1)
        $app.value.scrollTop -= prevMoveY2 > prevMoveY1 ? Math.abs(prevMoveY2 - prevMoveY1) : -Math.abs(prevMoveY2 - prevMoveY1)
    })
    const un2 = listen(window, "mouseup", () => {
        un1()
        un2()
        prevMoveXVallue = [0, 0]
        prevMoveYVallue = [0, 0]
    })
}

const { width, height } = toRefs(chartEditStore.getEditCanvasConfig)

const canvasBox = () => {
    const layoutDom = document.getElementById('go-chart-edit-layout')
    if (layoutDom) {
        return {
            height: layoutDom.clientHeight - 40 - 44,
            width: layoutDom.clientWidth
        }
    }
    return {
        width: width.value,
        height: height.value
    }
}
</script>
<style lang="scss" scoped>
.screens {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: auto;
    user-select: none;

    /* firefox */
    scrollbar-color: rgba(144, 146, 152, .3) transparent;
    scrollbar-width: thin;

    /* chrome */
    &::-webkit-scrollbar,
    &::-webkit-scrollbar-track-piece {
        background-color: transparent;
    }

    &::-webkit-scrollbar {
        width: 7px;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background-color: rgba(144, 146, 152, .3);
    }
}

.screenContainer {
    position: absolute;
    height: 3000px;
}

.canvas {
    position: absolute;
    top: 80px;
    left: 50%;
    transform-origin: 50% 0;

    &:hover {
        cursor: v-bind('cursorStyle');
    }

    &:active {
        cursor: crosshair;
    }
}
</style>