<template>
  <ElDialog
    v-model="show"
    title="Dplayer"
    :z-index="zIndex"
    :destroy-on-close="true"
    @opened="initPlayer"
  >
    <div id="dplayer" ref="dplayerRef"></div>
  </ElDialog>
</template>

<script lang="ts" setup>
//import Hls from 'hls.js'
import DPlayer from 'dplayer'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { propTypes } from '@/utils/propTypes'
//import { Dialog } from '@/components/Dialog'
import { ElDialog, ElScrollbar } from 'element-plus'
import Hls from 'hls.js'

import { playRemoteMedia } from '@/modules/control/download_file/api'

const props = defineProps({
  url: propTypes.string.def(''),
  zIndex: propTypes.number.def(200),
  show: propTypes.bool.def(false)
})

// const getBindValue = computed(() => {
//   const propsData: Recordable = { ...props }
//   delete propsData.show
//   return propsData
// })

const show = ref(props.show)
const zIndex = ref(props.zIndex)
const dplayerRef = ref<ComponentRef<typeof DPlayer>>()

// const close = () => {
//   show.value = false
// }

//const baseUrl = process.env.VUE_APP_BASE_URL
//const { data2 } = toRefs(DialogOptions.options);//传过来的数据

let dp: any
let timer: any
// 初始化播放器
const initPlayer = () => {
  let _container = document.getElementById('dplayer')
  dp = new DPlayer({
    container: _container,
    autoplay: true, //是否自动播放
    theme: '#0093ff', //主题色
    loop: true, //视频是否循环播放
    lang: 'zh-cn',
    screenshot: true, //是否开启截图
    hotkey: true, //是否开启热键
    preload: 'auto', //视频是否预加载
    volume: 0.7, //默认音量
    mutex: true, //阻止多个播放器同时播放，当前播放器播放时暂停其他播放器
    // logo: "https://i.loli.net/2019/06/06/5cf8c5d94521136430.png",//自定义的播放按钮图片
    video: {
      url: props.url,
      //, //视频地址
      type: 'customHls',
      customType: {
        customHls: (video: any, player: any) => {
          timer = setInterval(() => initHls(video), 10000)
        }
      }
    }
  })
}

const initHls = (video: any) => {
  playRemoteMedia(video.src).then(() => {
    // 停止定时器
    clearInterval(timer)
    // console.log("查看传递的参数", video, player);
    const hls = new Hls() //实例化Hls  用于解析m3u8
    hls.loadSource(video.src)
    hls.attachMedia(video)

    // 跳转到特定时间
    dp.seek(1)
    dp.play()
  })
}

onMounted(() => {
  //initPlayer()
})
onBeforeUnmount(() => {
  dp.destroy() //关闭弹窗后销毁播放器
})
</script>
