<template>
  <div class="go-chart-configurations-data">
    <setting-item-box v-if="targetData" name="请求方式" :alone="true">
      <n-select
        v-model:value="targetData.data.requestDataType"
        :options="selcetOpeions"
        @on-update="updateHandle"
      />
    </setting-item-box>
    <n-timeline>
      <n-timeline-item type="info" title="数据结构">
        <n-table striped>
          <thead>
            <tr>
              <th>字段</th>
              <th>映射</th>
              <th>状态</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in dataStructure" :key="index">
              <td>{{ item.field }}</td>
              <td>{{ item.mapping }}</td>
              <td>
                <n-space>
                  <n-badge
                    dot
                    :type="item.result ? 'success' : 'error'"
                  ></n-badge>
                  <n-text>匹配{{ item.result ? '成功' : '失败' }}</n-text>
                </n-space>
              </td>
            </tr>
          </tbody>
        </n-table>
      </n-timeline-item>
      <n-timeline-item type="success" title="静态数据">
        <n-code
          v-for="(item, index) in code"
          :key="index"
          :code="item.data"
          language="json"
        ></n-code>
      </n-timeline-item>
    </n-timeline>
  </div>
</template>

<script setup lang="ts">
import { ref, toRaw } from 'vue'
import { SettingItemBox } from '@/components/ChartItemSetting/index'
import { RequestDataTypeEnum } from '@/store/modules/chartEditStore/chartEditStore.d'
import { useTargetData } from '../hooks/useTargetData.hook'

const { targetData } = useTargetData()

const code = toRaw((targetData.value.option as any).series)

const selcetOpeions = [
  {
    label: '静态数据',
    value: RequestDataTypeEnum.STATIC
  },
  {
    label: '动态请求',
    value: RequestDataTypeEnum.AJAX
  }
]

const dataStructure = ref([
  {
    // 字段
    field: 'x',
    // 映射
    mapping: 'xData',
    // 结果
    result: true
  },
  {
    // 字段
    field: 'y',
    // 映射
    mapping: 'yData',
    // 结果
    result: true
  }
])

const updateHandle = (value: any) => {
  console.log(value)
}
</script>

<style lang="scss" scoped></style>
