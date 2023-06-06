/*
 * @Author: outsider 515885633@qq.com
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \DataFishWeb\src\utils\dict.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { getDictDetailApi } from '@/modules/system/dict/api'
import { useDictStoreWithOut } from '@/store/modules/dict'
import { ElementPlusInfoType } from '@/types/elementPlus'

const dictStore = useDictStoreWithOut()

export interface DictOptionType {
  dictCode: string
  label: string
  value: string // | number | boolean
  colorType: ElementPlusInfoType | ''
  cssClass: string
}

export const getDictOptions = (dictCode: string) => {
  const dictItems = dictStore.getDictItems[dictCode]
  const dictOptions: DictOptionType[] = []
  dictItems.forEach((element) => {
    dictOptions.push({
      ...element,
      value: element.value + ''
    })
  })
  return dictOptions
}

// 更新数据字典，只对当前操作用户有用
export const updateDict = (dictId: number) => {
  getDictDetailApi(dictId).then((res) => {
    if (res) {
      const dictCode = res.data.code
      dictStore.removeDictByCode(dictCode)
      dictStore.initDict(dictCode)
    }
  })
}
