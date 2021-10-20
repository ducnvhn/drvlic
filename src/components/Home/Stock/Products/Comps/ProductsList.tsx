import React from 'react'
import {
  DataGrid,
  // GridColDef,
  GridValueGetterParams,
  GridColumnHeaderParams
} from '@mui/x-data-grid'
import ColumnFilter, { FilterIcon } from '../../../../../Utils/Reuseable/ColumHeader'
import {GridLocale} from '../../../../../Utils/DataGridLocale'
import FilterModal from '../../../Products/comps/FilterModal'
import { useSettings } from '../../../../../context/SettingsContext'
import { IconButton } from '@material-ui/core'
import NumberFormat from 'react-number-format'
import { OpenInNew } from '@material-ui/icons'
import ProductModal from './DetailModal'

type CompProps = {
  filter: Record<string,any>
  stockInfo: {
    products: Record<any,any>[],
    rowCount: number
  }
  page: number
  setPage: (p: number) => void
  setFilter: React.Dispatch<React.SetStateAction<Record<string, any>>>
}

const ProductsList: React.FC<CompProps> = ({
  stockInfo,
  filter,
  page,
  setPage,
  setFilter
}) => {
  const { products, rowCount } = stockInfo
  const { getSettings } = useSettings()
  const { units, categories } = getSettings()
  const [filterModal, toggleFilterModal] = React.useState(false)
  const [detailModal, toggleDetailModal] = React.useState(false)
  const [currentProduct, setCurrentProduct] = React.useState<string|undefined>(undefined)
  
  const openDetailModal = (product: string) => {
    setCurrentProduct(product)
    toggleDetailModal(true)
  }

  const closeDetailModal = () => {
    setCurrentProduct(undefined)
    toggleDetailModal(false)
  }

  const columns = [
    {
      flex: 6,
      disableColumnMenu: true,
      sortable: false,
      field: 'name',
      headerName: 'Tên sp',
      valueGetter: (params: GridValueGetterParams) => params.row.product.name,
      renderHeader: (col: GridColumnHeaderParams) => (
        <ColumnFilter
          showIcon={filter?.name !== undefined}
          onClick={() => toggleFilterModal(true)}
          name={col.colDef.field}
        />
      )
    },
    {
      flex: 2,
      name: 'unit',
      disableColumnMenu: true,
      sortable: false,
      field: 'product.unit',
      headerName: 'Đơn vị',
      valueGetter: (params: GridValueGetterParams) => params.row.product.unit,
      renderHeader: (col: GridColumnHeaderParams) => (
        <ColumnFilter
          showIcon={filter?.unit !== undefined}
          onClick={() => toggleFilterModal(true)}
          name={col.colDef.headerName}
        />
      )
    },
    {
      name: 'category',
      flex: 4,
      disableColumnMenu: true,
      sortable: false,
      field: 'product.category',
      headerName: 'Danh mục',
      valueGetter: (params: GridValueGetterParams) => params.row.product.category,
      renderHeader: (col: GridColumnHeaderParams) => (
        <ColumnFilter
          showIcon={filter?.category !== undefined}
          onClick={() => toggleFilterModal(true)}
          name={col.colDef.headerName}
        />
      )
    },
    {
      flex: 2,
      disableColumnMenu: true,
      sortable: false,
      field: 'available',
      headerName: 'Tồn kho',
      // valueGetter: (params: GridValueGetterParams) => params.row.product.category
    },
    {
      flex: 3,
      disableColumnMenu: true,
      sortable: false,
      field: 'avgPrice',
      headerName: 'Giá TBGQ',
      // valueGetter: (params: GridValueGetterParams) => params.row.product.category
      renderCell: (p: any) => {
        return (
          <NumberFormat
            value={p.row.avgPrice}
            thousandSeparator=","
            displayType="text"
            prefix="VNĐ "
          />
          )
      }
    },
    {
      name: '_view',
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
      field: '_blank_',
      renderHeader: () => (
        <IconButton onClick={() => toggleFilterModal(true)}>
          <FilterIcon />
        </IconButton>
      ),
      renderCell: (p: any) => (
        <IconButton onClick={() => openDetailModal(p.row.product._id)}>
          <OpenInNew />
        </IconButton>
      )
    }
  ]
  return (
    <div>
      <DataGrid
        pagination
        page={page}
        paginationMode="server"
        onPageChange={p => setPage(p)}
        getRowId={(row) => row.product._id}
        columns={columns}
        rowsPerPageOptions={[100]}
        rows={products}
        autoHeight
        // loading={loading}
        rowCount={rowCount}
        localeText={GridLocale}
      />
      <FilterModal
        open={filterModal}
        onClose={() => toggleFilterModal(false)}
        onSetFilter={setFilter}
        filter={filter}
        filterFields={[
          {
            name: 'name',
            placeholder: 'Nhập tên sản phẩm',
            label: 'Lọc theo tên sản phẩm'
          },
          {
            name: 'unit',
            label: 'Đơn vị sản phẩm',
            placeholder: 'Nhập đơn vị cần lọc',
            type: 'select',
            options: units
          },
          {
            name: 'category',
            label: 'Danh mục sản phẩm',
            placeholder: 'chọn danh mục sản phẩm',
            type: 'select',
            options: categories
          },
        ]}
        clearFilter={() => setFilter({
          ...filter,
          name: undefined,
          unit: undefined,
          category: undefined
        })}
      />
      <ProductModal
        product={currentProduct}
        open={detailModal}
        onClose={closeDetailModal}
      />
    </div>
  )
}
export default ProductsList