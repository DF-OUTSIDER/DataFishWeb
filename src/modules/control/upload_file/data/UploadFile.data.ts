/*
 * @Author: outsider
 * @Date: 2023-06-07
 * @Description:
 *
 * Copyright (c) 2023 by outsider, All Rights Reserved.
 */

import { h, reactive } from 'vue'
import { ElSwitch } from 'element-plus'
import i18n from '@/locales'

import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import { useValidator } from '@/hooks/web/useValidator'

import { UploadFileType } from '../api/types'

const { required } = useValidator()

const { t } = i18n.global

const crudSchemas = reactive<CrudSchema[]>([
  {
    field: 'id',
    label: t('baseVo.index'),
    type: 'index',
    form: { show: false }
  },
  {
    field: 'code',
    label: '码'
  },
  {
    field: 'name',
    label: '名称'
  },
  {
    field: 'enable',
    label: t('baseVo.enable'),
    formatter: (row: UploadFileType) => {
      return h(ElSwitch, { modelValue: row.enable, disabled: true })
    },
    form: {
      component: 'Switch',
      value: true,
      formItemProps: {
        rules: [required()]
      }
    }
  },
  {
    field: 'size',
    label: '文件尺寸'
  },
  {
    field: 'suffix',
    label: '后缀'
  },
  {
    field: 'md5',
    label: 'MD5'
  },
  {
    field: 'relative_path',
    label: '相对路径'
  },
  {
    field: 'absolute_path',
    label: '绝对路径'
  },
  {
    field: 'type',
    label: '类型'
  },
  {
    field: 'storage_id',
    label: '存储配置'
  },
  {
    field: 'url',
    label: 'URL'
  },
  {
    field: 'action',
    width: '360px',
    label: t('baseVo.action'),
    form: { show: false }
  }
])

export const { allSchemas } = useCrudSchemas(crudSchemas)
