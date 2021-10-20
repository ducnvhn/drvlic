import React from 'react'
import {
  DataGrid,
  GridRenderCellParams,
  getGridStringOperators,
  GridColumnHeaderParams,
  GridCellEditCommitParams,
  // GridColDef
  // GridComponentProps
} from '@mui/x-data-grid';
import {
  CircularProgress,
  IconButton,
  Snackbar,
  Button
} from '@material-ui/core'
import {
  Delete,
  FilterList,
  // Close
} from '@material-ui/icons'
import {
  gql,
  useLazyQuery,
  useMutation
} from '@apollo/client'
import { GridLocale } from '../../../../Utils/DataGridLocale'
import ColumnFilter, { FilterIcon, ClearFilterIcon } from '../../../../Utils/Reuseable/ColumHeader';
import FilterModal from './FilterModal';
import {
  useSettings
} from '../../../../context/SettingsContext'
import { renderSelectCell } from '../../../../Utils/Reuseable/EditableSelectCell'
import { Alert, AlertTitle } from '@material-ui/lab'
import ConfirmDeleteModal from './ConfirmDeleteModal'
import PrdToolbar from './PrdToolbar';
import { MoreButton } from '../../Stock/Import/Comps/PurchaseList';

export const LOAD_PRDS = gql`
  query loadProducts($filter: ProductFilter, $pagination: Pagination) {
    loadProducts (filter: $filter, pagination: $pagination) {
      rowCount
      products {
        _id
        category
        name
        unit
        code
      }
    }
  }
`
const UPDATE_PRD = gql`
  mutation updateProduct($data: ProductUpdate!) {
    updateProduct(data: $data) {
      _id
      category
      name
      unit
      code
    }
  }
`
const DELETE_PRD = gql`
  mutation deleteProduct($product: String!) {
    deleteProduct (product: $product)
  }
`
const UNDO_DELETE = gql`
  mutation ($product: String!) {
    undoDelete(product: $product) {
      _id
      category
      name
      unit
      code
    }
  }
`

// interface IPFilter {
//   name?: string
//   code?: string
//   unit?: string
//   category?: string
// }

type IProps = {
  loadFilter: Record<string,any>
  setLoadFiter: (state: Record<string,any>) => void
}

export const defaultFilter: Record<string, any> = {
  name: undefined,
  code: undefined,
  unit: undefined,
  category: undefined
}

