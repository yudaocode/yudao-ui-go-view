<template>
  <!-- 登录 -->
  <div class="go-login-box">
    <div class="go-login-box-bg">
      <aside class="bg-slot"></aside>
      <aside class="bg-img-box">
        <transition-group name="list-complete">
          <template v-for="item in bgList" :key="item">
            <div class="bg-img-box-li list-complete-item">
              <n-collapse-transition :appear="true" :show="showBg">
                <img :src="getImageUrl(item, 'chart/charts')" alt="chart" />
              </n-collapse-transition>
            </div>
          </template>
        </transition-group>
      </aside>
    </div>
    <layout-header>
      <template #left></template>
      <template #right>
        <go-lang-select></go-lang-select>
        <go-theme-select></go-theme-select>
      </template>
    </layout-header>
    <div class="go-login">
      <div class="go-login-carousel">
        <n-carousel
          autoplay
          dot-type="line"
          :interval="Number(carouselInterval)"
        >
          <img
            v-for="(item, i) in carouselImgList"
            :key="i"
            class="go-login-carousel-img"
            :src="getImageUrl(item, 'login')"
            alt="image"
          />
        </n-carousel>
      </div>
      <div class="login-account">
        <div class="login-account-container">
          <n-collapse-transition :appear="true" :show="show">
            <n-card class="login-account-card" :title="$t('login.desc')">
              <div class="login-account-top">
                <img
                  class="login-account-top-logo"
                  src="~@/assets/images/login/input.png"
                  alt="展示图片"
                />
              </div>
              <n-form
                ref="formRef"
                label-placement="left"
                size="large"
                :model="formInline"
                :rules="rules"
              >
                <n-form-item path="tenantId" v-if="tenantEnable ==='true'">
                  <n-input
                      v-model:value="formInline.tenantName"
                      :placeholder="$t('global.form_tenant')"
                  >
                    <template #prefix>
                      <n-icon size="18">
                        <TvOutlineIcon></TvOutlineIcon>
                      </n-icon>
                    </template>
                  </n-input>
                </n-form-item>
                <n-form-item path="username">
                  <n-input
                    v-model:value="formInline.username"
                    :placeholder="$t('global.form_account')"
                  >
                    <template #prefix>
                      <n-icon size="18">
                        <PersonOutlineIcon></PersonOutlineIcon>
                      </n-icon>
                    </template>
                  </n-input>
                </n-form-item>
                <n-form-item path="password">
                  <n-input
                    v-model:value="formInline.password"
                    type="password"
                    show-password-on="click"
                    :placeholder="$t('global.form_password')"
                  >
                    <template #prefix>
                      <n-icon size="18">
                        <LockClosedOutlineIcon></LockClosedOutlineIcon>
                      </n-icon>
                    </template>
                  </n-input>
                </n-form-item>
                <n-form-item>
                  <div class="flex justify-between">
                    <div class="flex-initial">
                      <n-checkbox v-model:checked="autoLogin">{{
                        $t('login.form_auto')
                      }}</n-checkbox>
                    </div>
                  </div>
                </n-form-item>
                <n-form-item>
                  <n-button
                    type="primary"
                    @click="getCode"
                    size="large"
                    :loading="loading"
                    block
                    >{{ $t('login.form_button') }}</n-button
                  >
                </n-form-item>
                <Verify
                    ref="verify"
                    mode="pop"
                    :captchaType="captchaType"
                    :imgSize="{ width: '400px', height: '200px' }"
                    @success="handleSubmit"
                />
              </n-form>
            </n-card>
          </n-collapse-transition>
        </div>
      </div>
    </div>

    <div class="go-login-box-footer">
      <layout-footer></layout-footer>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import shuffle from 'lodash/shuffle'
import { carouselInterval } from '@/settings/designSetting'
import { useSystemStore } from '@/store/modules/systemStore/systemStore'
import { SystemStoreUserInfoEnum, SystemStoreEnum } from '@/store/modules/systemStore/systemStore.d'
import { GoThemeSelect } from '@/components/GoThemeSelect'
import { GoLangSelect } from '@/components/GoLangSelect'
import { LayoutHeader } from '@/layout/components/LayoutHeader'
import { LayoutFooter } from '@/layout/components/LayoutFooter'
import {PageEnum, PreviewEnum} from '@/enums/pageEnum'
import { StorageEnum } from '@/enums/storageEnum'
import { icon } from '@/plugins'
import {
  fetchPathByName,
  getSessionStorage,
  previewPath,
  routerTurnByName,
  routerTurnByPath,
  setSessionStorage
} from '@/utils'
import {getTenantIdByNameApi, getUserProfileApi, loginApi} from '@/api/path'
import { Verify } from '@/components/Verifition'

interface FormState {
  username: string
  password: string
}

const { GO_SYSTEM_STORE } = StorageEnum
const { PersonOutlineIcon, LockClosedOutlineIcon, TvOutlineIcon } = icon.ionicons5

