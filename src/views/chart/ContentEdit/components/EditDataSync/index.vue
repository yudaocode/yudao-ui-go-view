<template>
  <div class="go-edit-data-sync go-flex-items-center">
    <n-text class="status-desc go-ml-2" :type="descType" depth="3">
      {{ statusDesc }}
    </n-text>
    <n-spin
      v-show="saveStatus === SyncEnum.START"
      class="status-spin go-ml-2"
      size="small"
    >
      <template #icon>
        <n-icon size="13">
          <reload-icon />
        </n-icon>
      </template>
    </n-spin>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, watchEffect } from 'vue'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { SyncEnum } from '@/enums/editPageEnum'
import { icon } from '@/plugins'

const { ReloadIcon } = icon.ionicons5
const chartEditStore = useChartEditStore()
const { saveStatus } = toRefs(chartEditStore.getEditCanvas)
const statusDesc = ref('')
const descType = ref('')

watchEffect(() => {
  const statusDescObj = {
    [SyncEnum.PENDING]: {
      text: '待同步',
      type: '',
    },
    [SyncEnum.START]: {
      text: '同步中',
      type: 'success',
    },
    [SyncEnum.SUCCESS]: {
      text: '同步成功！',
      type: 'success',
    },
    [SyncEnum.FAILURE]: {
      text: '同步失败!',
      type: 'error',
    },
  }
  statusDesc.value = statusDescObj[saveStatus.value]['text']
  descType.value = statusDescObj[saveStatus.value]['type']
  // 3秒重置展示
  setTimeout(() => {
    statusDesc.value = statusDescObj[SyncEnum.PENDING]['text']
    descType.value = statusDescObj[SyncEnum.PENDING]['type']
  }, 3000)
})
</script>

<style lang="scss" scoped>
@include go('edit-data-sync') {
  @include deep() {
    .n-spin {
      width: 13px;
      height: 13px;
    }
  }
  .status-desc {
    font-size: 12px;
    line-height: 40px;
    opacity: .8;
  }
}
</style>
