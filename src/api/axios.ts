import axios, { AxiosResponse, AxiosRequestConfig, Axios } from 'axios'
import { ResultEnum, ModuleTypeEnum } from "@/enums/httpEnum"
import {PageEnum, ErrorPageNameMap, PreviewEnum} from "@/enums/pageEnum"
import { StorageEnum } from '@/enums/storageEnum'
import { axiosPre } from '@/settings/httpSetting'
import { SystemStoreEnum, SystemStoreUserInfoEnum } from '@/store/modules/systemStore/systemStore.d'
import {
    redirectErrorPage,
    getLocalStorage,
    routerTurnByName,
    isPreview,
    clearAllSessio,
    clearAllStorage,
    setLocalStorage,
    setSessionStorage, fetchRouteParamsLocation, fetchRouteName, logout, fetchRoutePath
} from '@/utils'
import { fetchAllowList } from './axios.config'
import includes from 'lodash/includes'
import {useSystemStore} from "@/store/modules/systemStore/systemStore";
import { useDialog } from 'naive-ui'
// Axios 无感知刷新令牌，参考 https://www.dashingdog.cn/article/11 与 https://segmentfault.com/a/1190000020210980 实现
// 请求队列
let requestList: any[] = []
// 是否正在刷新中
let isRefreshToken = false
// 请求路径
let base_url=`${import.meta.env.PROD ? import.meta.env.VITE_PRO_PATH : ''}${axiosPre}`

const dialog = useDialog()

export interface MyResponseType<T> {
  code: ResultEnum
  data: T
  message: string
}

export interface MyRequestInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): Promise<MyResponseType<T>>
}

const axiosInstance = axios.create({
  baseURL: base_url,
  timeout: ResultEnum.TIMEOUT,
}) as unknown as MyRequestInstance

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 获取 tenantId
    const info = getLocalStorage(StorageEnum.GO_SYSTEM_STORE)
      // console.log(window.location)
    const tenantId = info ? info[SystemStoreEnum.TENANT_INFO]['tenantId'] : undefined
    if (tenantId) {
      config.headers = {
        ...config.headers,
        'tenant-id': tenantId
      }
    }

    // 白名单校验
    if (includes(fetchAllowList, config.url)) return config
    // 获取 token
    // 重新登录
    if (!info) {
      routerTurnByName(PageEnum.BASE_LOGIN_NAME)
      return config
    }
    const userInfo = info[SystemStoreEnum.USER_INFO]
    config.headers = {
      ...config.headers,
      [userInfo[SystemStoreUserInfoEnum.TOKEN_NAME] || 'token']: 'Bearer ' + userInfo[SystemStoreUserInfoEnum.USER_TOKEN] || ''
    }
    return config
  },
  (err: AxiosRequestConfig) => {
    Promise.reject(err)
  }
)

