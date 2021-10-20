import React from 'react'
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Divider,
  // List,
  // ListItem,
  // ListItemText,
  Slider,
  Button,
  CircularProgress
} from '@material-ui/core'

interface DProps {
  productsPerPage: number
  updating: boolean
  updateKey: string
  updateSettings: (key: string, value: number) => void
}

function valuetext(value: number) {
  return `${value}(sp)`;
}

const marks = [
  {
    value: 50,
    label: '50'
  },
  {
    value: 150,
    label: '150'
  },
  {
    value: 100,
    label: '100'
  },
  {
    value: 200,
    label: '200'
  }
]
const DisplaySettings:React.FC<DProps> = ({
  productsPerPage,
  updateSettings,
  updating,
  updateKey
}) => {
  const [displayValue, setDisplayValue] = React.useState(100)

  const onDisplayChange = (event: any, value: any) => {
    // console.log(value)
    setDisplayValue(value)
  }

  const updateChange = async () => {
    await updateSettings('productsPerPage', displayValue)
  } 

  return (
    <Card>
      <CardHeader
        title={
          <Typography variant="h5">
            Hiển thị
          </Typography>
        }
      />
      <Divider />
      <CardContent>
        <Typography id="discrete-slider" gutterBottom>
          Số sản phẩm trên 1 trang
        </Typography>
        <Slider
          defaultValue={productsPerPage}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={10}
          // marks
          min={30}
          max={200}
          marks={marks}
          onChange={onDisplayChange}
        />
        <div style={{display: 'flex'}}>
          <div style={{ flexGrow: 1 }}>{` `}</div>
          <Button onClick={updateChange} variant="outlined" disabled={updating && updateKey === 'productsPerPage'}>
            {updating && updateKey === 'productsPerPage' && <CircularProgress style={{marginRight: '5px' }} size={15} />}
            lưu
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
export default DisplaySettings
