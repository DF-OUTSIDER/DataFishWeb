/*
 * @Author: outsider
 * @Date: 2023-06-19
 * @Description:
 *
 * Copyright (c) 2023 by outsider, All Rights Reserved.
 */
import { BaseType } from '@/api/common/type'

export type DbSourceType = {
  username: string
  password: string
  url: string
  driver: string
  type: string
} & BaseType
