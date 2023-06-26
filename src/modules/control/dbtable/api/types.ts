/*
 * @Author: outsider 515885633@qq.com
 * @Date: 2023-03-14
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \DataFishWeb\src\modules\control\dbtable\api\types.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
// 数据库表单信息
export type DbTableType = {
  code: string
  name: string
  tableSchema: string
  tableComment: string
  dbsourceId: number
}

export type DbTableConfigType = {
  code: string
  module: string
  className: string
  dbsourceId: number
}
