import React from 'react'
import {
  DataGrid,
  GridCellParams,
  GridRenderCellParams,
  GridColumnHeaderParams
} from '@mui/x-data-grid'
import {
  CircularProgress,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  // CircularProgress
} from '@material-ui/core'
import {
  MoreVert,
  OpenInNew
} from '@material-ui/icons'
import moment from 'moment'
import NumberFormat from 'react-number-format';
import ColumnFilter, { ClearFilterIcon, FilterIcon } from '../../../../../Utils/Reuseable/ColumHeader'
import FilterModal from '../../../Products/comps/FilterModal'
import { GridLocale } from '../../../../../Utils/DataGridLocale'

interface PurchaseBasic {
  invoice?: string
  note?: string
  trace?: string
  vendor?: string
  products: {
    product: string
    quantity: number
    buyPrice: number
  }[]
}

type PLProps = {
  purchases: {
    purchases: PurchaseBasic[]
    rowCount: number
  }
  loading: boolean,
  filter: Record<string,any>
  setFilter: React.Dispatch<React.SetStateAction<Record<string, any>>>
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  rows: number
  loadPurchase: (purchase: string) => void
  loadingSingle: boolean
  currentPurchase: string | undefined
  
}

const PurchaseList:React.FC<PLProps> = ({
  purchases,
  loading,
  filter,
  setFilter,
  page,
  setPage,
  rows,
  loadPurchase,
  loadingSingle,
  currentPurchase,
}) => {
  // const [filter, setFilter] = React.useState(defaultFilter)
  const [filterVisible, toggleFilterVisible] = React.useState(false)
const columns = [
  {
    field: 'invoiceDate',
    headerName: 'Ngày nhập',
    flex: 2.5,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (p: GridCellParams) => (
      <span>{moment(Number(p.row.invoiceDate)).format('DD/MM/YYYY')}</span>
    ),
    renderHeader: (col: GridColumnHeaderParams) => {
      return (
        <ColumnFilter
          showIcon={filter.start !== undefined || filter.end !== undefined}
          name= {col.colDef.headerName}
          onClick={() => toggleFilterVisible(true)}
        />
      )
    }
  },
  {
    field: 'vendor',
    headerName: 'Nhà Cung Cấp',
    flex: 5,
    sortable: false,
    disableColumnMenu: true,
    renderHeader: (col: GridColumnHeaderParams) => {
      return (
        <ColumnFilter
          showIcon={filter.vendor !== undefined}
          name= {col.colDef.headerName}
          onClick={() => toggleFilterVisible(true)}
        />
      )
    }
  },
  {
    field: 'invoice',
    headerName: 'Số hóa đơn',
    flex: 3,
    sortable: false,
    disableColumnMenu: true,
    renderHeader: (col: GridColumnHeaderParams) => {
      return (
        <ColumnFilter
          showIcon={filter.invoice !== undefined}
          name= {col.colDef.headerName}
          onClick={() => toggleFilterVisible(true)}
        />
      )
    }
  },
  {
    field: 'trace',
    headerName: 'Số Chứng từ',
    flex: 3,
    sortable: false,
    disableColumnMenu: true,
    renderHeader: (col: GridColumnHeaderParams) => {
      return (
        <ColumnFilter
          showIcon={filter.trace !== undefined}
          name= {col.colDef.headerName}
          onClick={() => toggleFilterVisible(true)}
        />
      )
    }
  },
  {
    field: 'note',
    headerName: 'Ghi chú',
    flex: 5,
    sortable: false,
    disableColumnMenu: true,
    renderHeader: (col: GridColumnHeaderParams) => {
      return (
        <ColumnFilter
          showIcon={filter.note !== undefined}
          name= {col.colDef.headerName}
          onClick={() => toggleFilterVisible(true)}
        />
      )
    }
  },
  {
    field: '_total',
    flex: 2,
    headerName: 'Tổng tiền',
    sortable: false,
    disableColumnMenu: true,
    renderCell: (p: GridRenderCellParams) => {
      // console.log(p)
      let total = 0
      p.row.products.forEach((prd: any) => {
        total += prd.quantity * prd.buyPrice
      })
      return (
          <NumberFormat
            value={total}
            thousandSeparator=","
            isNumericString
            displayType="text"
            prefix={`VNĐ `}
          />
        )
    }
  },
  {
    field: '-fn',
    filterable: false,
    sortable: false,
    flex: 1,
    // headerName: 'Mở',
    renderCell: (p: GridRenderCellParams) => {
      return (
        <IconButton onClick={() => loadPurchase(p.row._id)}>
          {loadingSingle && (currentPurchase === p.row._id) ?
          <CircularProgress size={15} />
          :
          <OpenInNew />
          }
        </IconButton>
        )
      },
    disableColumnMenu: true,
    renderHeader: () => {
      const items = [
        {
          name:'openfilter',
          icon: <FilterIcon />,
          label: 'Mở bổ lọc',
          action: () => toggleFilterVisible(true)
        },
        {
          name:'clearFilter',
          icon: <ClearFilterIcon />,
          label: 'Xóa bộ lọc',
          action: () => setFilter({
            ...filter,
            vendor: undefined,
            note: undefined,
            invoice: undefined,
            trace: undefined,
          })
        },
      ]
      return (<MoreButton items={items} />)
    }
  },
]
  return (
    <div>
      <DataGrid
        pagination
        page={page}
        paginationMode="server"
        onPageChange={p => setPage(p)}
        getRowId={(row) => row._id}
        columns={columns}
        rowsPerPageOptions={[100]}
        rows={purchases.purchases}
        autoHeight
        loading={loading}
        rowCount={rows}
        localeText={GridLocale}
      />
      <FilterModal
        open={filterVisible}
        onClose={() => toggleFilterVisible(false)}
        onSetFilter={setFilter}
        filter={filter}
        filterFields={[
          {
            name: 'vendor',
            placeholder: 'Nhập tên nhà cung cấp',
            label: 'Lọc theo nhà cung cấp'
          },
          {
            name: 'invoice',
            label: 'Số hóa đơn',
            placeholder: 'Nhập số hóa đơn'
          },
          {
            name: 'trace',
            label: 'Số chứng từ',
            placeholder: 'Nhập số chứng từ'
          },
          {
            name: 'note',
            label: 'Ghi chú',
            placeholder: 'nhập nội dung ghi chú'
          }
        ]}
        clearFilter={() => setFilter({
          ...filter,
          note: undefined,
          vendor: undefined,
          invoice: undefined,
          trace: undefined,
        })}
      />
    </div>
  )
}
export default PurchaseList

type MoreBtnMenu = {
  items: Record<string,any>[]
}

export const MoreButton: React.FC<MoreBtnMenu> = ({
  items
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <IconButton aria-controls="simple-menu" onClick={handleClick} color="primary">
        <MoreVert />
      </IconButton>
      <Menu
        id="simple-menu"
        onClose={handleClose}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
          {items.map(item => {
            return (
              <MenuItem key={item.name} onClick={handleClose}>
                <ListItem key={item.name} onClick={item.action}>
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItem>
              </MenuItem>
            )
          })}
        </Menu>
    </div>
  )
}