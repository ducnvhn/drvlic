import React from 'react'
import {
  Toolbar,
  // Typography,
  Button,
  // Tabs,
  // Tab
} from '@material-ui/core'
import {
  makeStyles
} from '@material-ui/styles'
// import CreatePurchaseModal from './CreatePurchaseModal'
// import {
//   PurchaseInput
// } from '../'
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers'
import MomentUtils from '@date-io/date-fns'

const useStyle = makeStyles({
  root: { 
    display: 'flex'
  },
  title: {
    flexGrow: 1
  }
})

type CompProps = {
  // createPurchase: (purchase: PurchaseInput) => void
  // creating: boolean
  // activeTab: number
  buttonLabel?: string,
  filter: Record<string,any>
  onDateChange: (key: string, value: any) => void
  action: () => void
}
const StockToolbar:React.FC<CompProps> = ({
  // createPurchase,
  // creating,
  filter,
  onDateChange,
  action,
  buttonLabel
}) => {
  const cls = useStyle()
  // const [purchaseModal, togglePurchaseModal] = React.useState(false)
  return (
    <div>
      <Toolbar className={cls.root}>
        <span style={{ marginRight: '1em' }}>{`Thời gian: `}</span>
        <div style={{flexGrow: 1}}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
              style={{ marginRight: '1em' }}
              inputVariant="outlined"
              disableFuture
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              size="small"
              margin="normal"
              id="date-picker-inline"
              label="Từ ngày"
              value={filter.start}
              onChange={(val) => onDateChange('start', val)}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <KeyboardDatePicker
              style={{ marginRight: '1em' }}
              size="small"
              inputVariant="outlined"
              disableFuture
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Đến ngày ngày"
              value={filter.end}
              onChange={(val) => onDateChange('end', val)}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </div>
        <Button color="primary" variant="contained" onClick={() => action()}>{buttonLabel ? buttonLabel : 'Thêm'}</Button>
      </Toolbar>
      {/* <CreatePurchaseModal
        createPurchase={createPurchase}
        creating={creating}
        open={purchaseModal}
        onClose={() => togglePurchaseModal(false)}
        onCreate={() => togglePurchaseModal(false)}
      /> */}
    </div>
  )
}
export default StockToolbar
