import React from 'react'
import {
  DataGrid,
  GridRenderCellParams,
  GridValueGetterParams,
  GridColumnHeaderParams,
  // GridColDef
} from '@mui/x-data-grid'
import NumberFormat from 'react-number-format'
import { CircularProgress, IconButton } from '@material-ui/core'
import ColumnFilter, { FilterIcon, ClearFilterIcon } from '../../../../../../Utils/Reuseable/ColumHeader'
import { Delete } from '@material-ui/icons'
import FilterModal from '../../../../Products/comps/FilterModal'
import {
  useSettings
} from '../../../../../../context/SettingsContext'
import { MoreButton } from '../PurchaseList'
// import ColumnFilter from '..'

type CompProps = {
  purchase: string
  products: any[],
  removeProduct: (purchase: string, product: string, quantity: number, buyPrice: number) => void
}

const Products:React.FC<CompProps> = ({
  purchase,
  products,
  removeProduct
}) => {
  const { getSettings } = useSettings()
  const { units } = getSettings()
  const [filter, setFilter] = React.useState<Record<string,any>>({
    product: undefined,
    unit: undefined
  })
  const [showFilter, toggleFilter] = React.useState(false)
  const [deleting, setDeleting] = React.useState<string|undefined>(undefined)

  const columns = [
    {
      flex: 1,
      field: 'product.name',
      disableColumnMenu: true,
      sortable: false,
      headerName: 'Sản phẩm',
      valueGetter: (params: GridValueGetterParams) => {
        return params.row.product.name
      },
      renderHeader: (col: GridColumnHeaderParams) => (
        <ColumnFilter
          name={col.colDef.headerName}
          showIcon={filter.product !== undefined}
          onClick={() => toggleFilter(true)}
        />
      ),
    },
    {
      flex: 1,
      field: 'product.unit',
      headerName: 'Đơn vị',
      disableColumnMenu: true,
      sortable: false,
      valueGetter: (params: GridValueGetterParams) => {
        return params.row.product.unit
      },
      renderHeader: (col: GridColumnHeaderParams) => (
        <ColumnFilter
          name={col.colDef.headerName}
          showIcon={filter.unit !== undefined}
          onClick={() => toggleFilter(true)}
        />
      )
    },
    {
      flex: 1,
      field: 'buyPrice',
      headerName: 'Giá nhập',
      disableColumnMenu: true,
      sortable: false,
      renderCell: (p: GridRenderCellParams) => {
        return (
          <NumberFormat
            value={Number(p.row.buyPrice)}
            thousandSeparator=","
            isNumericString
            displayType="text"
            prefix={`VNĐ `}
          />
        )
      }
    },
    {
      flex: 1,
      field: 'quantity',
      headerName: 'Số lượng',
      disableColumnMenu: true,
      sortable: false,
    },
    {
      flex: 1,
      field: 'total',
      disableColumnMenu: true,
      sortable: false,
      headerName: 'Thành Tiền',
      // valueGetter: (params: GridValueGetterParams) => {
      //   return Number(params.row.buyPrice * params.row.quantity)
      // },
      renderCell: (p: GridRenderCellParams) => {
        return (
            <NumberFormat
              value={Number(p.row.buyPrice * p.row.quantity)}
              thousandSeparator=","
              isNumericString
              displayType="text"
              prefix={`VNĐ `}
            />
          )
      }
    },
    {
      field: '_filter',
      disableColumnMenu: true,
      sortable: false,
      renderHeader: () => {
        const items =[
            {
              name:'openfilter',
              icon: <FilterIcon />,
              label: 'Mở bổ lọc',
              action: () => toggleFilter(true)
            },
            {
              name:'clearFilter',
              icon: <ClearFilterIcon />,
              label: 'Xóa bộ lọc',
              action: () => setFilter({
                product: undefined,
                unit: undefined,
              })
            },
          ]
          return (
            <MoreButton items={items} />
          )
      },
      renderCell: (p: GridRenderCellParams) => {
        const { product, quantity, buyPrice } = p.row
        const delPrd = async () => {
          setDeleting(product._id)
          await removeProduct(purchase, product._id, quantity, buyPrice)
          setDeleting(undefined)
        }
        return (
          <IconButton onClick={() => delPrd()}>
            {deleting && deleting === product._id
            ?
              <CircularProgress size={15} />
            :
              <Delete />
            }
          </IconButton>
        )
      }
    }
  ]
  const data = products.filter(p => {
    let filterByName = true
    let filterByUnit = true
    if (filter.product) {
      filterByName = p.product.name.toLowerCase().indexOf(filter.product.toLowerCase()) > 0
    }
    if (filter.unit) {
      filterByUnit = p.product.unit.toLowerCase() === filter.unit.toLowerCase()
    }
    // console.log(filterByName, filterByUnit)
    return filterByName && filterByUnit
  })
  return (
    <div style={{ height: '90vh'}}>
      <DataGrid
        autoHeight
        columns={columns}
        rows={data}
        getRowId = {(row) => row.product._id}
        hideFooterRowCount
        hideFooterPagination
      />
      <FilterModal
        open={showFilter}
        onClose={() => toggleFilter(false)}
        onSetFilter={setFilter}
        filter={filter}
        filterFields={[
          {
            name: 'product',
            placeholder: 'Tìm theo tên sản phẩm',
            label: 'Lọc theo tên sản phẩm'
          },
          {
            name: 'unit',
            label: 'Lọc theo đơn vị',
            placeholder: 'Nhập đơn vị cần tìm',
            type: 'select',
            options: units
          },
        ]}
        clearFilter={() => setFilter({
          product: undefined,
          unit: undefined
        })}
      />
    </div>
  )
}
export default Products