import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Typography,
  Button,
  TextField,
  IconButton,
  MenuItem,
} from '@material-ui/core'
import {
  Close
} from '@material-ui/icons'
import {
  makeStyles
} from '@material-ui/styles'
import {
  Controller,
  useForm,
  SubmitHandler,
  FieldValues
} from 'react-hook-form'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'
import MomentUtils from '@date-io/date-fns'
// import moment from 

const useStyle = makeStyles({
  formField: {
    marginTop: '1em'
  }
})
type ComProps = {
  open: boolean
  onClose: () => void
  onCreate: () => void
}


const transferTypes: {type: string, text: string}[] = [
  {
    type: 'TO_SHOP',
    text: 'Chuyển cửa hàng'
  },
  {
    type: 'RETURN',
    text: 'Chuyển trả hàng'
  },
  {
    type: 'PACK',
    text: 'Đóng liều'
  },
  {
    type: 'OTHER',
    text: 'Chuyển khác'
  }
]
const CreateTransferModal: React.FC<ComProps> = ({
  open,
  onClose,
  onCreate
}) => {
  const cls = useStyle()
  const { control, setValue, getValues, handleSubmit, watch } = useForm({
    defaultValues: {
      transferDate: new Date(),
      note: '',
      type: '',
      shop: '',
    }
  })
  const openShop = watch('type') === 'TO_SHOP'
  const submitForm: SubmitHandler<FieldValues> = data => {
    const { type, shop, transferDate} = data
    if (type === 'TO_SHOP' && (shop === '' || shop === undefined)) {
      console.log('khong lam dc')
      return
    }
    if (!transferDate) {
      return
    }
  }

  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={open}
      onClose={onClose}
    >
      <DialogTitle>
        <Typography variant="h6">
          Đơn chuyển hàng
        </Typography>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(submitForm)}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
              className={cls.formField}
              style={{width: '100%'}}
              inputVariant="outlined"
              disableFuture
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              size="small"
              margin="normal"
              id="date-picker-inline"
              label="Ngày chuyển"
              value={getValues().transferDate}
              onChange={(val:any) => setValue('transferDate', new Date(val))}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              />
            </MuiPickersUtilsProvider>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  size="small"
                  className={cls.formField}
                  variant="outlined"
                  label="Loại chuyển"
                  placeholder="chọn một"
                  select
                  InputProps={{
                    endAdornment: (
                      // @ts-ignore
                      <IconButton onClick={() => setValue('type', undefined)}>
                        <Close />
                      </IconButton>
                    )
                  }}
                  {...field}
                >
                  {transferTypes.map(u => (
                    <MenuItem value={u.type}>{u.text}</MenuItem>
                  ))}
                </TextField>
              )}
            />
            {openShop && (
              <Controller
                name="shop"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    size="small"
                    className={cls.formField}
                    variant="outlined"
                    label="Cửa hàng"
                    placeholder="chọn một"
                    InputProps={{
                      endAdornment: (
                        // @ts-ignore
                        <IconButton onClick={() => setValue('shop', undefined)}>
                          <Close />
                        </IconButton>
                      )
                    }}
                    {...field}
                  />
                )}
              />
            )}
            <Controller
                name="note"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    multiline
                    rowsMax="3"
                    size="small"
                    className={cls.formField}
                    variant="outlined"
                    label="Ghi chú"
                    placeholder="chọn một"
                    InputProps={{
                      endAdornment: (
                        // @ts-ignore
                        <IconButton onClick={() => setValue('shop', undefined)}>
                          <Close />
                        </IconButton>
                      )
                    }}
                    {...field}
                  />
                )}
              />
        </form>
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={(evt: React.MouseEvent<HTMLButtonElement>) => onClose()}>Hủy</Button>
        <Button onClick={handleSubmit(submitForm)} variant="outlined" color="primary">Tạo đơn</Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateTransferModal
