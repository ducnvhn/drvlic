import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  TextField,
  MenuItem,
  IconButton
} from '@material-ui/core'
import {
  makeStyles
} from '@material-ui/styles'
import {
  SubmitHandler,
  useForm,
  Controller,
  Control,
  UseFormSetValue
} from 'react-hook-form'
import { Close } from '@material-ui/icons'
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers'
import MomentUtils from '@date-io/date-fns'
// import moment from 'moment'

const useStyle = makeStyles({
  formInput: {
    marginTop: '1em'
  }
})

type TFModalProps = {
  open: boolean
  onClose: () => void
  onSetFilter: (filter: Record<string, any>) => void
  filter: Record<string,any>
  filterFields: Record<string,any>[]
  clearFilter: () => void
}

const FilterModal: React.FC<TFModalProps> = ({
  open,
  onClose,
  onSetFilter,
  filter,
  filterFields,
  clearFilter
}) => {
  // const cls = useStyle()
  
  const { control, handleSubmit, reset, setValue, getValues } = useForm({
    defaultValues: {
      ...filter
    }
  })
  const clearFieldValue:UseFormSetValue<Record<string,any>> = (key,value) => {
    setValue(key, value)
  }

  const onAcceptFilter: SubmitHandler<Record<string,any>> = data =>{
    for(const k in data) {
      if (!data[k as keyof Record<string, any>]) {
        data[k as keyof Record<string, any>] = undefined
      }
    }
    onSetFilter(data)
    onClose()
  }

  const closeForm = () => {
    reset({})
    onClose()
  }

  const clear = () => {
    reset()
    // onSetFilter({
    //   name: undefined,
    //   category: undefined,
    //   unit: undefined,
    //   code: undefined
    // })
    clearFilter()
    onClose()
  }
  const onKeydown:React.KeyboardEventHandler = (e) => {
    // console.log(e.key)
    if (e.key === 'Enter') {
      onAcceptFilter(getValues())
    }
  }
  return (
    <Dialog
      open={open}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        <Typography variant="h6">Lọc sản phẩm</Typography>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onAcceptFilter)}>
          {filterFields.map(field => (
            <FormField
              onPressEnter={onKeydown}
              name={field.name}
              key={field.name}
              control={control}
              setValue={clearFieldValue}
              // placeholder={field.placeholder}
              // label={field.label}
              // field={field}
              // type={field.type}
              // options={field.options}
              // onChange={field.onChange}
              {...field}
            />
          ))}
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => closeForm()} variant="text">Đóng</Button>
        <Button onClick={() => clear()} variant="text" color="secondary">Bỏ bộ lọc</Button>
        <Button onClick={handleSubmit(onAcceptFilter)} variant="outlined" color="primary">Áp dụng</Button>
      </DialogActions>
    </Dialog>
  )
}
export default FilterModal

type FormFieldProps = {
  control: Control
  setValue: UseFormSetValue<Record<string, any>>
  placeholder?: string
  label?: string
  type?: string
  options?: Array<any>
  name: string
  onPressEnter?: React.KeyboardEventHandler
  onChange?: (value: any) => void
  defaultValue?:any
}

function FormField (props: FormFieldProps) {
  const {
    name,
    control,
    setValue,
    label,
    type = "text",
    options,
    placeholder,
    onPressEnter,
    // onChange,
    defaultValue
  } = props
  const cls = useStyle()
  const [date, setDate] = React.useState(Date())
  const onDateChange = (val: any) => {
    setDate(val)
    // onChange !== undefined ? onChange(val): console.log('nothing')
    setValue(name, val)
  }
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        if (type === 'datePicker') {
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
                label={label}
                value={defaultValue || date}
                onChange={onDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                />
            </MuiPickersUtilsProvider>
          )
        }
        return(
          <TextField
            onKeyDown={onPressEnter}
            fullWidth
            size="small"
            className={cls.formInput}
            variant="outlined"
            label={label}
            placeholder={placeholder || ''}
            select={type === 'select'}
            InputProps={{
              endAdornment: (
                // @ts-ignore
                <IconButton onClick={() => setValue(name, '')}>
                  <Close />
                </IconButton>
              )
            }}
            {...field}
          >
            {type === 'select' && options && options.map(u => (
              <MenuItem value={u}>{u}</MenuItem>
            ))}
          </TextField>
        )
      }}
    />
  )
}
