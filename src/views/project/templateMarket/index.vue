<template>
  <div class="go-project-template-market">
    <header class="top-box">
      <div class="top-box-bg"></div>
      <div class="top-content">
        <n-carousel class="top-content-carousel" show-arrow>
          <n-card title="模板1" hoverable>
            <img
              class="carousel-img"
              src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"
            />
          </n-card>
          <n-card title="模板2" hoverable>
            <img
              class="carousel-img"
              src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg"
            />
          </n-card>
          <n-card title="模板2" hoverable>
            <img
              class="carousel-img"
              src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg"
            />
          </n-card>
          <n-card title="模板2" hoverable>
            <img
              class="carousel-img"
              src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg"
            />
          </n-card>
        </n-carousel>
      </div>
      <n-divider />
    </header>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@include go('project-template-market') {
  .top-box {
    background: url('@/assets/images/project/project-top-bg.png');
    background-position: top -185px left -1560px;
    &-bg {
      position: absolute;
      width: 100%;
      height: 100%;
      @include background-image('items-top-bg');
    }
    .top-content {
      display: flex;
      justify-content: center;
      position: relative;
      padding-top: 30px;
      &-carousel {
        width: 70%;
      }
    }
  }
}
</style>
