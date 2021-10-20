import React from 'react'
import {
  Button,
  CircularProgress,
  Toolbar,
  Typography,
  // Grid
} from '@material-ui/core'
import {
  GridFilterModel,
} from '@mui/x-data-grid'
import {
  makeStyles
} from '@material-ui/styles'
import {
  gql,
  useMutation
} from '@apollo/client'
import {
  AddCircle,
  AttachFileOutlined,
} from '@material-ui/icons'
import AddPrdModal from './AddPrdModal'
// import FilterModal from './FilterModal'
import XLSX from 'xlsx'
// import {
//   IPFilter
// } from './PrdsList'
// import {
//   TFilterInput
// } from './FilterModal'

type TToolbarPrps = {
  filter: Record<string,any>
  setFilter?: React.Dispatch<React.SetStateAction<GridFilterModel>>
  page: number
  limit: number
}

const useStyle = makeStyles({
  tbRoot: {
    flexGrow: 1
  },
  pTitle: {
    flexGrow: 1
  }
})

const UPLOAD_PRDS = gql`
  mutation batchCreate($data: [ProductInput]!) {
    batchCreate(data: $data) {
      _id
      category
      name
      unit
      code
    }
  }
`
export interface TProduct {
  name: string
  unit: string
  category: string,
  code: string
}

const PrdToolbar:React.FC<TToolbarPrps> = ({
  filter,
  page,
  limit
}) => {
  const cls = useStyle()
  const [modal, toggleModal] = React.useState(false)
  const [uploadPrd, { loading: uploading }] = useMutation(UPLOAD_PRDS)
  
  const onFileChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const target = evt.target as HTMLInputElement
   const {
     validity,
     files
   } = target
   if (validity.valid) {
     const reader = new FileReader()
     reader.onload = async (e: ProgressEvent<FileReader>) => {
      const workbook = XLSX.read(e.target?.result, { type: 'array' })
      // const sheets = workbook.SheetNames
      // console.log(workbook.Sheets['sp'])
      const sdata:TProduct[] = XLSX.utils.sheet_to_json(workbook.Sheets['sp'])
      // console.log(data)
      const data: TProduct[] = sdata.map((s) => ({
        name: s.name,
        unit: s.unit,
        category: s.category,
        code: s.code
      }))
      await uploadPrd({
        variables: {
          data
        }
      })
    }
     reader.readAsArrayBuffer(files![0])
    } else {
      console.log(validity)
      return
   }
  }

  return (
    <div className={cls.tbRoot}>
      <Toolbar>
        <Typography variant="h5">
          Danh sách sản phẩm
        </Typography>
        <span className={cls.pTitle} />
        <input
          multiple={false}
          onChange={onFileChange}
          style={{ display: 'none'}}
          id="fileSelect"
          type="file"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        />
        <label htmlFor="fileSelect" style={{marginRight: '1em' }}>
          <Button
            color="secondary"
            component="span"
            variant="outlined"
            startIcon={<AttachFileOutlined />}
          >
            {uploading && <CircularProgress size={20} />}
            Tải lên
          </Button>
        </label>
        <Button
          color="primary"
          variant="outlined"
          startIcon={<AddCircle />}
          onClick={() => toggleModal(true)}
        >
          Thêm sản phẩm
        </Button>
      </Toolbar>
      <AddPrdModal
        page={page}
        limit={limit}
        filter={filter}
        open={modal}
        onClose={() => toggleModal(false)}
      />
    </div>
  )
}
export default PrdToolbar