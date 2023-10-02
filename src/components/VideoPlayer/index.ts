import Dplayer from './src/Dplayer.vue'
import { isClient } from '@/utils/is'
import { createVNode, render, VNode } from 'vue'
import { DplayerProps } from './src/types'

let instance: Nullable<VNode> = null

export function createDplayer(options: DplayerProps) {
  if (!isClient) return
  const { url, zIndex = 5000, show = true } = options

  const propsData: Partial<DplayerProps> = {}
  const container = document.createElement('div')
  propsData.url = url
  propsData.zIndex = zIndex
  propsData.show = show

  document.body.appendChild(container)
  instance = createVNode(Dplayer, propsData)
  render(instance, container)
}
