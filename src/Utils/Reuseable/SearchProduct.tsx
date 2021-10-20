import React from 'react'
// import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import {
  makeStyles
} from '@material-ui/styles'
import {
  CircularProgress,
  TextField
} from '@material-ui/core'

const useStyle = makeStyles({
  root: {
    width: '30%',
    display: 'inline-flex'
  }
})

type CompProps = {
  name: string
  // query: string
  // setValue: (key: string, value: any) => void
  dataKey?: string
  options: any[]
  onChange: (value: any) => void
  onSelect: (val:any) => void
  loading: boolean
  errors?: {[x:string]:any}
  searchText: any
}

const SearchProduct: React.FC<CompProps> = ({
  name,
  // query,
  // setValue,
  options,
  onChange,
  onSelect,
  loading,
  errors,
  searchText
}) => {
  const cls = useStyle()
  const [open, setOpen] = React.useState(false)
  // const [inputValue, onInputChange] = React.useState(searchText)

  // React.useEffect(() => {
  //   onInputChange(searchText)
  // }, [searchText, onInputChange])

  return (
    <Autocomplete
      id="asynchronous-demo"
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option._id === value._id && value !== undefined}
      getOptionLabel={(option: any) => option.name}
      options={options}
      loading={loading}
      inputValue={searchText}
      onInputChange={(e, val) =>onChange(val)}
      className={cls.root}
      onChange={(ev, val) => onSelect(val)}
      renderInput={(params) => (
        <TextField
          // onChange={(evt) => onChange(name, evt.target.value)}
          {...params}
          size="small"
          label="Tìm sản phẩm"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
          helperText={errors !== undefined && name in errors ? 'Nhập tên sản phẩm cần tìm' : '*Sản phẩm'}
        />
      )}
    />
  )
}
export default SearchProduct