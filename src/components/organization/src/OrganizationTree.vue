<!--
 * @Author: outsider 515885633@qq.com
 * @Date: 2023-01-17
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\components\organization\src\OrganizationTree.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by outsider 515885633@qq.com, All Rights Reserved. 
-->
<template>
  <div>
    <div style="display: flex; padding: 10px">
      <div style="margin-right: 10px"><el-switch v-model="horizontal" /> 横向</div>
      <div style="margin-right: 10px"><el-switch v-model="collapsable" /> 可收起</div>
      <div style="margin-right: 10px"><el-switch v-model="disaled" /> 禁止编辑</div>
      <div style="margin-right: 10px"><el-switch v-model="onlyOneNode" /> 仅拖动当前节点</div>
      <div style="margin-right: 10px"><el-switch v-model="cloneNodeDrag" /> 拖动节点副本</div>
    </div>
    <div style="padding: 0 10px 10px">
      背景色：<el-color-picker v-model="style.background" size="small" />&nbsp;
      文字颜色：<el-color-picker v-model="style.color" size="small" />&nbsp;
    </div>
    <div style="height: 800px">
      <vue3TreeOrg
        :data="data"
        center
        :horizontal="horizontal"
        :collapsable="collapsable"
        :label-style="style"
        :only-one-node="onlyOneNode"
        :clone-node-drag="cloneNodeDrag"
        :before-drag-end="beforeDragEnd"
        @on-node-drag="nodeDragMove"
        @on-node-drag-end="nodeDragEnd"
        @on-contextmenu="onMenus"
        @on-expand="onExpand"
        @on-node-dblclick="onNodeDblclick"
        @on-node-click="onNodeClick"
      />
    </div>
  </div>
</template>

<script>
import { ElSwitch, ElColorPicker, ElMessage } from 'element-plus'

import { ref, reactive } from 'vue'
import { propTypes } from '@/utils/propTypes'

import { string } from 'vue-types'
import { getOrganizationTreeApi } from '@/system/organization/api'

export default {
  name: 'BaseTree',
  components: {
    ElSwitch,
    ElColorPicker
  },
  props: {
    organizationId: Number
    // ,
    // horizontal: {
    //   type: Boolean,
    //   default: true
    // },
    // collapsable: {
    //   type: Boolean,
    //   default: true
    // },
    // onlyOneNode: {
    //   type: Boolean,
    //   default: false
    // },
    // expandAll: {
    //   type: Boolean,
    //   default: true
    // },
    // disaled: {
    //   type: Boolean,
    //   default: true
    // },
    // style: {
    //   type: Object,
    //   default() {
    //     return { background: '#fff', color: '#5e6d82' }
    //   }
    // }
    // ,
    // orgTreeData: []
  },
  setup(props) {
    const cloneNodeDrag = ref(true)
    //好用
    //const orgId = reactive(props.organizationId)
    return {
      cloneNodeDrag
    }
  },
  data() {
    return {
      data: {},
      horizontal: true,
      collapsable: true,
      onlyOneNode: false,
      expandAll: true,
      disaled: false,
      style: {
        background: '#fff',
        color: '#5e6d82'
      }
    }
  },
  created() {
    // this.toggleExpand(this.data, this.expandAll);
    // 加载data数据
    //this.getOrgData()
  },
  mounted() {
    // 加载data数据
    this.getOrgData()
  },
  methods: {
    getOrgData() {
      getOrganizationTreeApi(this.$props.organizationId).then((_data) => {
        this.data = _data.data
        // const data = {
        //   data:
        // }
        // resolve(data)
      })
    },
    onMenus({ node, command }) {
      console.log(node, command)
    },
    onExpand(e, data) {
      console.log(e, data)
    },
    onExpandAll(b) {
      console.log(b)
    },
    nodeDragMove(data) {
      console.log(data)
    },
    beforeDragEnd(node, targetNode) {
      return new Promise((resolve, reject) => {
        if (!targetNode) reject()
        if (node.id === targetNode.id) {
          reject()
        } else {
          resolve()
        }
      })
    },
    nodeDragEnd(data, isSelf) {
      console.log(data, isSelf)
    },
    onNodeDblclick() {
      console.log('onNodeDblclick')
    },
    onNodeClick(e, data) {
      ElMessage.info(data.label)
    },
    expandChange() {
      // this.toggleExpand(this.data, this.expandAll);
    },
    toggleExpand(data, val) {
      if (Array.isArray(data)) {
        data.forEach((item) => {
          item.expand = val
          if (item.children) {
            this.toggleExpand(item.children, val)
          }
        })
      } else {
        data.expand = val
        if (data.children) {
          this.toggleExpand(data.children, val)
        }
      }
    }
  }
}
</script>
