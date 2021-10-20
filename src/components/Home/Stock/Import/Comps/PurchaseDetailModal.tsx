import React from 'react'
import moment from 'moment'
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  Typography,
  TextField,
  IconButton,
  CircularProgress,
} from "@material-ui/core"
import {
  SubmitHandler,
  FieldValues,
  useForm,
  Controller,
  UseFormSetValue
} from 'react-hook-form'
import { Edit } from '@material-ui/icons'
import {
  makeStyles
} from '@material-ui/styles'
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers'
import MomentUtils from '@date-io/date-fns'

const useStyle = makeStyles({
  textField: {
    marginTop: '1em'
  }
})

type PurchaseInfo = {
  purchase: any
  open: boolean
  onClose: () => void
  updatePurchase: (purchase: string, data: any) => void
}

const initialEditableFields: Record<string,boolean> = {
  note: false,
  vendor: false,
  invoice: false,
  trace: false
}

function PCDetail(props: PurchaseInfo) {
  const {
    open,
    onClose,
    purchase,
    updatePurchase
  } = props
  // const [updatePurchase, { loading: updating }] = useMutation(UPDATE_PURCHASE)
  const [updating, toggleUpdating] = React.useState(false)
  const [editable, toggleEdit] = React.useState(initialEditableFields)
  const toggleField = (field: string, val: boolean) => {
    const newEditableFields = { ...editable }
    newEditableFields[field] = val
    toggleEdit(newEditableFields)
  }
  const { handleSubmit, setValue, control } = useForm()
  
  const onSubmit:SubmitHandler<FieldValues> = async (data) => {
    const newData:Record<string,any> = {}
    for (const k in data) {
      if (data[k] !== undefined) {
        newData[k] = data[k]
      }
    }
    // onClose()
    // console.log(newData)
    if (Object.keys(newData).length > 0) {
      toggleUpdating(true)
      await updatePurchase(purchase._id, newData)
      toggleUpdating(false)
      onClose()
      return
    }
    onClose()
  }
  
  const fields:Record<string, any>[] = [
    {
      name: 'vendor',
      label: 'Nhà cung cấp',
      type: 'text'
    },
    {
      name: 'invoice',
      label: 'Số hóa đơn',
      type: 'text'
    },
    {
      name: 'trace',
      label: 'Số chứng từ',
      type: 'text'
    },
    {
      name: 'note',
      label: 'Ghi chú',
      type: 'text'
    },
    {
      name: 'invoiceDate',
      label: 'Ngày hóa đơn',
      type: 'date'
    }
  ]
  return (
    <Dialog
      open = {open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        <Typography variant="h6">
          Thông tin đơn hàng
        </Typography>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            {fields.map(field => (
              <RenderField
                key={field.name}
                control={control}
                data={field}
                purchase={purchase}
                onClick={toggleField}
                editable={editable}
                setValue={setValue}
              />
            ))}
            {/* <Controller
              name="vendor"
              control={control}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  defaultValue={purchase.vendor}
                  disabled={!editable.vendor}
                  fullWidth
                  InputProps={{
                    endAdornment:(
                      <IconButton color={editable.vendor ? 'primary' : 'default'} onClick={() => toggleField('vendor', !editable.vendor)}>
                        <Edit />
                      </IconButton>
                    )
                  }}
                />
              )}
            /> */}
          </form>
        </DialogContent>
        <DialogActions>
          <Button color="primary" variant="outlined" onClick={onClose}>Đóng</Button>
          <Button disabled={updating} color="primary" variant="contained" onClick={handleSubmit(onSubmit)}>
            {updating && <CircularProgress size={15} />}
            Lưu thay đổi
          </Button>
        </DialogActions>
      </DialogTitle>

    </Dialog>
  )
}
export default PCDetail

type RenderFieldProps = {
    data: Record<string,any>
    control: any
    // name: string
    purchase: any
    onClick: (key: string, value: boolean) => void,
    editable: Record<string,boolean>
    setValue: UseFormSetValue<Record<string, any>>
}


function RenderField (props: RenderFieldProps) {
  const cls = useStyle()
  const {
    control,
    data,
    purchase,
    onClick,
    editable,
    setValue,
  } = props
  const [date, setDate] = React.useState(moment(parseFloat(purchase.invoiceDate)).toDate())
  const changeDate = (value:any) => {
    // console.log(value)
    setDate(value)
    setValue(data.name, value)
  }
  if (data.type === 'text') {
    return (
      <Controller
        name={data.name}
        control={control}
        render={({ field }) => (
          <TextField
            label={data.label}
            className={cls.textField}
            variant="outlined"
            defaultValue={purchase[data.name]}
            disabled={!editable[data.name]}
            fullWidth
            InputProps={{
              endAdornment:(
                <IconButton color={editable.vendor ? 'primary' : 'default'} onClick={() => onClick(data.name, !editable[data.name])}>
                  <Edit />
                </IconButton>
              )
            }}
            {...field}
          />
        )}
      />
    )
  }
  if (data.type === 'date') {
    return (
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
          label={data.label}
          // @ts-ignore
          value={date}
          onChange={changeDate}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          />
      </MuiPickersUtilsProvider>
    )
  }
  return null
}