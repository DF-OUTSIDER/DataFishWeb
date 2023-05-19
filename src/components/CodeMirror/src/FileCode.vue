<!--
 * @Author: outsider 515885633@qq.com
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\components\CodeMirror\src\FileCode.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <Codemirror
    v-model="code"
    placeholder="Code gose here..."
    :style="{ height: '400px' }"
    :autofocus="true"
    :indent-with-tab="true"
    :tabSize="2"
    :extensions="extensions"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { propTypes } from '@/utils/propTypes'
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
//import { getFileContent } from '@/api/infra/fileList'

const props = defineProps({
  filePath: propTypes.string.def('')
})

const code = ref(`console.log('Hello, world!')`)
const extensions = [javascript(), oneDark]

const paths = props.filePath.split('/infra/file/')

if (paths.length == 2) {
  // getFileContent(paths[1]).then((data) => {
  //   if (data) {
  //     let gbkdecoder = new TextDecoder('GBK')
  //     let result = gbkdecoder.decode(data)
  //     if (result.indexOf('code') !== -1) {
  //       let utf8decoder = new TextDecoder('UTF-8')
  //       let result = utf8decoder.decode(data)
  //       message.error(JSON.parse(result).msg)
  //     } else {
  //       code.value = result
  //     }
  //   }
  // })
}
</script>
