/*
 * @Author: outsider 515885633@qq.com
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\modules\monitor\log\data\Logger.data.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { reactive, h } from 'vue'
import i18n from '@/locales'
import { ElTag } from 'element-plus'
import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'

import { LoggerType } from '../api/types'

const { t } = i18n.global

const crudSchemas = reactive<CrudSchema[]>([
  {
    field: 'line',
    label: t('loggerVo.index'),
    type: 'index',
    form: { show: false }
  },
  {
    field: 'level',
    label: t('loggerVo.level'),
    // formatter: (row: LoggerType) => {
    //   return h(
    //     ElTag,
    //     {
    //       type: row.level == 'INFO' ? 'success' : row.level == 'ERROR' ? 'danger' : 'warning'
    //     },
    //     () =>
    //       row.level == 'INFO'
    //         ? t('common.info')
    //         : row.level == 'ERROR'
    //         ? t('common.error')
    //         : t('common.warning')
    //   )
    // },
    table: {
      component: 'DictTag',
      componentProps: {
        dictCode: 'logger_level'
      }
    },
    search: {
      show: true
    }
  },
  // {
  //   field: 'levelTag',
  //   label: t('loggerVo.level'),
  //   width: '100px',
  //   formatter: (row: LoggerType) => {
  //     return h(
  //       ElTag,
  //       {
  //         type: row.levelTag.colorStyle
  //       },
  //       () => row.levelTag.label
  //     )
  //   }
  // },
  {
    field: 'username',
    label: t('loggerVo.username'),
    width: '100px',
    search: {
      show: true
    }
  },
  {
    field: 'method',
    label: t('loggerVo.method'),
    search: {
      show: true
    }
  },
  {
    field: 'createTime',
    label: t('loggerVo.createTime'),
    width: '180px',
    form: {
      component: 'DatePicker',
      componentProps: {
        type: 'datetime',
        valueFormat: 'YYYY-MM-DD HH:mm:ss'
      }
    }
  },
  {
    field: 'action',
    label: t('tableDemo.action'),
    width: '360px',
    form: { show: false }
  }
])

export const { allSchemas } = useCrudSchemas(crudSchemas)
