/*
 * @Author: outsider 515885633@qq.com
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \DataFishWeb\src\modules\system\menu\data\Menu.data.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { PropType, reactive, watch, h } from 'vue'
import { ElSwitch, ElMessage, ElMessageBox } from 'element-plus'
import { FormSchema } from '@/types/form'
import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import i18n from '@/locales'

import { useValidator } from '@/hooks/web/useValidator'
const { required, isEqual } = useValidator()

import { getMenuCascaderApi } from '@/modules/system/menu/api'
import { ComponentOptions } from '@/types/components'
import { FormProps } from '@/api/common/type'

const { t } = i18n.global

export const formProps = {
  formExpose: {},
  actionType: ''
} as FormProps

// 字段联动
const typeLinkage = (formProps: FormProps) => {
  // 表单联动测试
  // 获取表单数据
  const data = formProps?.formExpose?.formModel as Recordable
  if (data) {
    ElMessage.info(data.type)
    // 目录
    if (data.type === '0') {
    }
  }
}

const crudSchemas = reactive<CrudSchema[]>([
  {
    field: 'id',
    label: t('menuVo.index'),
    type: 'index',
    form: { show: false }
  },
  {
    field: 'name',
    label: t('menuVo.name'),
    search: {
      show: true
    },
    form: {
      component: 'Input',
      formItemProps: {
        rules: [required()]
      }
    }
  },
  {
    field: 'code',
    label: t('menuVo.code'),
    form: {
      component: 'Input',
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
        dictCode: 'menu_type'
      }
    },
    form: {
      component: 'DictRadioButton',
      value: '0',
      componentProps: {
        dictCode: 'menu_type',
        formProps: formProps,
        linkage: typeLinkage
      },
      formItemProps: {
        rules: [required()]
      }
    }
  },
  {
    field: 'sort',
    label: t('menuVo.sort'),
    form: {
      component: 'InputNumber',
      value: 0,
      formItemProps: {
        rules: [required()]
      }
    }
  },
  {
    field: 'path',
    label: t('menuVo.path'),
    form: {
      component: 'Input',
      formItemProps: {
        rules: [required()]
      }
    }
  },
  {
    field: 'component',
    label: t('menuVo.component'),
    form: {
      component: 'Input',
      formItemProps: {
        rules: [required()]
      }
    }
  },
  {
    field: 'redirect',
    label: t('menuVo.redirect'),
    table: { show: false },
    form: {
      component: 'Input'
    }
  },
  {
    field: 'enable',
    label: t('menuVo.enable'),
    formatter: (row: AppCustomRouteRecordRaw) => {
      return h(ElSwitch, { modelValue: row.enable, disabled: true })
    },
    width: 80,
    form: {
      component: 'Switch',
      value: true
    }
  },
  {
    field: 'action',
    label: t('tableDemo.action'),
    form: { show: false }
  }
])

const menuCascader = async () => {
  let data: ComponentOptions[] = []
  const res = await getMenuCascaderApi()
  if (res) {
    data = res.data
  }
  return data
}

menuCascader().then((data) => {
  crudSchemas.push(
    {
      field: 'parents',
      label: t('menuVo.parent'),
      table: { show: false },
      form: {
        component: 'Cascader',
        value: null,
        componentProps: {
          props: { checkStrictly: true },
          options: data
        }
      }
    },
    {
      field: 'field1',
      label: t('metaVo.remark'),
      table: { show: false },
      form: {
        component: 'Divider'
      }
    },
    {
      field: 'meta.title',
      label: t('metaVo.title'),
      table: { show: false },
      form: {
        component: 'Input',
        formItemProps: {
          rules: [required()]
        }
      }
    },
    {
      field: 'meta.icon',
      label: t('metaVo.icon'),
      table: { show: false },
      form: {
        component: 'IconSelect'
      }
    },
    {
      field: 'meta.noCache',
      label: t('metaVo.noCache'),
      table: { show: false },
      form: {
        component: 'Switch',
        value: true,
        formItemProps: {
          rules: [required()]
        }
      }
    },
    {
      field: 'meta.alwaysShow',
      label: t('metaVo.always'),
      table: { show: false },
      form: {
        component: 'Switch',
        value: false,
        formItemProps: {
          rules: [required()]
        }
      }
    },
    {
      field: 'meta.noTagsView',
      label: t('metaVo.noTagsView'),
      table: { show: false },
      form: {
        component: 'Switch',
        value: false
      }
    },
    {
      field: 'meta.hidden',
      label: t('metaVo.hidden'),
      table: { show: false },
      form: {
        component: 'Switch',
        value: false
      }
    },
    {
      field: 'meta.canTo',
      label: t('metaVo.canTo'),
      table: { show: false },
      form: {
        component: 'Switch',
        value: false
      }
    },
    {
      field: 'meta.activeMenu',
      label: t('metaVo.activeMenu'),
      table: { show: false },
      form: {
        component: 'Input'
      }
    }
  )
})

export { crudSchemas }

// export const { allSchemas } = useCrudSchemas(crudSchemas)
