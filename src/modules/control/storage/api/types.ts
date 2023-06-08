/*
 * @Author: outsider
 * @Date: 2023-06-08
 * @Description:
 *
 * Copyright (c) 2023 by outsider, All Rights Reserved.
 */
import { BaseType } from '@/api/common/type'

type ConfigType = {
  host: string
  port: number
  username: string
  password: string
  rootPath: string
}

export type StorageConfigType = {
  type: string
  config: ConfigType
} & BaseType
