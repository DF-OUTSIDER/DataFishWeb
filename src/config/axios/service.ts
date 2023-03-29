/*
 * @Author: outsider 515885633@qq.com
 * @Date: 2022-11-09
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\config\axios\service.ts
 * @Description:
 *
 * Copyright (c) 2022 by outsider 515885633@qq.com, All Rights Reserved.
 */
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  // todo 待处理
  //InternalAxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
  AxiosError
} from 'axios'

import qs from 'qs'

import { config } from './config'

import { setToken, getToken } from '@/hooks/web/jwtToken'

import { ElMessage, ElMessageBox } from 'element-plus'

import { useCache } from '@/hooks/web/useCache'
import { resetRouter } from '@/router'
import { useRouter } from 'vue-router'
import { useTagsViewStore } from '@/store/modules/tagsView'

import i18n from '@/locales'
const { t } = i18n.global

const tagsViewStore = useTagsViewStore()

const { wsCache } = useCache()

const replace = useRouter()

const { result_code, base_url } = config

export const PATH_URL = base_url[import.meta.env.VITE_API_BASEPATH]

// 创建axios实例
const service: AxiosInstance = axios.create({
  baseURL: PATH_URL, // api 的 base_url
  timeout: config.request_timeout // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (
      config.method === 'post' &&
      (config.headers as AxiosRequestHeaders)['Content-Type'] ===
        'application/x-www-form-urlencoded'
    ) {
      config.data = qs.stringify(config.data)
    }

    // 添加 token
    const token = getToken()

    console.log(token)

    if (token) {
      config.headers['Authorization'] = token
    }
    // ;(config.headers as AxiosRequestHeaders)['Token'] = 'test test'
    // get参数编码
    if (config.method === 'get' && config.params) {
      let url = config.url as string
      url += '?'
      const keys = Object.keys(config.params)
      for (const key of keys) {
        if (config.params[key] !== void 0 && config.params[key] !== null) {
          url += `${key}=${encodeURIComponent(config.params[key])}&`
        }
      }
      url = url.substring(0, url.length - 1)
      config.params = {}
      config.url = url
    }
    return config
  },
  (error: AxiosError) => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    if (response.config.responseType === 'blob') {
      // 如果是文件流，直接过
      return response
    } else if (response.data.code === result_code) {
      if (typeof response.data.data === 'string') {
        const data = response.data.data as string
        if (data.startsWith('Bearer ')) {
          setToken(data, true)
        }
      }
      return response.data
    } else {
      ElMessage.error(response.data.message)
    }
  },
  (error: AxiosError) => {
    console.log('err' + error) // for debug
    //ElMessage.error(error.message)
    ElMessage.error(error.response.data.message)
    if (error.response?.status === 401) {
      ElMessageBox.confirm(t('common.timeoutMessage'), t('common.confirmTitle'), {
        confirmButtonText: t('login.relogin'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      })
        .then(() => {
          wsCache.clear()
          tagsViewStore.delAllViews()
          resetRouter() // 重置静态路由表
          window.location.href = '/'
        })
        .catch(() => {
          //isRelogin.show = false
          console.log('err') // for debug
        })
    }
    return Promise.reject(error)
  }
)

export { service }
