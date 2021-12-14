<template>
  <div class="go-login">
    <div class="login-account">
      <div class="login-account-header"></div>
      <div class="login-account-container">
        <div class="login-account-top">
          <div class="login-account-top-logo">
            <img src="~@/assets/images/logo.png" alt="" />
          </div>
          <div class="login-account-top-desc">
            GoView
          </div>
        </div>
        <div class="login-account-form">
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
                  <n-icon size="18" color="#808695">
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
                  <n-icon size="18" color="#808695">
                    <LockClosedOutline />
                  </n-icon>
                </template>
              </n-input>
            </n-form-item>
            <n-form-item class="default-color">
              <div class="flex justify-between">
                <div class="flex-initial">
                  <n-checkbox v-model:checked="autoLogin">自动登录</n-checkbox>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'
import { PersonOutline, LockClosedOutline } from '@vicons/ionicons5'

interface FormState {
  username: string
  password: string
}

const formRef = ref()
const message = useMessage()
const loading = ref(false)
const autoLogin = ref(true)

const formInline = reactive({
  username: 'admin',
  password: '123456'
})

const rules = {
  username: { required: true, message: '请输入用户名', trigger: 'blur' },
  password: { required: true, message: '请输入密码', trigger: 'blur' }
}

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
@include go(login) {
  .login-account {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: auto;
    background-image: linear-gradient(to top, #fff1eb 0%, #ace0f9 100%);

    &-container {
      flex: 1;
      padding: 32px 0;
      width: 384px;
      margin: 0 auto;
      margin-top: 100px;
    }

    &-top {
      padding: 32px 0;
      text-align: center;

      &-desc {
        font-size: 14px;
        color: #808695;
      }
    }

    &-other {
      width: 100%;
    }

    .default-color {
      color: #515a6e;

      .ant-checkbox-wrapper {
        color: #515a6e;
      }
    }
  }
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
</style>
