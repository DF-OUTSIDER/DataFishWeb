<template>
  <ElDialog
    v-bind="getBindValue"
    :fullscreen="isFullscreen"
    destroy-on-close
    lock-scroll
    draggable
    :close-on-click-modal="false"
    :style="dialogStyle"
  >
    <template #header>
      <div class="flex justify-between">
        <slot name="title">
          {{ title }}
        </slot>
        <Icon
          v-if="fullscreen"
          class="mr-18px cursor-pointer is-hover mt-2px z-10"
          :icon="isFullscreen ? 'zmdi:fullscreen-exit' : 'zmdi:fullscreen'"
          color="var(--el-color-info)"
          @click="toggleFull"
        />
      </div>
    </template>

    <ElScrollbar :style="scrollbarStyle">
      <slot></slot>
    </ElScrollbar>

    <template v-if="slots.footer" #footer>
      <slot name="footer"></slot>
    </template>
  </ElDialog>
</template>

<script setup lang="ts">
import { ElDialog, ElScrollbar } from 'element-plus'
import { propTypes } from '@/utils/propTypes'
import { computed, useAttrs, ref, unref, useSlots, watch, nextTick } from 'vue'
import { isNumber } from '@/utils/is'

const slots = useSlots()

const props = defineProps({
  modelValue: propTypes.bool.def(false),
  title: propTypes.string.def('Dialog'),
  fullscreen: propTypes.bool.def(true),
  width: propTypes.oneOfType([String, Number]).def('46%'),
  minHeight: propTypes.oneOfType([String, Number]).def('300px'),
  maxHeight: propTypes.oneOfType([String, Number]).def('1080px')
})

const getBindValue = computed(() => {
  const delArr: string[] = ['fullscreen', 'title', 'minHeight']
  const attrs = useAttrs()
  const obj = { ...attrs, ...props }
  for (const key in obj) {
    if (delArr.indexOf(key) !== -1) {
      delete obj[key]
    }
  }
  return obj
})

const isFullscreen = ref(false)

const toggleFull = () => {
  isFullscreen.value = !unref(isFullscreen)
}

const dialogWidth = ref(isNumber(props.width) ? `${props.width}%` : props.width)
const dialogMinHeight = ref(isNumber(props.minHeight) ? `${props.minHeight}px` : props.minHeight)
//const dialogMaxHeight = ref(isNumber(props.maxHeight) ? `${props.maxHeight}px` : props.maxHeight)

watch(
  () => isFullscreen.value,
  async (val: boolean) => {
    await nextTick()
    if (val) {
      const windowHeight = document.documentElement.offsetHeight
      dialogMinHeight.value = `${windowHeight - 55 - 60 - (slots.footer ? 63 : 0)}px`
      dialogWidth.value = '100%'
    } else {
      dialogMinHeight.value = isNumber(props.minHeight) ? `${props.minHeight}px` : props.minHeight
      dialogWidth.value = isNumber(props.width) ? `${props.width}%` : props.width
    }
  },
  {
    immediate: true
  }
)

const dialogStyle = computed(() => {
  return {
    width: unref(dialogWidth)
  }
})

const scrollbarStyle = computed(() => {
  return {
    minHeight: unref(dialogMinHeight)
    //,
    //maxHeight: unref(dialogMaxHeight)
  }
})
</script>

<style lang="less">
.@{elNamespace}-dialog__header {
  margin-right: 0 !important;
  border-bottom: 1px solid var(--tags-view-border-color);
  color: #606266;
  background-color: #f8f8f9;
}

.@{elNamespace}-dialog__footer {
  border-top: 1px solid var(--tags-view-border-color);
}

.is-hover {
  &:hover {
    color: var(--el-color-primary) !important;
  }
}

.dark {
  .@{elNamespace}-dialog__header {
    border-bottom: 1px solid var(--el-border-color);
  }

  .@{elNamespace}-dialog__footer {
    border-top: 1px solid var(--el-border-color);
  }
}
</style>
