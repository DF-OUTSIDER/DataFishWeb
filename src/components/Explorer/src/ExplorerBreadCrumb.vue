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
      disabled="true"
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
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item
          ><el-tag>[{{ props.explorerName }}]</el-tag></el-breadcrumb-item
        >
        <el-breadcrumb-item
          v-for="(item, index) in breadCrumbList"
          :key="index"
          :to="getRouteQuery(item)"
          >{{ item.name }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ElBreadcrumb, ElBreadcrumbItem, ElInput, ElTag } from 'element-plus'
import { PropType, ref, watch } from 'vue'
import router from '@/router'

//import { useI18n } from 'vue-i18n'

//const { t } = useI18n() // 国际化

const route = router.currentRoute.value

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
  }
})

// const fileType = props.fileType

const fileTypeMap = ref({
  1: '全部图片',
  2: '全部文档',
  3: '全部视频',
  4: '全部音乐',
  5: '其他',
  6: '回收站'
})
//  是否展示路径输入框
const isShowInput = ref(false)
//  路径输入
const inputFilePath = ref(props.filePath)
const breadCrumbList = ref(props.breadCrumbList)

const filePathInputRef = ref()

const handleClickBreadCrumbSelf = () => {
  isShowInput.value = true
}
const handleInputBlurEnter = () => {}
const getRouteQuery = () => {}

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
//@import '~_a/styles/varibles.styl';

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
