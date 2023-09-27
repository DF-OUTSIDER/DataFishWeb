/*
 * @Author: outsider 515885633@qq.com
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \DataFishWeb\src\modules\control\explorer\api\type.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { BaseType } from '@/api/common/type'

export type WebExplorerEntry = {
  path: string
} & BaseType

export type WebExplorerType = {
  storageConfigId: number
  name: string
  path: string
}
