<template>
  <img v-lazy="imageInfo" alt="展示图" />
</template>

<script setup lang="ts">
import { ref, PropType } from 'vue'
import { ConfigType } from '@/packages/index.d'
import { fetchImages } from '@/packages'

const props = defineProps({
  item: {
    type: Object as PropType<ConfigType>,
  }
})

const imageInfo = ref('')

// 获取图片
const fetchImageUrl = async () => {
  imageInfo.value = await fetchImages(props.item)
}
fetchImageUrl()
</script>

<style scoped>

</style>