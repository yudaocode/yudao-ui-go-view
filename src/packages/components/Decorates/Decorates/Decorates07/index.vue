<template>
    <div class="go-border-07"
         :style="{width:w,height:h}">
        <!--<svg xmlns="http://www.w3.org/2000/svg" :width="w" :height="h">-->
            <!--<polygon class="stroke fill" :points="`15.5 6.5 20.5 0.5 50.5 0.5 55.5 6.5 15.5 6.5`" />-->
            <!--<polygon-->
                    <!--class="stroke fill"-->
                    <!--:points="`15.5 ${h - 6.5} 20.5 ${h - 0.5} 50.5 ${h - 0.5} 55.5 ${h - 6.5} 15.5 ${h - 6.5}`"-->
            <!--/>-->
            <!--<polygon-->
                    <!--class="stroke fill"-->
                    <!--:points="`${w - 15.5} 6.5 ${w - 20.5} 0.5 ${w - 50.5} 0.5 ${w - 55.5} 6.5 ${w - 15.5} 6.5`"-->
            <!--/>-->
            <!--<polygon-->
                    <!--class="stroke fill"-->
                    <!--:points="`${w - 15.5} ${h - 6.5} ${w - 20.5} ${h - 0.5} ${w - 50.5} ${h - 0.5} ${w - 55.5} ${h - 6.5} ${-->
          <!--w - 15.5-->
        <!--} ${h - 6.5}`"-->
            <!--/>-->
            <!--<polygon-->
                    <!--class="stroke fill"-->
                    <!--:points="`15.5 6.5 0.5 ${h / 2} 15.5 ${h - 6.5} ${w - 15.5} ${h - 6.5} ${w - 0.5} ${h / 2} ${-->
          <!--w - 15.5-->
        <!--} 6.5 15.5 6.5`"-->
            <!--/>-->
            <!--<polyline class="stroke fill-none" :points="`20.5 14.5 8.5 ${h / 2} 20.5 ${h - 14.5}`" />-->
            <!--<polyline class="stroke fill-none" :points="`${w - 20.5} 14.5 ${w - 8.5} ${h / 2} ${w - 20.5} ${h - 14.5}`" />-->
        <!--</svg>-->
        <!--<span class="text">{{ dataset }}</span>-->

        <span class="point-font">{{ dataset }}</span>
        <span
                class="point-state"
                :class="pointStatus === '1' ? 'online' : pointStatus === '2'? 'outline':''"
                :style="{ opacity: changeOpcity }">
         </span>
    </div>
    <!--<button @click="testButton">测试按钮</button>-->
</template>

<script setup lang="ts">
    import { PropType, toRefs, ref, reactive, watch, onMounted, onUnmounted} from 'vue'
    // import { Component, Vue, Emit, } from 'vue-property-decorator';
    import { CreateComponentType } from '@/packages/index.d'
    import { getUUID } from '@/utils'
    import {Component} from "@/router/types";
    let timer: any = null
    const props = defineProps({
        chartConfig: {
            type: Object as PropType<CreateComponentType>,
            required: true
        }
    })
    let changeOpcity = ref(1)
    let transitionStatus = true
    const id = getUUID()
    const { w, h } = toRefs(props.chartConfig.attr)
    const {
        colors,
        dataset,
        pointStatus,
        pointFlickerStatus,
        pointFlicker,
        pointFrequency,
        textSize,
        textColor,
        pointErrorColor,
        pointErrorShadowColor,
        pointOpenColor,
        pointOpenShadowColor,
        pointCloseColor,
        pointSize,
        flexDirection,
        justifyContent,
        alignItems,
        borderRadius,
        borderSize,

    } = toRefs(props.chartConfig.option)


    watch(
        () => props.chartConfig.option.pointFrequency,
        () => {
            try {
                console.log("监听器发生了改变")
                // console.log(props.chartConfig.option.pointFrequency)
                clearInterval(timer)


                timer =  setInterval(() => {
                    updatePoint();
                }, pointFrequency.value)
            } catch (error) {
                console.log(error)
            }
        },
        { immediate: true }
    )

    //
    // const openInterval=() =>{
    //     timer =  setInterval(() => {
    //         updatePoint();
    //     }, pointFrequency.value)
    // }

function testButton(){
        console.log("测试按钮被点击:"+changeOpcity.value)
        changeOpcity.value = changeOpcity.value>=0.5?1:0
    console.log("测试数据被修改:"+changeOpcity.value)
}

    const updatePoint = () => {
        // console.log(pointFrequency.value)
        // console.log(pointFlickerStatus.value)
        if(pointFlickerStatus.value==='0')
            return


        if(pointFlicker.value==='immediately'){
            // console.log("immediately")
            // console.log(changeOpcity.value)
            changeOpcity.value = changeOpcity.value == 1?0:1


        }else if(pointFlicker.value==='slow'){
            // console.log(changeOpcity.value)
            // console.log("slow")
            // console.log(transitionStatus)

            if(transitionStatus){
                changeOpcity.value = changeOpcity.value + 0.1
                if(changeOpcity.value>=1)
                    transitionStatus=false
            }else{
                changeOpcity.value = changeOpcity.value - 0.1
                if(changeOpcity.value<=0)
                    transitionStatus=true
            }

        }else{
            return
        }

        // console.log(timer)
    }



    onMounted(() => {
        timer =  setInterval(() => {
            updatePoint();
        }, pointFrequency.value)
    })

    // onUnmounted(() => {
    //     clearInterval(timer)
    // })

</script>

<style lang="scss" scoped>
    @include go('border-07') {
        position: relative;
        display: flex;
        flex-direction: v-bind('flexDirection');
        justify-content: v-bind('justifyContent');
        align-items: v-bind('alignItems');
        background-color: v-bind('colors[0]');
        border: v-bind('borderSize+"px"') solid v-bind('colors[1]');
        border-radius: v-bind('borderRadius+"px"');

        .point-font{
            color:v-bind('textColor') ;
            font-size: v-bind('textSize+"px"');
        }
        .point-state {
            width: v-bind('pointSize+"px"');
            height: v-bind('pointSize+"px"');
            border-radius: 100%;
            background: v-bind('pointCloseColor');
        }
        .outline {
            background: v-bind('pointErrorColor');
            box-shadow: 1px 1px 10px v-bind('pointErrorShadowColor');
        }
        .online {
            background: v-bind('pointOpenColor');
            box-shadow: 1px 1px 10px v-bind('pointOpenShadowColor');
        }
        svg {
            position: absolute;
            z-index: -1;
        }

        .fill {
            fill: v-bind('colors[0]');
        }
        .fill-none {
            fill: none;
        }
        .stroke {
            stroke: v-bind('colors[1]');
        }

        .text {
            color: v-bind('textColor');
            font-size: v-bind('textSize+"px"');
        }
    }
</style>
