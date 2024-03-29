/*
 * @Author: outsider 515885633@qq.com
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \DataFishWeb\src\components\Form\src\componentMap.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import type { Component } from 'vue'
import {
  ElCascader,
  ElCheckboxGroup,
  ElColorPicker,
  ElDatePicker,
  ElImage,
  ElInput,
  ElInputNumber,
  ElRadioGroup,
  ElRate,
  ElSelect,
  ElSelectV2,
  ElSlider,
  ElSwitch,
  ElTimePicker,
  ElTimeSelect,
  ElTransfer,
  ElAutocomplete,
  ElDivider
} from 'element-plus'
import { InputPassword } from '@/components/InputPassword'
import { Editor } from '@/components/Editor'
import { CodeEdit } from '@/components/CodeMirror'
import { UploadImg, UploadImgs, UploadFile } from '@/components/UploadFile'

import { ComponentName } from '@/types/components'
import { IconSelect } from '@/components/Icon'
import { DictSelect, DictTag, DictRadio, DictRadioButton } from '@/components/Dict'
import {
  InputLinkage,
  NumberLinkage,
  SelectLinkage,
  SwitchLinkage,
  ImageLinkage
} from '@/components/Linkage'
import { StorageConfigMixedInput } from '@/components/MixedInput/storage'

// mark: 组件映射
const componentMap: Recordable<Component, ComponentName> = {
  Radio: ElRadioGroup,
  Checkbox: ElCheckboxGroup,
  CheckboxButton: ElCheckboxGroup,
  Image: ElImage,
  Input: ElInput,
  Autocomplete: ElAutocomplete,
  InputNumber: ElInputNumber,
  Select: ElSelect,
  Cascader: ElCascader,
  Switch: ElSwitch,
  Slider: ElSlider,
  TimePicker: ElTimePicker,
  DatePicker: ElDatePicker,
  Rate: ElRate,
  ColorPicker: ElColorPicker,
  Transfer: ElTransfer,
  Divider: ElDivider,
  TimeSelect: ElTimeSelect,
  SelectV2: ElSelectV2,
  RadioButton: ElRadioGroup,
  InputPassword: InputPassword,
  IconSelect: IconSelect,
  Editor: Editor,
  CodeEdit: CodeEdit,
  UploadImg: UploadImg,
  UploadImgs: UploadImgs,
  UploadFile: UploadFile,
  DictSelect: DictSelect,
  DictRadioButton: DictRadioButton,
  DictRadio: DictRadio,
  DictTag: DictTag,
  InputLinkage: InputLinkage,
  NumberLinkage: NumberLinkage,
  SelectLinkage: SelectLinkage,
  SwitchLinkage: SwitchLinkage,
  ImageLinkage: ImageLinkage,
  StorageConfigMixedInput: StorageConfigMixedInput
}

export { componentMap }
