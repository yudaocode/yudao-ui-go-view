<template>
  <div class="go-login-box">
    <n-divider class="go-login-box-header" />
    <div class="go-login">
      <div class="go-login-carousel">
        <n-carousel autoplay>
          <img
            v-for="(e, i) in imgList"
            :key="i"
            class="go-login-carousel-img"
            :src="e"
            alt="展示图片"
          />
        </n-carousel>
      </div>
      <div class="login-account">
        <div class="login-account-container">
          <n-collapse-transition :appear="true" :show="show">
            <n-card title="登录">
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
                        <PersonOutline />
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
                        <LockClosedOutline />
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
      文档地址: http://www.mtruning.club/
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'
import { PersonOutline, LockClosedOutline } from '@vicons/ionicons5'
import imgOne from '@/assets/images/login/one.png'
import imgTwo from '@/assets/images/login/two.png'
import imgThree from '@/assets/images/login/three.png'

interface FormState {
  username: string
  password: string
}

const formRef = ref()
const message = useMessage()
const loading = ref(false)
const autoLogin = ref(true)
const show = ref(false)

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

const imgList = [imgOne, imgTwo, imgThree]

const router = useRouter()
const route = useRoute()

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
</script>

<style lang="scss" scoped>
$width: 450px;
$account-img-height: 270px;
$footer-height: 50px;
$account-height: calc(100vh - $footer-height);

* {
  box-sizing: border-box;
}
@include go(login-box) {
  height: 100vh;
  overflow: hidden;
  background-image: linear-gradient(120deg, #17171a 0%, #232324 100%);
  &-header {
    margin: 0px;
    padding-top: $--header-height;
  }

  @include go(login) {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-top: -$--header-height;
    &-carousel {
      width: 50%;
      &-img {
        height: 70vh;
      }
    }
    .login-account {
      z-index: 1;
      display: flex;
      flex-direction: column;
      height: $account-height;
      &-container {
        flex: 1;
        padding: 32px 0;
        width: $width;
        margin: 0 auto;
        margin-top: 100px;
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
    text-align: center;
    height: $footer-height;
    line-height: $footer-height;
    color: $--color-text-2;
  }

  @media (min-width: 768px) {
    .login-account {
      background-repeat: no-repeat;
      background-position: 50%;
      background-size: 100%;
    }

    .page-account-container {
      padding: 32px 0 24px 0;
    }
  }
}
</style>
