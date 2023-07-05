/*
 * @Author: outsider 515885633@qq.com
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \DataFishWeb\src\modules\control\explorer\api\index.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import request from '@/config/axios'
import { WebExplorerType } from './types'

export const getPathLsApi = (data: WebExplorerType) => {
  return request.post({ url: '/webExplorer/pathLs', data })
}
