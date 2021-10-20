import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress
} from '@material-ui/core'
import {
  useForm,
  Controller,
  SubmitHandler
} from 'react-hook-form'
import {
  makeStyles
} from '@material-ui/styles'
import {
  PurchaseInput
} from '../index'
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers'
import MomentUtils from '@date-io/date-fns';
import moment from 'moment'

const useStyle = makeStyles({
  formInput: {
    marginTop: '1em'
  }
})

type CompProps = {
  open: boolean,
  onClose: () => void
  onCreate?: () => void
  createPurchase: (purchase: PurchaseInput) => void
  creating: boolean
}
const CreatePurchaseDialog: React.FC<CompProps> = ({
  open,
  onClose,
  onCreate,
  createPurchase,
  creating
}) => {
  const cls = useStyle()
  const {control, reset, handleSubmit, setValue } = useForm()
  const [invoiceDate, setInvoiceDate] = React.useState(new Date())
  const closeDialog = () => {
    reset()
    onClose()
  }
  const onSubmitPurchase: SubmitHandler<PurchaseInput> = async (data) => {
    await createPurchase(data)
    closeDialog()
  }

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Đơn nhập hàng mới</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmitPurchase)}>
          <Controller
            name="invoiceDate"
            control={control}
            render={({ field }) => (
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                  inputVariant="outlined"
                  style={{width: '100%'}}
                  disableFuture
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Ngày hóa đơn"
                  value={invoiceDate}
                  onChange={val => {
                    setValue('invoiceDate',val)
                    setInvoiceDate(moment(val).toDate())
                  }}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                  />
              </MuiPickersUtilsProvider>
            )}
          />
          <Controller
            name="vendor"
            control={control}
            render={({ field }) => (
              <TextField
                label="Nhà cung cấp"
                variant="outlined"
                className={cls.formInput}
                fullWidth
                {...field}
              />
            )}
          />
          <Controller
            name="trace"
            control={control}
            render={({ field }) => (
              <TextField
                label="Số chứng từ"
                variant="outlined"
                className={cls.formInput}
                fullWidth
                {...field}
              />
            )}
          />
          <Controller
            name="invoice"
            control={control}
            render={({ field }) => (
              <TextField
                label="Số hóa đơn"
                variant="outlined"
                className={cls.formInput}
                fullWidth
                {...field}
              />
            )}
          />
          <Controller
            name="note"
            control={control}
            render={({ field }) => (
              <TextField
                label="ghi chú"
                variant="outlined"
                className={cls.formInput}
                fullWidth
                multiline
                maxRows={3}
                rows={3}
                {...field}
              />
            )}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => closeDialog()} variant="text">Hủy</Button>
        <Button onClick={handleSubmit(onSubmitPurchase)} variant="contained" color="primary">
          {creating && <CircularProgress size={30} />}
          Tạo đơn
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export default CreatePurchaseDialog