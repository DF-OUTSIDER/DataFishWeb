<script lang="tsx">
import { ElTable, ElTableColumn, ElPagination } from 'element-plus'
import { componentMap } from '../../Form/src/componentMap'
import { defineComponent, PropType, ref, computed, unref, watch, onMounted } from 'vue'
import { propTypes } from '@/utils/propTypes'
import { setIndex } from './helper'
import { getSlot } from '@/utils/tsxHelper'
import type { TableProps } from './types'
import { set } from 'lodash-es'
import {
  TableColumn,
  TableSlotDefault,
  Pagination,
  TableSetPropsType,
  TreeProps
} from '../../../types/table'

import { setItemComponentSlots, setComponentProps } from '../../Form/src/helper'

export default defineComponent({
  name: 'Table',
  props: {
    pageSize: propTypes.number.def(10),
    currentPage: propTypes.number.def(1),
    // 是否多选
    selection: propTypes.bool.def(true),
    // 是否所有的超出隐藏，优先级低于schema中的showOverflowTooltip,
    showOverflowTooltip: propTypes.bool.def(true),
    // 表头
    columns: {
      type: Array as PropType<TableColumn[]>,
      default: () => []
    },
    // 展开行
    expand: propTypes.bool.def(false),
    // 是否展示分页
    pagination: {
      type: Object as PropType<Pagination>,
      default: (): Pagination | undefined => undefined
    },
    // 仅对 type=selection 的列有效，类型为 Boolean，为 true 则会在数据更新之后保留之前选中的数据（需指定 row-key）
    reserveSelection: propTypes.bool.def(false),
    // 加载状态
    loading: propTypes.bool.def(false),
    // 是否叠加索引
    reserveIndex: propTypes.bool.def(false),
    // 对齐方式
    align: propTypes.string
      .validate((v: string) => ['left', 'center', 'right'].includes(v))
      .def('left'),
    // 表头对齐方式
    headerAlign: propTypes.string
      .validate((v: string) => ['left', 'center', 'right'].includes(v))
      .def('left'),
    data: {
      type: Array as PropType<Recordable[]>,
      default: () => []
    },
    rowKey: propTypes.string,
    //treeAutoSelectChildren: propTypes.bool.def(false),
    treeProps: {
      type: Object as PropType<TreeProps>,
      default: (): TreeProps | undefined => undefined
    }
  },
  emits: ['update:pageSize', 'update:currentPage', 'register'],
  setup(props, { attrs, slots, emit, expose }) {
    const elTableRef = ref<ComponentRef<typeof ElTable>>()

    // 注册
    onMounted(() => {
      const tableRef = unref(elTableRef)
      emit('register', tableRef?.$parent, elTableRef)
    })

    const pageSizeRef = ref(props.pageSize)

    const currentPageRef = ref(props.currentPage)

    // useTable传入的props
    const outsideProps = ref<TableProps>({})

    const mergeProps = ref<TableProps>({})

    const getProps = computed(() => {
      const propsObj = { ...props }
      Object.assign(propsObj, unref(mergeProps))
      return propsObj
    })

    const setProps = (props: TableProps = {}) => {
      mergeProps.value = Object.assign(unref(mergeProps), props)
      outsideProps.value = props
    }

    const setColumn = (columnProps: TableSetPropsType[], columnsChildren?: TableColumn[]) => {
      const { columns } = unref(getProps)
      for (const v of columnsChildren || columns) {
        for (const item of columnProps) {
          if (v.field === item.field) {
            set(v, item.path, item.value)
          } else if (v.children?.length) {
            setColumn(columnProps, v.children)
          }
        }
      }
    }

    // 选择的行
    const selections = ref<Recordable[]>([])

    // const selectionRow = (selection: Recordable[], row: any) => {
    //   selections.value = selection
    // }

    const selectionChange = (selection: Recordable[]) => {
      selections.value = selection
    }

    // todo 未达到预期
    // const rowClick = (row: any, column: any, event: any) => {
    //   if (row) {
    //     unref(elTableRef)?.setCurrentRow(row)
    //   }
    // }

    expose({
      setProps,
      setColumn,
      selections,
      elTableRef
    })

    const pagination = computed(() => {
      return Object.assign(
        {
          small: false,
          background: false,
          pagerCount: 7,
          layout: 'sizes, prev, pager, next, jumper, ->, total',
          pageSizes: [10, 20, 30, 40, 50, 100],
          disabled: false,
          hideOnSinglePage: false,
          total: 10
        },
        unref(getProps).pagination
      )
    })

    watch(
      () => unref(getProps).pageSize,
      (val: number) => {
        pageSizeRef.value = val
      }
    )

    watch(
      () => unref(getProps).currentPage,
      (val: number) => {
        currentPageRef.value = val
      }
    )

    watch(
      () => pageSizeRef.value,
      (val: number) => {
        emit('update:pageSize', val)
      }
    )

    watch(
      () => currentPageRef.value,
      (val: number) => {
        emit('update:currentPage', val)
      }
    )

    const getBindValue = computed(() => {
      const bindValue: Recordable = { ...attrs, ...props }
      delete bindValue.columns
      delete bindValue.data
      return bindValue
    })

    const renderTableSelection = () => {
      const { selection, reserveSelection, align, headerAlign } = unref(getProps)
      // 渲染多选框
      return selection ? (
        <ElTableColumn
          type="selection"
          align={align}
          headerAlign={headerAlign}
          reserveSelection={reserveSelection}
          width="50"
        ></ElTableColumn>
      ) : undefined
    }

    const renderTableExpand = () => {
      const { align, headerAlign, expand } = unref(getProps)
      // 渲染展开行
      return expand ? (
        <ElTableColumn type="expand" align={align} headerAlign={headerAlign}>
          {{
            // @ts-ignore
            default: (data: TableSlotDefault) => getSlot(slots, 'expand', data)
          }}
        </ElTableColumn>
      ) : undefined
    }

    const rnderTreeTableColumn = (columnsChildren: TableColumn[]) => {
      const { align, headerAlign, showOverflowTooltip } = unref(getProps)
      return columnsChildren.map((v) => {
        // 单独给只有options属性的组件做判断
        const notRenderOptions = ['SelectV2', 'Cascader', 'Transfer']
        const slotsMap: Recordable = {
          ...setItemComponentSlots(slots, v?.componentProps?.slots, v.field)
        }

        const props = { ...v }
        if (props.children) delete props.children
        return (
          <ElTableColumn
            showOverflowTooltip={showOverflowTooltip}
            align={align}
            headerAlign={headerAlign}
            {...props}
            prop={v.field}
          >
            {{
              default: (data: TableSlotDefault) => {
                if (data.$index == -1) return
                const Com = componentMap[v.component as string] as ReturnType<
                  typeof defineComponent
                >
                if (Com) {
                  return (
                    <Com
                      vModel={data.row[v.field]}
                      {...setComponentProps(v)}
                      {...(notRenderOptions.includes(v?.component as string) &&
                      v?.componentProps?.options
                        ? { options: v?.componentProps?.options || [] }
                        : {})}
                    >
                      {{ ...slotsMap }}
                    </Com>
                  )
                } else {
                  return v.children && v.children.length
                    ? rnderTableColumn(v.children)
                    : // @ts-ignore
                      getSlot(slots, v.field, data) ||
                        v?.formatter?.(data.row, data.column, data.row[v.field], data.$index) ||
                        data.row[v.field]
                }
              },
              // @ts-ignore
              header: getSlot(slots, `${v.field}-header`)
            }}
          </ElTableColumn>
        )
      })
    }

    const rnderTableColumn = (columnsChildren?: TableColumn[]) => {
      const {
        columns,
        reserveIndex,
        pageSize,
        currentPage,
        align,
        headerAlign,
        showOverflowTooltip
      } = unref(getProps)
      return [...[renderTableExpand()], ...[renderTableSelection()]].concat(
        (columnsChildren || columns).map((v) => {
          // 单独给只有options属性的组件做判断
          const notRenderOptions = ['SelectV2', 'Cascader', 'Transfer']
          const slotsMap: Recordable = {
            ...setItemComponentSlots(slots, v?.componentProps?.slots, v.field)
          }

          // 自定生成序号
          if (v.type === 'index') {
            return (
              <ElTableColumn
                type="index"
                index={
                  v.index
                    ? v.index
                    : (index) => setIndex(reserveIndex, index, pageSize, currentPage)
                }
                align={v.align || align}
                headerAlign={v.headerAlign || headerAlign}
                label={v.label}
                width="65px"
              ></ElTableColumn>
            )
          } else {
            const props = { ...v }
            if (props.children) delete props.children
            return (
              <ElTableColumn
                showOverflowTooltip={showOverflowTooltip}
                align={align}
                headerAlign={headerAlign}
                {...props}
                prop={v.field}
              >
                {{
                  default: (data: TableSlotDefault) => {
                    if (data.$index == -1) return
                    const Com = componentMap[v.component as string] as ReturnType<
                      typeof defineComponent
                    >
                    if (Com) {
                      return (
                        <Com
                          vModel={data.row[v.field]}
                          {...setComponentProps(v)}
                          {...(notRenderOptions.includes(v?.component as string) &&
                          v?.componentProps?.options
                            ? { options: v?.componentProps?.options || [] }
                            : {})}
                        >
                          {{ ...slotsMap }}
                        </Com>
                      )
                    } else {
                      return v.children && v.children.length
                        ? rnderTreeTableColumn(v.children)
                        : // @ts-ignore
                          getSlot(slots, v.field, data) ||
                            v?.formatter?.(data.row, data.column, data.row[v.field], data.$index) ||
                            data.row[v.field]
                    }
                  },
                  // @ts-ignore
                  header: () => getSlot(slots, `${v.field}-header`) || v.label
                }}
              </ElTableColumn>
            )
          }
        })
      )
    }

    const rnderTable = () => {
      return (
        <ElTable
          // @ts-ignore
          ref={elTableRef}
          data={unref(getProps).data}
          // onSelect={selectionRow}

          // 当某一行被点击时会触发该事件
          //current-change={rowClick}
          // 当选择项发生变化时会触发该事件
          onSelection-change={selectionChange}
          {...unref(getBindValue)}
        >
          {{
            default: () => rnderTableColumn(),
            // @ts-ignore
            append: () => getSlot(slots, 'append')
          }}
        </ElTable>
      )
    }

    return () => (
      <div v-loading={unref(getProps).loading}>
        {rnderTable()}
        {unref(getProps).pagination ? (
          <ElPagination
            v-model:pageSize={pageSizeRef.value}
            v-model:currentPage={currentPageRef.value}
            class="mt-10px"
            {...unref(pagination)}
            onCurrent-change={() => {
              // ElMessage.info(value.toString())
            }}
          ></ElPagination>
        ) : undefined}
      </div>
    )
  }
})
</script>
