/*
 * @Author: outsider
 * @Date: 2023-06-16
 * @Description:
 *
 * Copyright (c) 2023 by outsider, All Rights Reserved.
 */
import { BaseType } from '@/api/common/type'

export type GoViewProjectType = {
  status: number
  preview: string
  content: string
  remark: string
} & BaseType
