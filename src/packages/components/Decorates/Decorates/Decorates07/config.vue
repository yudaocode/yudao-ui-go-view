<template>
    <CollapseItem name="内容" expanded>
        <SettingItemBox name="标题" alone>
            <SettingItem name="标题文字">
                <n-input v-model:value="optionData.dataset" size="small"></n-input>
            </SettingItem>
            <SettingItem name="颜色">
                <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.textColor"></n-color-picker>
            </SettingItem>
            <SettingItem name="大小">
                <n-input-number v-model:value="optionData.textSize" size="small" :min="12"></n-input-number>
            </SettingItem>
        </SettingItemBox>


        <SettingItemBox name="布局" alone>
            <SettingItem name="布局方式">
                <n-select v-model:value="optionData.flexDirection" size="small" :options="flexDirectionType"></n-select>
                <!--<n-input v-model:value="optionData.flexDirection" size="small"></n-input>-->
            </SettingItem>
            <SettingItem name="垂直对齐方式">
                {{optionData.justifyContent}}
                <n-select v-model:value="optionData.justifyContent" size="small" :options="justifyContentType"></n-select>
                <!--<n-input v-model:value="optionData.flexDirection" size="small"></n-input>-->
            </SettingItem>
            <SettingItem name="水平对齐方式">
                {{optionData.alignItems}}
                <n-select v-model:value="optionData.alignItems" size="small" :options="alignItemsType"></n-select>
                <!--<n-input v-model:value="optionData.flexDirection" size="small"></n-input>-->
            </SettingItem>
        </SettingItemBox>



        <SettingItemBox name="point样式">
            <SettingItem name="point状态">
                <n-select v-model:value="optionData.pointStatus" size="small" :options="pointStatusType"></n-select>
            </SettingItem>
            <SettingItem name="point是否闪动">
                <n-select v-model:value="optionData.pointFlickerStatus" size="small" :options="pointFlickerStatusType"></n-select>
            </SettingItem>
            <SettingItem name="point闪动频次">
                <n-select v-model:value="optionData.pointFrequency" size="small" :options="pointFrequencyType"></n-select>
            </SettingItem>
            <!--<SettingItem name="point闪动数值">-->
                <!--<n-input-number v-model:value="optionData.changeOpcity" size="small" :min="0.1" :max="1"></n-input-number>-->
            <!--</SettingItem>-->
            <SettingItem name="point闪动类型">
                <n-select v-model:value="optionData.pointFlicker" size="small" :options="pointFlickerType"></n-select>
            </SettingItem>
            <SettingItem name="point开启颜色">
                <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.pointOpenColor"></n-color-picker>
            </SettingItem>
            <SettingItem name="point开启发光颜色">
                <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.pointOpenShadowColor"></n-color-picker>
            </SettingItem>
            <SettingItem name="point异常颜色颜色">
                <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.pointErrorColor"></n-color-picker>
            </SettingItem>
            <SettingItem name="point异常发光颜色">
                <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.pointErrorShadowColor"></n-color-picker>
            </SettingItem>
            <SettingItem name="point关闭颜色">
                <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.pointCloseColor"></n-color-picker>
            </SettingItem>
            <SettingItem name="point大小">
                <n-input-number v-model:value="optionData.pointSize" size="small" :min="6"></n-input-number>
            </SettingItem>
        </SettingItemBox>
    </CollapseItem>

    <CollapseItem name="背景边框样式" expanded>
        <SettingItemBox :name="`颜色-${index + 1}`" v-for="(item, index) in optionData.colors" :key="index">
            <SettingItem name="颜色">
                <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.colors[index]"></n-color-picker>
            </SettingItem>
            <SettingItem>
                <n-button size="small" @click="optionData.colors[index] = option.colors[index]"> 恢复默认 </n-button>
            </SettingItem>
        </SettingItemBox>

        <SettingItemBox name="描边粗细">
            <n-input-number v-model:value="optionData.borderSize" size="small"></n-input-number>
        </SettingItemBox>
        <SettingItemBox name="圆角">
            <n-input-number v-model:value="optionData.borderRadius" size="small"></n-input-number>
        </SettingItemBox>
    </CollapseItem>
</template>

<script setup lang="ts">
    import { PropType } from 'vue'
    import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
    import {
        option,
        flexDirectionType,
        justifyContentType,
        alignItemsType,
        pointStatusType,
        pointFrequencyType,
        pointFlickerType,
        pointFlickerStatusType
    } from './config'

    const props = defineProps({
        optionData: {
            type: Object as PropType<typeof option>,
            required: true
        }
    })
</script>
