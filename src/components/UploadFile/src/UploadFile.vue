<template>
  <div class="upload-file">
    <el-input v-model="valueRef" style="display: none" />
    <el-upload
      ref="uploadRef"
      :multiple="props.limit > 1"
      name="fileStream"
      v-model:file-list="fileList"
      :show-file-list="true"
      :auto-upload="autoUpload"
      :data="params"
      :action="updateUrl"
      method="post"
      :headers="uploadHeaders"
      :limit="props.limit"
      :drag="drag"
      :before-upload="beforeUpload"
      :on-exceed="handleExceed"
      :on-success="handleFileSuccess"
      :on-error="excelUploadError"
      :on-remove="handleRemove"
      :on-preview="handlePreview"
      class="upload-file-uploader"
    >
      <el-button type="primary"><Icon icon="ep:upload-filled" />选取文件</el-button>
      <template v-if="isShowTip" #tip>
        <div v-if="fileSize != 0" style="font-size: 8px">
          大小不超过 <b style="color: #f56c6c">{{ fileSize }}MB</b>
        </div>
        <div v-if="!fileType.includes('*')" style="font-size: 8px">
          格式为 <b style="color: #f56c6c">{{ fileType.join('/') }}</b> 的文件
        </div>
      </template>
    </el-upload>
  </div>
</template>
<script setup lang="ts" name="UploadFile">
import { PropType, ref, unref, watch } from 'vue'

import { propTypes } from '@/utils/propTypes'

import { getAccessToken } from '@/hooks/web/jwtToken'

import { ElMessage, ElUpload, ElButton, UploadFile, ElInput } from 'element-plus'
import type { UploadInstance, UploadUserFile, UploadProps, UploadRawFile } from 'element-plus'
import { FormProps } from '@/api/common/type'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: propTypes.string.def(''),
  title: propTypes.string.def('文件上传'),
  fileType: propTypes.array.def(['doc', 'xls', 'ppt', 'txt', 'pdf']), // 文件类型, 例如['png', 'jpg', 'jpeg']， * 不限制
  fileSize: propTypes.number.def(5), // 大小限制(MB), 0不限制
  limit: propTypes.number.def(5), // 数量限制
  drag: propTypes.bool.def(false), // 拖拽上传
  isShowTip: propTypes.bool.def(true), // 是否显示提示
  updateUrl: propTypes.string.def(import.meta.env.VITE_UPLOAD_URL),
  autoUpload: propTypes.bool.def(true), // 自动上传
  storageCode: propTypes.string.def('local'),
  relativePath: propTypes.string.def('/'),
  formProps: {
    type: Object as PropType<FormProps>,
    default: null
  },
  linkage: {
    type: Function as PropType<(formProps: FormProps, data: Recordable) => boolean>,
    default(formProps: FormProps) {
      const data = formProps?.formExpose?.formModel as Recordable
      console.log(data?.code?.toString())
    }
  }
})

// 用于自动上传传输参数
const params = ref({ storageCode: props.storageCode, relativePath: props.relativePath })

watch(
  () => props.modelValue,
  (val: string) => {
    if (val === unref(valueRef)) return
    valueRef.value = val
    // var 有可能是多个文件
    let filePaths: string[] = valueRef.value.split(',')
    filePaths?.forEach((path) => {
      let pos: number = path.lastIndexOf('/')
      let fileName: string = path.slice(pos + 1, -1)

      let file: UploadFile = {
        name: fileName,
        url: val,
        status: 'ready',
        uid: 0
      }
      uploadFiles.push(file)
    })
  }
)
watch(
  () => props.storageCode,
  (val: string) => {
    if (val !== params.value.storageCode) {
      params.value.storageCode = val
    }
  }
)
watch(
  () => props.relativePath,
  (val: string) => {
    if (val !== params.value.relativePath) {
      params.value.relativePath = val
    }
  }
)
// 传递参考值
const valueRef = ref(props.modelValue)

// ========== 上传相关 ==========
let uploadFiles: UploadUserFile[] = []
const uploadRef = ref<UploadInstance>()
const uploadList = ref<UploadUserFile[]>([])

