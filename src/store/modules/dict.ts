/*
 * @Author: outsider 515885633@qq.com
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \DataFishWeb\src\store\modules\dict.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { defineStore } from 'pinia'
import { store } from '../index'
import { USE_KEY, useCache } from '@/hooks/web/useCache'
import { getDictItemsApi } from '@/modules/system/dict/api'
import { DictItemQuery } from '@/modules/system/dict/api/types'

const { wsCache } = useCache()

export interface DictState {
  isSetDict: boolean
  /** @deprecated */
  dictObj: Recordable
  dictItems: Map<string, any>
}

export const useDictStore = defineStore('dict', {
  state: (): DictState => ({
    isSetDict: false,
    dictObj: {},
    dictItems: new Map<string, any>()
  }),
  getters: {
    /** @deprecated */
    getDictObj(): Recordable {
      return this.dictObj
    },
    getDictItems(): any {
      const items = wsCache.get(USE_KEY.DICT)
      if (items) {
        this.dictItems = items
      }
      return this.dictItems
    },
    getIsSetDict(): boolean {
      return this.isSetDict
    }
  },
  actions: {
    /** @deprecated */
    setDictObj(dictObj: Recordable) {
      this.dictObj = dictObj
    },
    async initDict(dictCode: string) {
      const dictItemQuery = {
        dictCode: dictCode,
        enable: true
      }
      // 字典查询失败后查询后台
      const res = await getDictItemsApi(dictItemQuery as DictItemQuery)
      console.log('执行字典查询')
      if (res) {
        const dictArr = res.data
        if (Array.isArray(dictArr)) {
          // 保存到字典中
          this.setDictItems(dictCode, dictArr)
        }
      }
      return this.dictItems
    },
    setDictItems(dictCode: string, items: any) {
      this.getDictItems
      if (!this.dictItems[dictCode]) {
        this.dictItems[dictCode] = items
        this.isSetDict = true
        wsCache.set(
          USE_KEY.DICT,
          this.dictItems
          //, { exp: 60 }
        ) // 60 秒 过期
      }
    },
    setIsSetDict(isSetDict: boolean) {
      this.isSetDict = isSetDict
    },
    removeDictByCode(dictCode: string) {
      this.getDictItems
      this.dictItems.delete(dictCode)
      if (this.dictItems.delete(dictCode)) {
        wsCache.set(
          USE_KEY.DICT,
          this.dictItems
          //, { exp: 60 }
        ) // 60 秒 过期
      }
    },
    getDictByCode(dictCode: string) {
      this.getDictItems
      return this.dictItems[dictCode]
    }
  }
})

export const useDictStoreWithOut = () => {
  return useDictStore(store)
}