// 响应拦截器
axiosInstance.interceptors.response.use(
    async (res: AxiosResponse<any>) => {
    const config = res.config

    const { code,msg } = res.data as { code: number,msg:string }

     if (code === undefined || code === null) return Promise.resolve(res)
    // 预览页面错误不进行处理
    if (isPreview()&&code!==ResultEnum.TOKEN_OVERDUE) {
      return Promise.resolve(res.data)
    }
    // 如果是验证码的返回，直接返回数据


    // 成功
    if (code === ResultEnum.SUCCESS) {
      return Promise.resolve(res.data)
    }

    // 登录过期
    if (code === ResultEnum.TOKEN_OVERDUE) {
        // 如果未认证，并且未进行刷新令牌，说明可能是访问令牌过期了
        console.log('Auth2:-------------------准备刷新令牌-----------------')
        if (!isRefreshToken) {
            isRefreshToken = true
            const info = getLocalStorage(StorageEnum.GO_SYSTEM_STORE)
            // console.log(window.location)
            const refreshToken = info ? info[SystemStoreEnum.USER_INFO][SystemStoreUserInfoEnum.USER_REFRESH_TOKEN] : undefined
            // 1. 如果获取不到刷新令牌，则只能执行登出操作

            if (!refreshToken) {
                console.log('无刷新令牌,即将返回。')
                return handleAuthorized()
            }
            // 2. 进行刷新访问令牌
            try {
                const systemStore = useSystemStore()
                const refreshTokenRes = await getTefreshToken()
                // 2.1 刷新成功，则回放队列的请求 + 当前请求
                systemStore.setItem(SystemStoreEnum.USER_INFO, {
                    [SystemStoreUserInfoEnum.USER_TOKEN]: (await refreshTokenRes).data.data.accessToken,
                    [SystemStoreUserInfoEnum.USER_REFRESH_TOKEN]: (await refreshTokenRes).data.data.refreshToken,
                    [SystemStoreUserInfoEnum.TOKEN_NAME]: 'Authorization'
                })
                //修改当前访问令牌
                // config.headers!.Authorization = 'Bearer ' + (await refreshTokenRes).data.data.accessToken
                const userInfo = info[SystemStoreEnum.USER_INFO]
                config.headers = {
                    ...config.headers,
                    [userInfo[SystemStoreUserInfoEnum.TOKEN_NAME] || 'token']: 'Bearer ' + userInfo[SystemStoreUserInfoEnum.USER_TOKEN] || ''
                }

                requestList.forEach((cb: any) => {
                    cb()
                })
                requestList = []
                console.log('Auth2:-------------------令牌刷新成功-----------------')
                return axiosInstance(config)
            } catch (e) {
                // 为什么需要 catch 异常呢？刷新失败时，请求因为 Promise.reject 触发异常。
                // 2.2 刷新失败，只回放队列的请求
                requestList.forEach((cb: any) => {
                    cb()
                })
                // 提示是否要登出。即不回放当前请求！不然会形成递归
                return handleAuthorized()
            } finally {
                requestList = []
                isRefreshToken = false
            }
        } else {
            console.log('Auth2:-------------------已添加刷新队列-----------------')
            const info = getLocalStorage(StorageEnum.GO_SYSTEM_STORE)
            // 添加到队列，等待刷新获取到新的令牌
            return new Promise((resolve) => {
                requestList.push(() => {
                    const userInfo = info[SystemStoreEnum.USER_INFO]
                    config.headers!.Authorization = 'Bearer ' + userInfo[SystemStoreUserInfoEnum.USER_TOKEN] // 让每个请求携带自定义token 请根据实际情况自行修改
                    resolve(axiosInstance(config))
                })
            })
        }

    }

    // 固定错误码重定向
    if (ErrorPageNameMap.get(code)) {
      redirectErrorPage(code)
      return Promise.resolve(res.data)
    }

        if (code !== 200) {
            if (msg === '无效的刷新令牌') {
                // hard coding：忽略这个提示，直接登出
                console.log(msg)
                return handleAuthorized()
            } else {
                window['$message'].error(msg)
            }
            return Promise.reject('error')
        }

    // 提示错误
    window['$message'].error(window['$t']((res.data as any).msg))
    return Promise.resolve(res.data)
  },
  (err: AxiosResponse) => {
    Promise.reject(err)
  }
)


const getTefreshToken = async () => {
    let tenantData =  getLocalStorage(StorageEnum.GO_SYSTEM_STORE)
    axios.defaults.headers.common['tenant-id'] = tenantData[SystemStoreEnum.TENANT_INFO]['tenantId'] ?? undefined;
    return await axios.post(base_url + '/system/auth/refresh-token?refreshToken=' + tenantData[SystemStoreEnum.USER_INFO][SystemStoreUserInfoEnum.USER_REFRESH_TOKEN] ?? undefined)
}


const handleAuthorized  = () =>{
    // window['$message'].error(window['$t']('http.token_overdue_message'))
    console.log(useDialog())
    window['$dialog'].warning( {title: '登录已超时',
        content: '登录超时，请重新登录。',
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: () => {
            // session 不需要清除 clearAllSessio() //清除所有Session缓存
            clearAllStorage() //清除所有Storage缓存
            //临时缓存跳回目录进行登录重新跳回
            if('/chart/preview' === fetchRoutePath()){
                setSessionStorage('setRedirectPath','/chart/preview')
                setSessionStorage('setRedirectPathId', fetchRouteParamsLocation())
            }
            logout()
            return Promise.resolve(window['$t']('http.token_overdue_message'))
        }
    })
}
export default axiosInstance
