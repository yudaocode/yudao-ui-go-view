<template>
  <div class="go-login-box">
    <div class="go-login-box-bg">
      <aside class="bg-slot"></aside>
      <aside class="bg-img-box">
        <transition-group name="list-complete">
          <template v-for="item in bgList" :key="item">
            <div class="bg-img-box-li list-complete-item">
              <n-collapse-transition :appear="true" :show="show">
                <img :src="getImageUrl(item, 'chart')" alt="chart" />
              </n-collapse-transition>
            </div>
          </template>
        </transition-group>
      </aside>
    </div>
    <header class="go-login-box-header">
      <div></div>
      <div class="header-ri">
        <ThemeSelect />
      </div>
    </header>
    <n-divider class="go-login-box-divider" />

    <div class="go-login">
      <div class="go-login-carousel">
        <n-carousel autoplay :interval="Number(carouselInterval)">
          <img
            v-for="(item, i) in carouselImgList"
            :key="i"
            class="go-login-carousel-img"
            :src="getImageUrl(item, 'login')"
            alt="展示图片"
          />
        </n-carousel>
      </div>
      <div class="login-account">
        <div class="login-account-container">
          <n-collapse-transition :appear="true" :show="show">
            <n-card class="login-account-card" title="登录 GoView">
              <div class="login-account-top">
                <img
                  class="login-account-top-logo"
                  src="~@/assets/images/logo.png"
                  alt="logo"
                />
              </div>
              <n-form
                ref="formRef"
                label-placement="left"
                size="large"
                :model="formInline"
                :rules="rules"
              >
                <n-form-item path="username">
                  <n-input
                    v-model:value="formInline.username"
                    placeholder="请输入用户名"
                  >
                    <template #prefix>
                      <n-icon size="18">
                        <PersonOutlineIcon />
                      </n-icon>
                    </template>
                  </n-input>
                </n-form-item>
                <n-form-item path="password">
                  <n-input
                    v-model:value="formInline.password"
                    type="password"
                    show-password-toggle
                    placeholder="请输入密码"
                  >
                    <template #prefix>
                      <n-icon size="18">
                        <LockClosedOutlineIcon />
                      </n-icon>
                    </template>
                  </n-input>
                </n-form-item>
                <n-form-item>
                  <div class="flex justify-between">
                    <div class="flex-initial">
                      <n-checkbox v-model:checked="autoLogin">
                        自动登录
                      </n-checkbox>
                    </div>
                  </div>
                </n-form-item>
                <n-form-item>
                  <n-button
                    type="primary"
                    @click="handleSubmit"
                    size="large"
                    :loading="loading"
                    block
                  >
                    登录
                  </n-button>
                </n-form-item>
              </n-form>
            </n-card>
          </n-collapse-transition>
        </div>
      </div>
    </div>

    <div class="go-login-box-footer">
      <n-a>文档地址: </n-a>
      <n-a italic href="http://www.mtruning.club/">
        http://www.mtruning.club/
      </n-a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'
import {
  PersonOutline as PersonOutlineIcon,
  LockClosedOutline as LockClosedOutlineIcon
} from '@vicons/ionicons5'
import { requireUrl } from '@/utils/index'
import shuffle from 'lodash/shuffle'
import { carouselInterval } from '@/settings/designSetting'
import { useDesignStore } from '@/store/modules/designStore/designStore'

interface FormState {
  username: string
  password: string
}

const router = useRouter()
const formRef = ref()
const message = useMessage()
const loading = ref(false)
const autoLogin = ref(true)
const show = ref(false)
const designStore = useDesignStore()

onMounted(() => {
  setTimeout(() => {
    show.value = true
  }, 100)
})

const formInline = reactive({
  username: 'admin',
  password: '123456'
})

const rules = {
  username: { required: true, message: '请输入用户名', trigger: 'blur' },
  password: { required: true, message: '请输入密码', trigger: 'blur' }
}

// 定时器
const shuffleTimiing = ref()

// 轮播图
const carouselImgList = ['one', 'two', 'three']

// 背景图
const bgList = ref([
  'bar_y',
  'bar_x',
  'line_gradient',
  'line',
  'funnel',
  'heatmap',
  'map',
  'pie',
  'radar'
])

// 处理url获取
const getImageUrl = (name: string, folder: string) => {
  return requireUrl(`../assets/images/${folder}`, `${name}.png`)
}

// 打乱
const shuffleHandle = () => {
  shuffleTimiing.value = setInterval(() => {
    bgList.value = shuffle(bgList.value)
  }, carouselInterval)
}

// 点击事件
const handleSubmit = (e: Event) => {
  e.preventDefault()
  formRef.value.validate(async (errors: any) => {
    if (!errors) {
      const { username, password } = formInline
      loading.value = true

      message.success('登录成功！')
      router.replace('/')
    } else {
      message.error('请填写完整信息，并且进行验证码校验')
    }
  })
}

onMounted(() => {
  shuffleHandle()
})
</script>

<style lang="scss" scoped>
$width: 450px;
$go-login-height: 100vh;
$account-img-height: 270px;
$footer-height: 50px;
$carousel-width: 30%;
$carousel-image-height: 60vh;

* {
  box-sizing: border-box;
}
@include go(login-box) {
  height: $go-login-height;
  overflow: hidden;
  @include background-image('background-image');
  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px;
    height: $--header-height;
  }
  &-divider {
    margin: 0;
    padding-top: 0;
  }

  @include go(login) {
    z-index: 2;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: -$--header-height;
    height: $go-login-height;
    max-width: $--max-width;
    &-carousel {
      width: $carousel-width;
      margin-top: 100px;
      min-width: 500px;
      &-img {
        display: block;
        margin: 0 auto;
        height: $carousel-image-height;
      }
    }
    .login-account {
      display: flex;
      flex-direction: column;
      margin: 0 160px;
      &-container {
        width: $width;
      }

      &-card {
        @extend .go-background-filter;
        @include filter-color('filter-color');
        box-shadow: 0 0 20px 5px rgba(40, 40, 40, 0.5);
      }

      &-top {
        padding-top: 10px;
        text-align: center;
        height: $account-img-height;
        margin-bottom: 20px;
      }
    }
  }

  &-footer {
    z-index: 2;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: $footer-height;
    text-align: center;
    line-height: $footer-height;
    color: $--color-text-2;
  }

  &-bg {
    z-index: 0;
    position: fixed;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: $--max-width;
    height: 100vh;
    background: url('@/assets/images/login/login-bg.png') no-repeat 0 -120px;
    .bg-slot {
      width: $carousel-width;
    }
    .bg-img-box {
      position: relative;
      display: flex;
      flex-wrap: wrap;
      width: 770px;
      margin-right: -20px;
      &-li {
        img {
          margin-right: 20px;
          margin-top: 20px;
          height: 230px;
          border-radius: 2 * $--border-radius-base;
          opacity: 0.9;
        }
      }
    }
  }
}
@media only screen and (max-width: 1200px) {
  .bg-img-box,
  .bg-slot,
  .go-login-carousel {
    display: none !important;
  }
  .go-login-box-footer {
    position: relative;
  }
}
</style>
