/*
 * @Author: outsider
 * @Date: 2023-06-07
 * @Description:
 *
 * Copyright (c) 2023 by outsider, All Rights Reserved.
 */
import { BaseType } from '@/api/common/type'

export type UploadFileType = {
  size: number
  suffix: string
  md5: string
  relativePath: string
  absolutePath: string
  type: string
  storageId: number
  url: string
} & BaseType
