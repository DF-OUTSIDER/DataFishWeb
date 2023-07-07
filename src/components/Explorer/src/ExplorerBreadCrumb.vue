<!--
 * @Author: outsider 515885633@qq.com
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \DataFishWeb\src\components\Explorer\src\ExplorerBreadCrumb.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div class="explorer-breadcrumb-wrapper">
    <div class="title">目录位置：</div>
    <el-input
      class="file-path-input"
      ref="filePathInputRef"
      placeholder="请输入路径"
      v-model="inputFilePath"
      size="50"
      :autofocus="true"
      v-show="isShowInput"
      @blur="handleInputBlurEnter"
      @change="handleInputBlurEnter"
    >
      <template #prepend
        ><el-tag>[{{ props.explorerName }}]</el-tag></template
      >
    </el-input>
    <div
      class="breadcrumb-box"
      :class="{ 'able-input': props.fileType === 0 }"
      v-show="!isShowInput"
      @click.self="handleClickBreadCrumbSelf"
    >
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          ><a href="javascript:;" @click="toDirectory('/', -1)"
            ><el-tag type="success">[{{ props.explorerName }}]</el-tag></a
          ></el-breadcrumb-item
        >
        <el-breadcrumb-item v-for="(item, index) in breadCrumbList" :key="index"
          ><a href="javascript:;" @click="toDirectory(item, index)">{{
            item
          }}</a></el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ElBreadcrumb, ElBreadcrumbItem, ElInput, ElTag } from 'element-plus'
import { PropType, ref, watch } from 'vue'

const props = defineProps({
  explorerName: {
    type: String as PropType<string>,
    default: ''
  },
  // 文件类型
  fileType: {
    required: true,
    type: Number as PropType<number>,
    default: 1
  },
  // 文件路径
  filePath: {
    require: true,
    type: String as PropType<string>,
    default: ''
  },
  breadCrumbList: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  clickToDirectoryCallBack: {
    type: Function as PropType<(path: string, index: number) => void>,
    default(path: string) {
      console.log(path)
    }
  },
  // 失去焦点或回车回调
  blurEnterExplorerPathCallBack: {
    type: Function as PropType<(path: string) => void>,
    default(path: string) {
      console.log(path)
    }
  }
})

//  是否展示路径输入框
const isShowInput = ref(false)
//  路径输入
const inputFilePath = ref(props.filePath)
const breadCrumbList = ref(props.breadCrumbList)

const filePathInputRef = ref()

// 跳转到目录
const toDirectory = (path: string, index: number) => {
  props.clickToDirectoryCallBack(path, index)
}
const handleClickBreadCrumbSelf = () => {
  isShowInput.value = true
}

// 路径输入框失去焦点或用户按下回车时触发
const handleInputBlurEnter = () => {
  isShowInput.value = false
  // 检查路径是否发生了变化
  if (inputFilePath.value !== props.filePath) {
    const fixInputFilePath = inputFilePath.value.endsWith('/')
      ? inputFilePath.value
      : (inputFilePath.value += '/')
    props.blurEnterExplorerPathCallBack(fixInputFilePath)
  }
}

watch(
  () => props.filePath,
  (val: string) => {
    inputFilePath.value = val
  }
)

watch(
  () => props.breadCrumbList,
  (val: string[]) => {
    breadCrumbList.value = val
  }
)
</script>

<style lang="scss" scoped>
.explorer-breadcrumb-wrapper {
  padding: 0;
  height: 30px;
  line-height: 30px;
  display: flex;

  .title,
  .el-breadcrumb {
    height: 30px;
    line-height: 30px;
  }

  .file-path-input {
    flex: 1;
    font-size: 14px;
  }
  .breadcrumb-box {
    padding: 0 8px;
    flex: 1;
    display: flex;
    &.able-input {
      cursor: pointer;
      &:hover {
        background: #fff;
      }
    }
  }
}
</style>