const ProductsList:React.FC<IProps> = () => {
  const limit = 100
  const { getSettings } = useSettings()
  const [loadPrds, { loading, data, error }]= useLazyQuery(LOAD_PRDS)
  const [deleteProduct, { loading: deleting }] = useMutation(DELETE_PRD)
  const [undoDelete, { loading: undoing }] = useMutation(UNDO_DELETE)
  const [filterModal, toggleFilterModal] = React.useState(false)
  const [deleteModal, toggleDeleteModal] = React.useState(false)
  const [page, setPage] = React.useState(0)
  const [markDelete, setMarkDelete] = React.useState('')
  const [updatePrd] = useMutation(UPDATE_PRD)
  const [infoSnack, toggleInfoSnack] = React.useState(false)
  const [loadFilter, setLoadFiter] = React.useState<Record<string,any>>(defaultFilter)
  
  React.useEffect(() => {
    const load = async() => await loadPrds({
      variables: {
        filter: loadFilter,
        pagination: {
          page,
          limit
        }
      }
    })
    load()
  }, [loadPrds, loadFilter, page, limit])

  const updateProduct = async (data: GridCellEditCommitParams, event: React.KeyboardEvent) => {
    console.log(event)
    if (event.type === 'keydown' && event?.code === 'Enter') {
      console.log('do the update')
      await updatePrd({
        variables: { data }
      })
    }
    // console.log(data)
  }

  const markForDelete = (id: string) => {
    setMarkDelete(id)
    toggleDeleteModal(true)
  }

  const onConfirmDelete = async () => {
    // console.log(markDelete)
    if (!markDelete) {
      return
    }
    toggleDeleteModal(false)
    await deleteProduct({
      variables: {
        product: markDelete
      },
      update: (cache, { data }) => {
        console.log(data)
        const oldData: object|null = cache.readQuery({
          query: LOAD_PRDS,
          variables: {
            filter: loadFilter,
            pagination: {
              page,
              limit
            }
          }
        })
        console.log(oldData)
        cache.writeQuery({
          query: LOAD_PRDS,
          variables: {
            filter: loadFilter,
            pagination: {
              page,
              limit
            }
          },
          data: {
            ...oldData,
            // @ts-ignore
            loadProducts: {
              // @ts-ignore
              ...oldData.loadProducts,
              // @ts-ignore
              products: oldData.loadProducts.products.filter(p => p._id !== data.deleteProduct)
            }
          }
        })
      }
    })
    toggleInfoSnack(true)
  }

  const undoDel = async () => {
    await undoDelete({
      variables: {
        product: markDelete
      },
      update: (cache, { data }) => {
        console.log(data)
        const oldData: object|null = cache.readQuery({
          query: LOAD_PRDS,
          variables: {
            filter: loadFilter,
            pagination: {
              page,
              limit
            }
          }
        })
        // console.log(oldData)
        if (data !== undefined && data.undoDelete !== null) {
          cache.writeQuery({
            query: LOAD_PRDS,
            variables: {
              filter: loadFilter,
              pagination: {
              page,
              limit
            }
            },
            data: {
              ...oldData,
              // @ts-ignore
              loadProducts: {
                // @ts-ignore
                ...oldData.loadProducts,
                // @ts-ignore
                products: [ data.undoDelete, ...oldData.loadProducts.products]
              }
            }
          })
        }
      }
    })
    toggleInfoSnack(false)
  }

  if (!loading && data) {
    const { units, categories } = getSettings()
    const filterFields:Record<string, any>[] = [
      {
        name: 'code',
        type: 'text',
        label: 'Lọc theo Mã',
        placeholder: 'Nhập mã cần lọc'
      },
      {
        name: 'name',
        type: 'text',
        label: 'Lọc theo tên',
        placeholder: 'Nhập tên cần lọc'
      },
      {
        name: 'unit',
        type: 'select',
        label: 'Lọc theo đơn vị',
        placeholder: 'chọn đơn vị cần lọc',
        options: units
      },
      {
        name: 'category',
        type: 'select',
        label: 'Lọc theo danh mục',
        placeholder: 'chọn danh mục cần lọc',
        options: categories
      }
    ]
    const columns = [
      {
        headerClassName: 'mycustomclassname__',
        field: 'code',
        editable: true,
        headerName: 'Mã SP',
        flex: 4,
        sortable: false,
        disableColumnMenu: true,
        renderHeader: (col: GridColumnHeaderParams) => (
          <ColumnFilter
            showIcon={loadFilter?.code !== undefined}
            onClick={() => toggleFilterModal(true)}
            name={col.colDef.headerName}
            icon={<FilterList fontSize="small" />}
            tooltip={loadFilter?.code !== undefined ? loadFilter?.code : 'Click để thiết lập bộ lọc'}
          />
        )
      },
      {
        editable: true,
        field: 'name',
        headerName: 'Tên',
        flex: 6,
        filterOperators: getGridStringOperators().filter(t => {
          return t.value  === 'contains'
        }),
        sortable: false,
        disableColumnMenu: true,
        renderHeader: (col: GridColumnHeaderParams) => (
          <ColumnFilter
            showIcon={loadFilter?.name !== undefined}
            onClick={() => toggleFilterModal(true)}
            name={col.colDef.headerName}
            icon={<FilterList fontSize="small" />}
            tooltip={loadFilter?.name !== undefined ? loadFilter?.name : 'Click để thiết lập bộ lọc'}
          />
        )
      },
      {
        field: 'unit',
        editable: true,
        headerName: 'Đơn vị',
        flex: 3,
        filterable: false,
        sortable: false,
        disableColumnMenu: true,
        renderHeader: (col: GridColumnHeaderParams) => (
          <ColumnFilter
            showIcon={loadFilter?.unit !== undefined}
            onClick={() => toggleFilterModal(true)}
            name={col.colDef.headerName}
            icon={<FilterList fontSize="small" />}
            tooltip={loadFilter?.unit !== undefined ? loadFilter?.unit : 'Click để thiết lập bộ lọc'}
          />
        ),
        renderEditCell: (params: GridRenderCellParams) => renderSelectCell(params, units)
      },
      {
        field: 'category',
        editable: true,
        headerName: 'Danh mục',
        flex: 5,
        sortable: false,
        disableColumnMenu: true,
        renderHeader: (col: GridColumnHeaderParams) => (
          <ColumnFilter
            showIcon={loadFilter?.category !== undefined}
            onClick={() => toggleFilterModal(true)}
            name={col.colDef.headerName}
            icon={<FilterList fontSize="small" />}
            tooltip={loadFilter?.category !== undefined ? loadFilter?.category : 'Click để thiết lập bộ lọc'}
          />
        ),
        renderEditCell: (params: GridRenderCellParams) => renderSelectCell(params, categories)
      },
      {
        filterable: false,
        sortable: false,
        flex: 1,
        field: '_act_',
        headerName: 'Xóa',
        renderCell: (p: GridRenderCellParams) => {
          return (
          <IconButton onClick={() => markForDelete(p.id as string)}>
            {deleting && markDelete === p.id ? (
              <CircularProgress size={20} />
            ) :
            <Delete />
            }
          </IconButton>
          )
        },
        disableColumnMenu: true,
        align: 'center',
        renderHeader: () => {
          const items =[
            {
              name:'openfilter',
              icon: <FilterIcon />,
              label: 'Mở bổ lọc',
              action: () => toggleFilterModal(true)
            },
            {
              name:'clearFilter',
              icon: <ClearFilterIcon />,
              label: 'Xóa bộ lọc',
              action: () => setLoadFiter({
                name: undefined,
                category: undefined,
                unit: undefined,
                code: undefined,
              })
            },
          ]
          return (
            <MoreButton items={items} />
          )
        }
      }
    ]
    return (
      <div style={{ height: 300, width: '100%' }}>
        <PrdToolbar
          filter={loadFilter}
          setFilter={setLoadFiter}
          page={page}
          limit={limit}
        />
        <DataGrid
          onPageChange={page => setPage(page)}
          pagination
          page={page}
          rowCount={data.loadProducts.rowCount}
          paginationMode="server"
          rowsPerPageOptions={[100]}
          loading={loading}
          localeText={GridLocale}
          getRowId = {(row) => row._id}
          // @ts-ignore
          columns={columns}
          rows={data.loadProducts.products}
          autoHeight
          onCellEditCommit={(p,e) => updateProduct(p, e as React.KeyboardEvent)}
        />
        <FilterModal
          filter={loadFilter}
          open={filterModal}
          onClose={() => toggleFilterModal(false)}
          onSetFilter={(data: Record<string,any>) => {
            // console.log(data)
            setLoadFiter(data)!
          }}
          filterFields={filterFields}
          clearFilter={() => setLoadFiter(defaultFilter)}
        />
        <ConfirmDeleteModal
          open={deleteModal}
          onClose={()=>toggleDeleteModal(false)}
          onConfirm={()=>onConfirmDelete()}
        />
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={infoSnack}
          autoHideDuration={5000}
          onClose={() => toggleInfoSnack(false)}
        >
          <Alert
            variant="filled"
            severity="success"
            onClose={()=>toggleInfoSnack(false)}
            action={
              <Button disabled={undoing} onClick={() => undoDel()} color="primary" size="small">
                {undoing && (<CircularProgress size={15} />)}
                UNDO
              </Button>
            }
          >
            Sản  phẩm đã được xóa
          </Alert>
        </Snackbar>
      </div>
    )
  }
  if (error !== undefined) {
    return (
      <Alert variant="filled" severity="error">
        <AlertTitle>
          Đã có lỗi tải dữ liệu! vui lòng thử lại sau
        </AlertTitle>
      </Alert>
    )
  }
  return null
}

export default ProductsList