// mark：为空需要初始化否则会报错卡住
const fileList = ref<UploadUserFile[]>(uploadFiles || [])

const uploadNumber = ref<number>(0)

const uploadHeaders = ref({
  Authorization: 'Bearer ' + getAccessToken()
  // ,
  // 'tenant-id': getTenantId()
})

// 文件上传之前判断
const beforeUpload: UploadProps['beforeUpload'] = async (file: UploadRawFile) => {
  // 校验数量
  if (fileList.value.length >= props.limit) {
    ElMessage.error(`上传文件数量不能超过${props.limit}个!`)
    return false
  }
  let fileExtension = ''
  if (file.name.lastIndexOf('.') > -1) {
    fileExtension = file.name.slice(file.name.lastIndexOf('.') + 1)
  }
  // 判断文件类型是否正确
  const isCorrectType = props.fileType.some((type: string) => {
    if (file.type.indexOf(type) > -1) return true
    return !!(fileExtension && fileExtension.indexOf(type) > -1)
  })

  if (!props.fileType.includes('*') && !isCorrectType) {
    ElMessage.error(`文件格式不正确, 请上传${props.fileType.join('/')}格式!`)
    return false
  }

  const isLimit = file.size < props.fileSize * 1024 * 1024
  // 判断文件大小是否正确
  if (props.fileSize != 0 && !isLimit) {
    ElMessage.error(`上传文件大小不能超过${props.fileSize}MB!`)
    return false
  }

  // 自定义校验
  if (props.formProps) {
    // 数据联动
    if ((await props.linkage(props.formProps, {})) === false) {
      return false
    }
  }
  // ElMessage.success('正在上传文件，请稍候...')
  uploadNumber.value++
}
// 处理上传的文件发生变化
// const handleFileChange = (uploadFile: UploadFile): void => {
//   uploadRef.value.data.path = uploadFile.name
// }
// 文件上传成功
const handleFileSuccess: UploadProps['onSuccess'] = (res: any): void => {
  const fileListNew = fileList.value
  fileListNew.pop()
  fileList.value = fileListNew
  uploadList.value.push({ name: res.data.name, url: res.data.url })

  if (uploadList.value.length == uploadNumber.value) {
    fileList.value = fileList.value.concat(uploadList.value)
    uploadList.value = []
    uploadNumber.value = 0
    emit('update:modelValue', listToString(fileList.value))
  }

  if (props.formProps) {
    // 数据联动
    props.linkage(props.formProps, res.data)
  }
  ElMessage.success('上传成功')
}
// 文件数超出提示
const handleExceed: UploadProps['onExceed'] = (): void => {
  ElMessage.error(`上传文件数量不能超过${props.limit}个!`)
}
// 上传错误提示
const excelUploadError: UploadProps['onError'] = (): void => {
  ElMessage.error('导入数据失败，请您重新上传！')
}
// 删除上传文件
const handleRemove = (file) => {
  const findex = fileList.value.map((f) => f.name).indexOf(file.name)
  if (findex > -1) {
    fileList.value.splice(findex, 1)
    emit('update:modelValue', listToString(fileList.value))
  }
}
const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log(uploadFile)
}
// 对象转成指定字符串分隔
const listToString = (list: UploadUserFile[], separator?: string) => {
  let strs = ''
  separator = separator || ','
  for (let i in list) {
    strs += list[i].url + separator
  }
  // todo
  return strs != '' ? strs.substr(0, strs.length - 1) : ''
}
</script>
<style scoped lang="scss">
.upload-file-uploader {
  margin-bottom: 5px;
}
:deep(.upload-file-list .el-upload-list__item) {
  border: 1px solid #e4e7ed;
  line-height: 2;
  margin-bottom: 10px;
  position: relative;
}
:deep(.el-upload-list__item-file-name) {
  max-width: 250px;
}
:deep(.upload-file-list .ele-upload-list__item-content) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: inherit;
}
:deep(.ele-upload-list__item-content-action .el-link) {
  margin-right: 10px;
}
</style>
