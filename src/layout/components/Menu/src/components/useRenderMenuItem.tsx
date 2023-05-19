/*
 * @Author: outsider 515885633@qq.com
 * @Date: 2022-11-09
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\components\Menu\src\components\useRenderMenuItem.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { ElSubMenu, ElMenuItem } from 'element-plus'
import type { RouteMeta } from 'vue-router'
import { hasOneShowingChild } from '../helper'
import { isUrl } from '@/utils/is'
import { useRenderMenuTitle } from './useRenderMenuTitle'
import { useDesign } from '@/hooks/web/useDesign'
import { pathResolve } from '@/utils/routerHelper'

export const useRenderMenuItem = (
  // allRouters: AppRouteRecordRaw[] = [],
  menuMode: 'vertical' | 'horizontal'
) => {
  const renderMenuItem = (routers: AppRouteRecordRaw[], parentPath = '/') => {
    return routers.map((v) => {
      const meta = (v.meta ?? {}) as RouteMeta
      if (!meta.hidden) {
        const { oneShowingChild, onlyOneChild } = hasOneShowingChild(v.children, v)
        const fullPath = isUrl(v.path) ? v.path : pathResolve(parentPath, v.path) // getAllParentPath<AppRouteRecordRaw>(allRouters, v.path).join('/')

        const { renderMenuTitle } = useRenderMenuTitle()

        if (
          oneShowingChild &&
          (!onlyOneChild?.children || onlyOneChild?.noShowingChildren) &&
          !meta?.alwaysShow
        ) {
          return (
            <ElMenuItem index={onlyOneChild ? pathResolve(fullPath, onlyOneChild.path) : fullPath}>
              {{
                default: () => renderMenuTitle(onlyOneChild ? onlyOneChild?.meta : meta)
              }}
            </ElMenuItem>
          )
        } else {
          const { getPrefixCls } = useDesign()

          const preFixCls = getPrefixCls('menu-popper')
          if (v.children) {
            return (
              <ElSubMenu
                index={fullPath}
                popperClass={
                  menuMode === 'vertical' ? `${preFixCls}--vertical` : `${preFixCls}--horizontal`
                }
              >
                {{
                  title: () => renderMenuTitle(meta),
                  default: () => renderMenuItem(v.children!, fullPath)
                }}
              </ElSubMenu>
            )
          } else {
            return (
              <ElMenuItem
                index={onlyOneChild ? pathResolve(fullPath, onlyOneChild.path) : fullPath}
              >
                {{
                  default: () => renderMenuTitle(onlyOneChild ? onlyOneChild?.meta : meta)
                }}
              </ElMenuItem>
            )
          }
        }
      }
    })
  }

  return {
    renderMenuItem
  }
}
