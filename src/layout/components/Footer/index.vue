<template>
  <div class="go-footer">
    <slot>
      <n-text depth="2">
        <n-a>{{ $t('global.doc_addr') }}: </n-a>
        <n-a italic href="http://www.mtruning.club/">
          http://www.mtruning.club/
        </n-a>
      </n-text>
    </slot>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@include go(footer) {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0 40px;
  height: $--footer-height;
}
</style>
