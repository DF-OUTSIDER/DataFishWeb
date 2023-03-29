/*
 * @Author: outsider 515885633@qq.com
 * @Date: 2022-11-09
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\api\login\types.ts
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
  password: string
  encryptionType: number
  role: string
  roleId: string
  enable: boolean
  permissions: string | string[]
}
