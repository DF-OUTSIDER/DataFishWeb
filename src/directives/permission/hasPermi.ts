/*
 * @Author: outsider 515885633@qq.com
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \DataFishWeb\src\directives\permission\hasPermi.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import type { App, Directive, DirectiveBinding } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { USE_KEY, useCache } from '@/hooks/web/useCache'
import { intersection } from 'lodash-es'
import { isArray } from '@/utils/is'
import { useAppStoreWithOut } from '@/store/modules/app'

const { t } = useI18n()
const { wsCache } = useCache()
const appStore = useAppStoreWithOut()

// 全部权限
const all_permission = ['*::*::*']
const hasPermission = (value: string | string[]): boolean => {
  const currentUserInfo = wsCache.get(USE_KEY.CURRENT_USER)
  const permissions = currentUserInfo.permissions as string[]
  if (!value) {
    throw new Error(t('permission.hasPermission'))
  }
  if (!isArray(value)) {
    return permissions?.includes(value as string)
  }
  // else if (all_permission[0] === permissions[0]) {
  //   return true
  // }
  else {
    // 数组交集
    return (
      (intersection(all_permission, permissions) as string[]).length > 0 ||
      (intersection(value, permissions) as string[]).length > 0
    )
  }
}
function hasPermi(el: Element, binding: DirectiveBinding) {
  const value = binding.value

  const flag = hasPermission(value)
  if (!flag) {
    el.parentNode?.removeChild(el)
  }
}
const mounted = (el: Element, binding: DirectiveBinding<any>) => {
  hasPermi(el, binding)
}

const permiDirective: Directive = {
  mounted
}

export const setupPermissionDirective = (app: App<Element>) => {
  app.directive('hasPermi', permiDirective)
}

export default permiDirective
