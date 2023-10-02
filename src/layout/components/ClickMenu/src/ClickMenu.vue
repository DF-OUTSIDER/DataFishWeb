<script lang="ts" setup>
import { useCache } from '@/hooks/web/useCache'
import { useEmitt } from '@/hooks/web/useEmitt'
import { WebExplorerType } from '@/modules/control/explorer/api/types'
import { createImageViewer } from '@/components/ImageViewer'
import { createDplayer } from '@/components/VideoPlayer'

const { wsCache } = useCache()

const ClickFileKey = 'DF_CLICK_FILE'

const openImage = (url: string) => {
  createImageViewer({
    urlList: [url]
  })
}

const dplayer = (url: string) => {
  createDplayer({ url: url })
}

const menuItemsGroup = [
  {
    name: '查看(V)图片',
    arrow: true,
    action: () => {
      let row = wsCache.get(ClickFileKey)
      //alert(row?.path + ' 查看 ' + row?.storageConfigId)
      //console.log('查看')
      let fullpath = encodeURI(row?.path)
      let url =
        '/api/v1/downloadFile/download/by-fullpath?storageConfigId=' +
        row?.storageConfigId +
        '&fullpath=' +
        fullpath
      openImage(url)
      //downByFullpath(row?.storageConfigId, fullpath)
    }
  },
  {
    name: '播放(V)视频',
    arrow: true,
    action: () => {
      let row = wsCache.get(ClickFileKey)
      //alert(row?.path + ' 查看 ' + row?.storageConfigId)
      //console.log('查看')
      let fullpath = encodeURI(row?.path)
      let url =
        '/api/v1/downloadFile/download/by-fullpath?storageConfigId=' +
        row?.storageConfigId +
        '&fullpath=' +
        fullpath
      dplayer(url)
      //downByFullpath(row?.storageConfigId, fullpath)
    }
  },
  {
    name: '排序方式(O)',
    arrow: false,
    action: () => {
      console.log('刷新')
    }
  },
  {
    name: '刷新(E)',
    arrow: false,
    action: () => {
      console.log('刷新')
    }
  },
  {
    name: '粘贴(P)',
    arrow: false,
    action: () => {
      console.log('刷新')
    }
  },
  {
    name: '粘贴快捷方式(S)',
    arrow: false,
    action: () => {
      console.log('刷新')
    }
  },
  {
    name: '新建(W)',
    arrow: false,
    action: () => {
      console.log('刷新')
    }
  },
  {
    name: '个性化(R)',
    arrow: false,
    action: () => {
      console.log('刷新')
    }
  }
]

useEmitt({
  name: 'showMenu',
  callback: (row: WebExplorerType) => {
    if (row) {
      wsCache.set(ClickFileKey, row)
    }
  }
})
</script>
<template>
  <div
    class="w-17rem bg-[#ECECEC] flex flex-col py-0.5rem shadow-[4px_4px_5px_2px_rgba(0,0,0,0.3)]"
  >
    <div
      v-for="(item, i) in menuItemsGroup"
      :key="i"
      @click="item.action"
      class="w-full h-2.5rem px-3rem text-1.5rem leading-2.5rem text-black hover:bg-white mb-0.3rem"
      :class="[3, 5, 6].includes(i) ? `b-t-1px b-gray` : `static`"
    >
      <span>{{ item.name }}</span>
    </div>
  </div>
</template>
