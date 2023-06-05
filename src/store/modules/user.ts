/*
 * @Author: outsider 515885633@qq.com
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \DataFishWeb\src\store\modules\user.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { defineStore } from 'pinia'
import { store } from '../index'
import { getAccessToken, removeToken } from '@/hooks/web/jwtToken'
import { USE_KEY, useCache } from '@/hooks/web/useCache'
import { getCurrentUserApi } from '@/api/login'

const { wsCache } = useCache()

interface CurrentUserVo {
  permissions: string[]
  isCurrentUser: boolean
}

export const useUserStore = defineStore('user-store', {
  state: (): CurrentUserVo => ({
    permissions: [],
    isCurrentUser: false
  }),
  getters: {
    getPermissions(): string[] {
      return this.permissions
    },
    getIsCurrentUser(): boolean {
      return this.isCurrentUser
    }
  },
  actions: {
    async setCurrentUserInfoAction() {
      if (!getAccessToken()) {
        this.resetState()
        return null
      }
      let currentUserInfo = wsCache.get(USE_KEY.CURRENT_USER)
      if (!currentUserInfo) {
        const res = await getCurrentUserApi()
        if (res) {
          currentUserInfo = res.data
        }
      }
      this.permissions = currentUserInfo.permissions
      this.isCurrentUser = true
      wsCache.set(USE_KEY.CURRENT_USER, currentUserInfo)
    },
    loginOut() {
      removeToken()
      wsCache.clear()
      this.resetState()
    },
    resetState() {
      this.permissions = []
      this.isCurrentUser = false
    }
  }
})

export const useUserStoreWithOut = () => {
  return useUserStore(store)
}
