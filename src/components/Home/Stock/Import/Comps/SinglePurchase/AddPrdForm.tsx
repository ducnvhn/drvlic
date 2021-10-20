import React from 'react'
import {
  Grid,
  TextField,
  Typography,
  Button,
  CircularProgress
} from '@material-ui/core'
import {
  makeStyles
} from '@material-ui/styles'
import {
  useForm,
  Controller,
  SubmitHandler,
  // UseFormReturn
} from 'react-hook-form'
import {
  gql,
  useLazyQuery
} from '@apollo/client'
import {VNDNumberInput, NumberInput} from '../../../../../../Utils/Reuseable/VNDNumberInput'
import SearchProduct from '../../../../../../Utils/Reuseable/SearchProduct'

const SEARCH_PRDS = gql`
  query searchForImport($name: String) {
    searchForImport(name: $name) {
      _id
      category
      name
      vendor
      position
      barcode
      storageCondition
      unit
      code
      registerNumber
      manufacture
      country
      created
    }
  }
`

const useStyle = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    padding: '1em',
    "& .form": {
      flexGrow: 1
    },
    "& .MuiFormControl-root": {
      marginRight: '1em',
    },
    "& .lg": {
      width: '30%',
    },
    "& .md": {
      width: '15%',
    },
    "& .sm": {
      width: '10%',
    },
    "& .xs": {
      width: '10%'
    }
  },
  formHead: {
    // flex: 2,
    // flexShrink: 1,
    display: 'inline',
    marginRight: '1em'
  }
}))

type CompProps = {
  addProduct: (purchase: string, product: string, quantity: number, buyPrice: number) => void
  purchase: string
}

const AddProductForm: React.FC<CompProps> = ({
  addProduct,
  purchase
}) => {
  let searchTimeout: NodeJS.Timeout
  const defaultFormValues: Record<string, any> = {
    product: undefined,
    unit: undefined,
    quantity: 1,
    buyPrice: 0,
    total: 0
  }
  const { control, handleSubmit, formState: { errors }, getValues, setValue, reset } = useForm({
    defaultValues: defaultFormValues
  })
  const [searchProducts, { loading: searching, data: suggestProducts={ searchForImport: []} }] = useLazyQuery(SEARCH_PRDS)
  // const [selectedPrd, setSelectedPrd] = React.useState<string>()
  const [adding, toggleAdding] = React.useState(false)
  const [keyword, setKeyword] = React.useState('')
  
  // React.useEffect(() => {
  //   const load = async () => searchProducts({
  //     variables: {
  //       name: keyword
  //     }
  //   })
  //   load()
  // }, [ keyword, searchProducts])

  const handleKeywordChange = (keyword: string) => {
    setKeyword(keyword)
    if (searchTimeout) {
      clearTimeout(searchTimeout)
    }
    searchTimeout = setTimeout(() => {
      searchProducts({
        variables: {
          name: keyword
        }
      })
    }, 500)
  }
  
  const handleProductSelect = (product: any) => {
    const { _id } = product
    setValue('product', _id)
    setValue('unit', product.unit)
  }

  const onBuyPriceChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { quantity } = getValues()
    const { value }  = evt.target
    setValue('total', Number(value) * quantity)
    setValue('buyPrice', value)
  }

  const onQuantityChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { buyPrice } = getValues()
    const { value }  = evt.target
    setValue('total', Number(value) * buyPrice)
    setValue('quantity', value)
  }

  const onSubmit:SubmitHandler<any> = async data => {
    toggleAdding(true)
    const { product, quantity, buyPrice } = data
    await addProduct(purchase, product, Number(quantity), Number(buyPrice))
    reset(defaultFormValues)
    // console.log(getValues())
    // setValue('buyPrice', 0)
    setKeyword('')
    toggleAdding(false)
  }
  const cls = useStyle()
  return (
    <Grid className={cls.root} container direction="row" alignContent="center" justifyContent="flex-start">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <Typography className={cls.formHead} variant="h6">{`Thêm sp :`}</Typography>
        <Controller
          rules={{ required: true }}
          name="product"
          control={control}
            render={({ field }) => (
              <SearchProduct
                searchText={keyword}
                errors={errors}
                name="product"
                options={suggestProducts.searchForImport}
                onChange={(val) => handleKeywordChange(val)}
                onSelect={val => {
                  // console.log(val)
                  if (val) {
                    handleProductSelect(val)
                  } else {
                    // console.log('product cleared')
                    setValue('product', undefined)
                  }
                }}
                loading={searching}
              />
            )}
          />
        <Controller
          name="unit"
          control={control}
          render={({field}) => (
            <TextField
              disabled
              size="small"
              className="formField xs"
              // label="Đơn vị"
              variant="outlined"
              {...field}
              />
              )}
            />
        <Controller
          name="buyPrice"
          rules={{ min: 0, required: true }}
          control={control}
          render={({field}) => (
            <TextField
              error={errors.buyPrice && (errors.buyPrice.type === 'required' || errors.buyPrice.type === 'min')}
              size="small"
              label="Giá nhập"
              className="formField md"
              variant="outlined"
              InputProps={{
                inputComponent: VNDNumberInput as any | null
              }}
              {...field}
              onChange={e => {
                onBuyPriceChange(e)
                field.onChange(e)
              }}
              helperText={errors.buyPrice && errors.buyPrice.type === 'required' ? 'Vui lòng nhập giá' : '*Nhập giá mua vào'}
            />
          )}
        />
        <Controller
          name="quantity"
          rules={{ min: 1, required: true}}
          control={control}
          render={({field}) => (
            <TextField
              error={errors.quantity && (errors.quantity.type === 'required' || errors.quantity.type === 'min')}
              size="small"
              label="Số lượng"
              className="formField xs"
              variant="outlined"
              InputProps={{
                inputComponent: NumberInput as any | null
              }}
              {...field}
              helperText={errors.quantity && errors.quantity.type==='required' ? '*Nhỏ nhất là 1': '*Tối thiểu 1'}
              onChange={onQuantityChange}
            />
          )}
        />
        <Controller
          name="total"
          control={control}
          render={({field}) => (
            <TextField
              size="small"
              label="Thành tiền"
              className="formField md"
              variant="outlined"
              InputProps={{
                inputComponent: VNDNumberInput as any | null
              }}
              {...field}
              helperText="Tự động tính"
            />
          )}
        />
        <Button disabled={adding} onClick={handleSubmit(onSubmit)} variant="outlined" color="primary" className="formField">
          {adding && <CircularProgress size={15} />}
          Thêm
        </Button>
      </form>
    </Grid>
  )
}
export default AddProductForm

// const options = [
//   {
//     _id: 'duc',
//     name: 'ducnv',
//     value: 1,
//   },
//   {
//     _id: 'huong,',
//     name: 'huong beo',
//     value: 2
//   },
//   {
//     _id: 'ha',
//     name: 'un thoi',
//     value: 3
//   },
//   {
//     _id: 'dang',
//     name: 'in thoi',
//     value: 4
//   }
// ]
