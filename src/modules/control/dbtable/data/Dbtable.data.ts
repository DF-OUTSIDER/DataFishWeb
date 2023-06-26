/*
 * @Author: outsider 515885633@qq.com
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \DataFishWeb\src\modules\control\dbtable\data\Dbtable.data.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { reactive } from 'vue'
import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import i18n from '@/locales'

import { FormProps } from '@/api/common/type'
import { getDbsourcesApi } from '../../dbsource/api'

const { t } = i18n.global

export const formProps = {
  formExpose: {},
  actionType: ''
} as FormProps

const crudSchemas = reactive<CrudSchema[]>([
  //   {
  //     field: 'name',
  //     label: t('loggerVo.index'),
  //     type: 'index'
  //   },
  {
    field: 'dbCode',
    label: t('dbTableVo.dbCode'),
    search: {
      show: true,
      component: 'Select',
      api: async () => {
        const options = []
        const res = await getDbsourcesApi()
        if (res) {
          res.data.forEach((element) => {
            options.push({ label: element.code, value: element.code })
          })
        }
        return options
      }
    },
    table: { show: false },
    form: { show: false },
    detail: { show: false }
  },
  {
    field: 'name',
    label: t('dbTableVo.name'),
    search: { show: true }
  },
  {
    field: 'tableSchema',
    label: t('dbTableVo.tableSchema')
  },
  {
    field: 'engine',
    label: t('dbTableVo.engine')
  },
  {
    field: 'tableComment',
    label: t('dbTableVo.tableComment')
  },
  {
    field: 'createTime',
    label: t('dbTableVo.createTime'),
    width: '180px'
    // ,
    // form: {
    //   component: 'DatePicker',
    //   componentProps: {
    //     type: 'datetime',
    //     valueFormat: 'YYYY-MM-DD HH:mm:ss'
    //   }
    // }
  },
  {
    field: 'action',
    label: t('tableDemo.action'),
    width: '360px'
  }
])

export const { allSchemas } = useCrudSchemas(crudSchemas)
