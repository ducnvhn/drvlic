import React from 'react'
import {
  DataGrid
} from '@mui/x-data-grid'
import moment from 'moment'
import NumberFormat from 'react-number-format'
import { Typography } from '@material-ui/core'

type CompProps = {
  purchases: any[]
}

const PurchasHist:React.FC<CompProps> = ({
  purchases
}) => {
  const columns = [
    {
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
      field: 'invoiceDate',
      headerName: 'Ngày',
      renderCell: (p: any) => {
        console.log(p)
        return (
          <span>
            {moment(parseFloat(p.row.invoiceDate)).format('DD/MM/YYYY')}
          </span>
        )
      }
    },
    {
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
      field: 'invoice',
      headerName: 'Hóa đơn'
    },
    {
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
      field: 'vendor',
      headerName: 'Nhà CC'
    },
    {
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
      field: 'quantity',
      headerName: 'Số lượng'
    },
    {
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
      field: 'buyPrice',
      headerName: 'Giá nhập',
      renderCell: (p: any) => (
        <NumberFormat
          value={p.row.buyPrice}
          displayType="text"
          thousandSeparator=","
        />
      )
    },
  ]
  return (
    <div>
      <Typography variant="h6">
        Lịch sử nhập
      </Typography>
      <DataGrid
        columns={columns}
        rows={purchases}
        getRowId={(r) => r._id}
        autoHeight
        hideFooter
      />
    </div>

  )
}
export default PurchasHist
