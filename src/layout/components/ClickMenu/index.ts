import { h, render } from 'vue'

import Menu from './src/ClickMenu.vue'

export function openContextMenus() {
  let isShow = false
  let scope: HTMLElement | null // 拿到桌面元素
  let containerEl: HTMLDivElement // 创建一个容器元素，给 render 先用着

  window.oncontextmenu = function (e: MouseEvent) {
    e.preventDefault()
    if (isShow) closeMenu()
    openMenu(e)
  }

  //tips: open the menu
  function openMenu(e: MouseEvent) {
    scope = document.getElementById('PCDesktop')
    containerEl = document.createElement('div')
    const vnode = h(Menu)
    render(vnode, containerEl) //将 vnode 传递给 render 函数

    containerEl.style.position = 'absolute'

    const pos = scope?.getBoundingClientRect() as DOMRect
    console.log(pos)
    scope?.appendChild(containerEl) // 1. 为了拿到 offsetWidth，因为只有出现在浏览器才会产生 offsetWidth 属性值，我们需要先渲染出真实 dom

    const { offsetTop, offsetWidth } = containerEl //2 .取出 containerEl 的真实宽度
    const { clientTop, clientHeight, clientLeft, clientWidth } = scope! //3. 获取父元素的 clientWidth 准备进行计算
    const { clientX, clientY } = e //4. 取出 click 时鼠标的坐标

    const _X = clientWidth - clientX > offsetWidth ? 'left' : 'right' //调整方向
    const _X_offset = clientWidth - clientX // 如果是需要显示在左边，则需要获取当前的差值

    //containerEl.style.top = `${clientY - 230}px`
    containerEl.style.top = `${clientY - pos.y}px`
    //containerEl.style[_X] = _X === 'left' ? `${clientX}px` : `${_X_offset}px`
    containerEl.style[_X] = `${clientX - pos.x}px`
    // 菜单显示在最前边
    containerEl.style.zIndex = '1000'
    isShow = true
  }

  //tips: close the menu
  function closeMenu() {
    if (isShow) {
      render(null, containerEl)
      scope?.removeChild(containerEl)
      //console.log('清除')
      isShow = false
    }
  }
  return {
    isShow,
    openMenu,
    closeMenu
  }
}
