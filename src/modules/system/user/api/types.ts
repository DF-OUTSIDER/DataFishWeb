/*
 * @Author: outsider 515885633@qq.com
 * @Date: 2022-11-09
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\modules\system\user\api\types.ts
 * @Description:
 *
 * Copyright (c) 2022 by outsider 515885633@qq.com, All Rights Reserved.
 */
export type UserLoginType = {
  username: string
  password: string
}

export type UserType = {
  id: number
  username: string
  realname: string

  encryptionType: string
  role: string
  roleId: string
  enable: boolean
  permissions: string | string[]

  oldPassword: string
  password: string
  confirmPassword: string
} & Recordable

export type UserProfileType = {
  user: UserType
} & Recordable
