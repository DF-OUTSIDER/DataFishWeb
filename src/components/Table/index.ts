/*
 * @Author: outsider 515885633@qq.com
 * @Date: 2022-11-09
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\components\Table\index.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import Table from './src/Table.vue'
import { ElTable } from 'element-plus'
import { TableSetPropsType } from '@/types/table'

export interface TableExpose {
  setProps: (props: Recordable) => void
  setColumn: (columnProps: TableSetPropsType[]) => void
  selections: Recordable[]
  elTableRef: ComponentRef<typeof ElTable>
}

export { Table }
