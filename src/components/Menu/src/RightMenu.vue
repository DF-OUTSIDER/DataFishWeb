<!--
 * @Author: outsider 515885633@qq.com
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \DataFishWeb\src\components\Menu\src\RightMenu.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <!-- 右键菜单 -->
  <!-- 在某个文件上右键 -->
  <ul
    class="right-menu-list"
    id="rightMenuList"
    v-show="visible"
    v-if="selectedFile !== undefined"
    :style="`top: ${rightMenu.top};right: ${rightMenu.right};bottom: ${rightMenu.bottom};left: ${rightMenu.left};`"
  >
    <li
      class="right-menu-item"
      @click="$file.handleFileNameClick(selectedFile, 0, [selectedFile])"
      v-if="seeBtnShow"
    >
      <i class="el-icon-view"></i> 查看
    </li>
    <li
      class="right-menu-item"
      @click="handleDeleteFileBtnClick(selectedFile)"
      v-if="deleteBtnShow"
    >
      <i class="el-icon-delete"></i> 删除
    </li>
    <li
      class="right-menu-item"
      @click="handleRestoreFileBtnClick(selectedFile)"
      v-if="restoreBtnShow"
    >
      <i class="el-icon-refresh-left"></i> 还原
    </li>
    <li class="right-menu-item" @click="handleCopyFileBtnClick(selectedFile)" v-if="copyBtnShow">
      <i class="el-icon-copy-document"></i> 复制到
    </li>
    <li class="right-menu-item" @click="handleMoveFileBtnClick(selectedFile)" v-if="moveBtnShow">
      <i class="el-icon-s-promotion"></i> 移动
    </li>
    <li
      class="right-menu-item"
      @click="handleRenameFileBtnClick(selectedFile)"
      v-if="renameBtnShow"
    >
      <i class="el-icon-edit-outline"></i> 重命名
    </li>
    <li class="right-menu-item" @click="handleShareFileBtnClick(selectedFile)" v-if="shareBtnShow">
      <i class="el-icon-share"></i> 分享
    </li>
    <li class="right-menu-item" @click="visible = false" v-if="downloadBtnShow">
      <a
        target="_blank"
        style="display: block; color: inherit"
        :href="$file.getDownloadFilePath(selectedFile)"
        :download="selectedFile.fileName + '.' + selectedFile.extendName"
      >
        <i class="el-icon-download"></i> 下载
      </a>
    </li>
    <!-- 0-解压到当前文件夹， 1-自动创建该文件名目录，并解压到目录里， 3-手动选择解压目录 -->
    <li class="right-menu-item unzip-menu-item" v-if="unzipBtnShow">
      <i class="el-icon-files"></i> 解压缩
      <i class="el-icon-arrow-right"></i>
      <ul
        class="unzip-list"
        :style="`top: ${unzipMenu.top};bottom: ${unzipMenu.bottom};left: ${unzipMenu.left};right: ${unzipMenu.right};`"
      >
        <li class="unzip-item" @click="handleUnzipFileBtnClick(selectedFile, 0)">
          <i class="el-icon-files"></i> 解压到当前文件夹
        </li>
        <li
          class="unzip-item"
          @click="handleUnzipFileBtnClick(selectedFile, 1)"
          :title="`解压到&quot;${selectedFile.fileName}&quot;`"
        >
          <i class="el-icon-files"></i> 解压到"{{ selectedFile.fileName }}"
        </li>
        <li class="unzip-item" @click="handleUnzipFileBtnClick(selectedFile, 2)">
          <i class="el-icon-files"></i> 解压到目标文件夹
        </li>
      </ul>
    </li>
    <!-- <li
				class="right-menu-item"
				@click="handleClickFolderEdit"
				v-if="folderEditBtnShow"
			>
				<i class="el-icon-edit"></i> 编辑文件夹
			</li> -->
    <li class="right-menu-item" @click="handleClickFileEdit(selectedFile)" v-if="onlineEditBtnShow">
      <i class="el-icon-edit"></i> 在线编辑
    </li>
    <li
      class="right-menu-item"
      @click="$file.copyShareLink(selectedFile.shareBatchNum, selectedFile.extractionCode)"
      v-if="copyLinkBtnShow"
    >
      <i class="el-icon-edit"></i> 复制链接
    </li>
    <li
      class="right-menu-item"
      @click="handleShowDetailInfo(selectedFile)"
      v-if="detailInfoBtnShow"
    >
      <i class="el-icon-document"></i> 文件详情
    </li>
  </ul>
  <!-- 在空白处右键，右键列表展示新建文件夹、新建文件等操作按钮 -->
  <ul
    class="right-menu-list add"
    id="rightMenuList"
    v-show="visible"
    v-else
    :style="`top: ${rightMenu.top};right: ${rightMenu.right};bottom: ${rightMenu.bottom};left: ${rightMenu.left};`"
  >
    <li class="right-menu-item" @click="callback('confirm')">
      <i class="el-icon-refresh"></i> 刷新
    </li>
    <template v-if="fileType === 0">
      <el-divider />
      <li class="right-menu-item" @click="handleClickAddFolderBtn">
        <i class="el-icon-folder-add"></i> 新建文件夹
      </li>
      <li class="right-menu-item" @click="handleCreateFile('docx')">
        <img :src="wordImg" />新建 Word 文档
      </li>
      <li class="right-menu-item" @click="handleCreateFile('xlsx')">
        <img :src="excelImg" />新建 Excel 工作表
      </li>
      <li class="right-menu-item" @click="handleCreateFile('pptx')">
        <img :src="pptImg" />新建 PPT 演示文稿
      </li>
      <el-divider />
      <li class="right-menu-item" @click="handleUploadFileBtnClick(1)">
        <i class="el-icon-upload2"></i> 上传文件
      </li>
      <li class="right-menu-item" @click="handleUploadFileBtnClick(2)">
        <i class="el-icon-folder-opened"></i> 上传文件夹
      </li>
      <li class="right-menu-item" @click="handleUploadFileBtnClick(3)">
        <i class="el-icon-thumb"></i> 拖拽上传
      </li>
    </template>
  </ul>
</template>
<script setup lang="ts"></script>
