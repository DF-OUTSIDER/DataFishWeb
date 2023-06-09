/*
 * @Author: outsider
 * @Date: 2023-06-08
 * @Description:
 *
 * Copyright (c) 2023 by outsider, All Rights Reserved.
 */

import { h, reactive } from 'vue'
import { ElSwitch } from 'element-plus'
import i18n from '@/locales'

import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import { useValidator } from '@/hooks/web/useValidator'

import { FormProps } from '@/api/common/type'
import { StorageConfigType } from '../api/types'
import { formUtil } from '@/utils/form'

const { required } = useValidator()

const { t } = i18n.global

export const formProps = {
  formExpose: {},
  actionType: ''
} as FormProps

const typeLinkage = (formProps: FormProps) => {
  // 表单联动测试
  // 获取表单数据
  const data = formProps?.formExpose?.formModel as Recordable
  if (data) {
    if (['3', '4'].includes(data.type)) {
      // FTP\SFTP
      formUtil.isShowSchema(data, formProps, 'config.port')
      formUtil.isShowSchema(data, formProps, 'config.username')
      formUtil.isShowSchema(data, formProps, 'config.password')
      formUtil.isShowSchema(data, formProps, 'config.rootPath')
    } else if (data.type == '1') {
      // 数据库
      formUtil.isShowSchema(data, formProps, 'config.port')
      formUtil.isShowSchema(data, formProps, 'config.username')
      formUtil.isShowSchema(data, formProps, 'config.password')
      // 隐藏
      formUtil.isHiddenSchema(data, formProps, 'config.rootPath')
    } else if (data.type == '2') {
      // 本地存储
      // 隐藏
      formUtil.isHiddenSchema(data, formProps, 'config.port')
      formUtil.isHiddenSchema(data, formProps, 'config.username')
      formUtil.isHiddenSchema(data, formProps, 'config.password')

      formUtil.isShowSchema(data, formProps, 'config.domain')
    }
  }
}

const crudSchemas = reactive<CrudSchema[]>([
  {
    field: 'id',
    label: t('baseVo.index'),
    type: 'index',
    form: { show: false }
  },
  {
    field: 'name',
    label: '名称'
  },
  {
    field: 'code',
    label: '码'
  },
  {
    field: 'enable',
    label: t('baseVo.enable'),
    formatter: (row: StorageConfigType) => {
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
    field: 'type',
    label: t('menuVo.type'),
    search: {
      show: true
    },
    table: {
      component: 'DictTag',
      componentProps: {
        dictCode: 'storage_type'
      }
    },
    form: {
      component: 'DictRadioButton',
      componentProps: {
        dictCode: 'storage_type',
        formProps: formProps,
        linkage: typeLinkage
      },
      formItemProps: {
        rules: [required()]
      },
      colProps: {
        span: 24
      }
    }
  },
  {
    field: 'config.domain',
    label: '域名',
    table: { show: false },
    form: {
      formItemProps: {
        rules: [required()]
      }
    }
  },
  {
    field: 'config.host',
    label: '地址',
    table: { show: false },
    form: {
      formItemProps: {
        rules: [required()]
      }
    }
  },
  {
    field: 'config.port',
    label: '端口',
    table: { show: false },
    form: {
      formItemProps: {
        rules: [required()]
      }
    }
  },
  {
    field: 'config.username',
    label: '用户名',
    table: { show: false },
    form: {
      formItemProps: {
        rules: [required()]
      }
    }
  },
  {
    field: 'config.password',
    label: '密码',
    table: { show: false },
    form: {
      formItemProps: {
        rules: [required()]
      }
    }
  },
  {
    field: 'config.rootPath',
    label: '根目录',
    table: { show: false },
    form: {
      formItemProps: {
        rules: [required()]
      }
    }
  }
  // ,
  // {
  //   field: 'action',
  //   width: '360px',
  //   label: t('baseVo.action'),
  //   form: { show: false },
  //   detail: { show: false }
  // }
])

export const { allSchemas } = useCrudSchemas(crudSchemas)