const formRef = ref()
const loading = ref(false)
const autoLogin = ref(true)
const show = ref(false)
const showBg = ref(false)
const systemStore = useSystemStore()
const viteRouter = import.meta.env.VITE_ROUTER_DEFAULT
const t = window['$t']

const formInline = reactive({
  tenantName: '芋道源码',
  username: 'admin',
  password: 'admin123',
})

const rules = {
  username: {
    required: true,
    message: t('global.form_account'),
    trigger: 'blur',
  },
  password: {
    required: true,
    message: t('global.form_password'),
    trigger: 'blur',
  },
  tenantName: {
    required: true,
    message: t('global.form_password'),
    trigger: 'blur',
  },
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
  'radar',
])

// 处理url获取
const getImageUrl = (name: string, folder: string) => {
  return new URL(`../../assets/images/${folder}/${name}.png`, import.meta.url).href
}

// 打乱图片顺序
const shuffleHandle = () => {
  shuffleTimiing.value = setInterval(() => {
    bgList.value = shuffle(bgList.value)
  }, carouselInterval)
}

// 验证码
const verify = ref()
const captchaType = ref('blockPuzzle') // blockPuzzle 滑块 clickWord 点击文字
const captchaEnable = import.meta.env.VITE_APP_CAPTCHA_ENABLE
// 获取验证码
const getCode = async () => {
  // 情况一，未开启：则直接登录
  if (captchaEnable === 'false') {
    await handleSubmit({})
  } else {
    // 情况二，已开启：则展示验证码；只有完成验证码的情况，才进行登录
    // 弹出验证码
    verify.value.show()
  }
}

// 多租户
const tenantEnable = import.meta.env.VITE_APP_TENANT_ENABLE
// 获取租户 ID
const getTenantId = async () => {
  if (tenantEnable === 'true') {
    const res = await getTenantIdByNameApi(formInline.tenantName)
    if (res && res.data) {
      // 存储到 pinia
      systemStore.setItem(SystemStoreEnum.TENANT_INFO, {
        tenantId: res.data
      })
    }
  }
}

// 登录
const handleSubmit = async (params: any) => {
  formRef.value.validate(async (errors: any) => {
    if (!errors) {
      // 获取租户 ID
      await getTenantId()

      const { username, password } = formInline
      loading.value = true
      // 提交请求【登录】
      const loginRes = await loginApi({
        username,
        password,
        captchaVerification: params.captchaVerification
      })
      if(loginRes && loginRes.data) {
        // ① Token 信息（先存储下，保证可以加载个人信息）
        const tokenValue = loginRes.data.accessToken
        const tokenName = 'Authorization'
        const refreshToken	 = loginRes.data.refreshToken
        systemStore.setItem(SystemStoreEnum.USER_INFO, {
          [SystemStoreUserInfoEnum.USER_TOKEN]: tokenValue,
          [SystemStoreUserInfoEnum.TOKEN_NAME]: tokenName
        })

        // 个人信息
        const profileRes = await getUserProfileApi()
        const id = loginRes.data.userId
        const username = profileRes?.data?.nickname
        const nickname = profileRes?.data?.nickname
        // 存储到 pinia
        systemStore.setItem(SystemStoreEnum.USER_INFO, {
          [SystemStoreUserInfoEnum.USER_TOKEN]: tokenValue,
          [SystemStoreUserInfoEnum.USER_REFRESH_TOKEN]: refreshToken,
          [SystemStoreUserInfoEnum.TOKEN_NAME]: tokenName,
          [SystemStoreUserInfoEnum.USER_ID]: id,
          [SystemStoreUserInfoEnum.USER_NAME]: username,
          [SystemStoreUserInfoEnum.NICK_NAME]: nickname,
        })

        window['$message'].success(t('login.login_success'))

        const redirectPath:string = getSessionStorage('setRedirectPath') as string
        const redirectPathId = getSessionStorage('setRedirectPathId')
        console.log(redirectPath)
        console.log(redirectPathId)
        if(redirectPath && viteRouter==='false'){
          console.log("重定向缓存页面",redirectPath,viteRouter,!viteRouter,!!viteRouter)
          routerTurnByPath(redirectPath,[redirectPathId],true,false)
        }else{
            console.log("重定向到首页》》》")
            routerTurnByName(PageEnum.BASE_HOME_NAME, true);
        }
        // routerTurnByName(PageEnum.BASE_HOME_NAME, true)
      }
      loading.value = false
    } else {
      window['$message'].error(t('login.login_message'))
    }
  })
}

onMounted(() => {
  setTimeout(() => {
    show.value = true
  }, 300)

  setTimeout(() => {
    showBg.value = true
  }, 100)

  shuffleHandle()
})
</script>

<style lang="scss" scoped>
$width: 450px;
$go-login-height: 100vh;
$account-img-height: 210px;
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
    width: 100vw;
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
        @include fetch-bg-color('filter-color');
        box-shadow: 0 0 20px 5px rgba(40, 40, 40, 0.3);
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
    width: 100%;
    bottom: 0;
  }

  &-bg {
    z-index: 0;
    position: fixed;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100vw;
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
          width: 230px;
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
