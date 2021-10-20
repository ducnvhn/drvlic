import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Snackbar,
  CircularProgress,
} from '@material-ui/core'
import {
  Alert
} from '@material-ui/lab'
import {
  useForm,
  Controller,
  SubmitHandler
} from 'react-hook-form'
import {
  makeStyles
} from '@material-ui/styles'
import {
  gql,
  useMutation
} from '@apollo/client'
import {
  useSettings
} from '../../../../context/SettingsContext'
import {
  LOAD_PRDS,
} from './PrdsList'

const ADD_PRD = gql`
  mutation addProduct($product: ProductInput) {
    addProduct(product: $product) {
      _id
      category
      name
      vendor
      unit
      code
    }
  }
`

const useStyle = makeStyles({
  root: {
    flexGrow: 1
  },
  textInput: {
    marginTop: '1em'
  }
})

interface PFormInput {
  name: string
  unit: string
  code: string
  category: string
}

const AddPrdModal:React.FC<{
  open: boolean
  onClose: () => void
  filter: Record<string,any>
  page: number
  limit: number
}> = ({
  open,
  onClose,
  filter,
  page,
  limit
}) => {
  const cls = useStyle()
  const { reset, control, handleSubmit, formState: { errors }} = useForm()
  const [addPrd, { loading: adding, error: addError }] = useMutation(ADD_PRD)
  const { getSettings } = useSettings()
  const { units, categories } = getSettings()
  const onSubmit: SubmitHandler<PFormInput> = async (product) => {
    try {
      await addPrd({
        variables: {
          product
        },
        update: (cache, { data }) => {
          // if (error !== null || error === undefined) {
          //   return
          // }
          const oldProducts: object | null = cache.readQuery({
            query: LOAD_PRDS,
            variables: {
              filter,
              pagination: {
                page,
                limit
              }
            }
          })
          if (!oldProducts || oldProducts === null) {
            console.log('no old data, check filter and query')
            return
          }
          console.log(oldProducts)
          cache.writeQuery({
            query: LOAD_PRDS,
            variables: {
              filter,
              pagination: {
                page,
                limit
              }
            },
            data: {
              ...oldProducts,
              // @ts-ignore
              loadProducts:{
                // @ts-ignore
                ...oldProducts.loadProducts,
                // @ts-ignore
                products: [data.addProduct, ...oldProducts.loadProducts.products!]
              }
            }
          })
        }
      })
      reset()
      onClose()
    } catch (e) {
      console.log(e)
      // onClose()
    }
  }
  const closeModal = () => {
    reset()
    onClose()
  }
  return (
    <Dialog
      open={open}
      scroll="paper"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        add new prd
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            rules={{ required: true, minLength: 4}}
            control={control}
            render={({ field }) => (
                <TextField
                  error={'name' in errors}
                  className={cls.textInput}
                  label="Tên sản phẩm(*)"
                  variant="outlined"
                  fullWidth
                  placeholder="Tên sản phẩm"
                  helperText={'name' in errors ? 'nhập tên sản phẩm , tiếng V có dấu' : ''}
                  {...field}
                />
              )}
          />
          <Controller
            name="code"
            rules={{ required: true, minLength: 6}}
            control={control}
            render={({field}) => {
              return (
                <TextField
                error={'code' in errors}
                className={cls.textInput}
                label="Mã sản phẩm(*)"
                variant="outlined"
                fullWidth
                placeholder="Mã sản phẩm"
                helperText={'code' in errors ? 'Mã sản phẩm tối thiểu 6 ký tự' : ''}
                {...field}
                />
              )
            }}
          />
          <Controller
            name="unit"
            rules={{ required: true }}
            control={control}
            render={({field}) => {
              return (
                <FormControl variant="outlined" fullWidth>
                  <InputLabel variant="outlined" id="sele_unit_label">Đơn vị</InputLabel>
                  <Select
                    label="Đơn vị"
                    labelId="sele_unit_label"
                    placeholder="Đơn vị tính"
                    fullWidth
                    variant="outlined"
                    className={cls.textInput}
                    {...field}
                  >
                    {units.map(u => (
                      <MenuItem value={u} key={u}>{u}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )
            }}
          />
          <Controller
            name="category"
            rules={{ required: true }}
            control={control}
            render={({field}) => {
              return (
                <FormControl variant="outlined" fullWidth>
                  <InputLabel variant="outlined" id="selec_cat_label">Danh Mục</InputLabel>
                  <Select
                    label="Danh Mục"
                    labelId="selec_cat_label"
                    placeholder="Danh mục"
                    fullWidth
                    variant="outlined"
                    className={cls.textInput}
                    {...field}
                  >
                    {categories && categories.map(c => (
                      <MenuItem value={c} key={c}>{c}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )
            }}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal} color="secondary" variant="outlined">Cancel</Button>
        <Button disabled={adding} onClick={handleSubmit(onSubmit)} color="primary" variant="contained">
          {adding && <CircularProgress size={20} />}
          Submit
        </Button>
      </DialogActions>
      <Snackbar open={addError !== undefined}>
        <Alert severity="error">
          Đã có lỗi xẩy ra, vui lòng thử lại sau
        </Alert>
      </Snackbar>
    </Dialog>
  )
}

export default AddPrdModal