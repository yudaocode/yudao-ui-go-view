<template>
  <div class="go-global-setting">
    <CollapseItem name="标题">
      <ConfigItemBox name="标题颜色">
        <ConfigItem :width="200">
          <n-color-picker
            v-model:value="title.textStyle.color"
          />
        </ConfigItem>
      </ConfigItemBox>
      <ConfigItemBox name="副标题颜色">
        <ConfigItem :width="200">
          <n-color-picker
            v-model:value="title.subtextStyle.color"
          />
        </ConfigItem>
      </ConfigItemBox>
    </CollapseItem>
    <CollapseItem name="图例">
      <ConfigItemBox name="图例文字颜色">
        <ConfigItem :width="200">
          <n-color-picker
            v-model:value="legend.textStyle.color"
          />
        </ConfigItem>
      </ConfigItemBox>
    </CollapseItem>
  </div>
</template>

<script setup lang="ts">
import { toRefs, PropType } from 'vue'
import { GlobalThemeJsonType } from '@/settings/chartThemes/index'
import {
  CollapseItem,
  ConfigItemBox,
  ConfigItem
} from '@/components/ConfigItemCom/index'

const props = defineProps({
  data: {
    type: Object as PropType<GlobalThemeJsonType>,
    required: true
  }
})

const { title, legend } = toRefs(props.data)
</script>

<style lang="scss" scoped>
@include go(global-setting) {
}
</style>
