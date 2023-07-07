/*
 * @Author: outsider
 * @Date: 2023-06-07
 * @Description:
 *
 * Copyright (c) 2023 by outsider, All Rights Reserved.
 */

import { h, reactive } from 'vue'
import { ElMessage, ElSwitch } from 'element-plus'
import i18n from '@/locales'

import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import { useValidator } from '@/hooks/web/useValidator'

import { FormProps } from '@/api/common/type'
import { UploadFileType } from '../api/types'
import { formUtil, getFormData } from '@/utils/form'
import { getStorageConfigDetailApi } from '../../storage/api'
import { StorageConfigType } from '../../storage/api/types'

const { required } = useValidator()

const { t } = i18n.global

export const formProps = {
  formExpose: {},
  actionType: ''
} as FormProps

// 表单初始化方法
export const initForm = (formProps: FormProps) => {
  // 获取表单数据
  const colSchema = formProps?.formExpose?.getSchema('relativePath')
  if (colSchema.componentProps) {
    if (formProps.actionType === 'create') {
      colSchema.componentProps.disabled = false
    } else if (formProps.actionType === 'edit') {
      colSchema.componentProps.disabled = true
    }
  }
}

const upLinkage = async (formProps: FormProps, data: Recordable) => {
  const formData = formProps?.formExpose?.formModel as Recordable
  if (data.id) {
    // 更新完回调
    formProps?.formExpose?.setValues(data)
    const colSchema = formProps?.formExpose?.getSchema('relativePath')
    if (colSchema.componentProps) {
      colSchema.componentProps.disabled = true
    }
  } else {
    // 上传前自定义检查
    if (!formData.storageId) {
      ElMessage.error('请选择存储配置')
    } else {
      const res = (await getStorageConfigDetailApi(
        formData.storageId
      )) as unknown as StorageConfigType
      if (res) {
        formProps?.formExpose.updateSchema(
          {
            field: 'url',
            label: '上传',
            component: 'UploadFile',
            componentProps: {
              fileType: ['*'],
              fileSize: 0,
              limit: 1,
              formProps: formProps,
              storageCode: res?.data?.code,
              relativePath: formData.relativePath,
              linkage: upLinkage
            },
            formItemProps: {
              rules: [required()]
            }
          },
          'url'
        )
        return true
      }
      ElMessage.error('未知错误，请联系管理员！')
    }
    return false
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
    field: 'code',
    label: '码',
    form: {
      componentProps: {
        disabled: true
      }
    }
  },
  {
    field: 'name',
    label: '名称',
    form: {
      formItemProps: {
        rules: [required()]
      }
    }
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
    label: '文件尺寸',
    form: {
      componentProps: {
        disabled: true
      }
    }
  },
  {
    field: 'suffix',
    label: '后缀',
    form: {
      componentProps: {
        disabled: true
      }
    }
  },
  {
    field: 'md5',
    label: 'MD5',
    form: {
      componentProps: {
        disabled: true
      }
    }
  },
  {
    field: 'relativePath',
    label: '相对路径',
    form: {
      value: '/',
      componentProps: {
        disabled: false
      }
    }
  },
  {
    field: 'absolutePath',
    label: '绝对路径',
    form: {
      componentProps: {
        disabled: true
      }
    }
  },
  {
    field: 'type',
    label: '类型',
    form: {
      componentProps: {
        disabled: true
      }
    }
  },
  {
    field: 'storageId',
    label: '存储配置',
    table: { show: false },
    form: {
      value: null,
      component: 'StorageConfigMixedInput',
      formItemProps: {
        rules: [required()]
      }
    }
  },
  {
    field: 'url',
    label: '文件',
    form: {
      component: 'UploadFile',
      componentProps: {
        fileType: ['*'],
        fileSize: 0,
        limit: 1,
        formProps: formProps,
        storageCode: 'local',
        linkage: upLinkage
      },
      formItemProps: {
        rules: [required()]
      }
    }
  },
  {
    field: 'action',
    width: '360px',
    label: t('baseVo.action'),
    form: { show: false },
    detail: { show: false }
  }
])

export const { allSchemas } = useCrudSchemas(crudSchemas)
