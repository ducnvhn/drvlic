import React from 'react'
import {
  Paper,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core'
import {
  makeStyles
} from "@material-ui/styles"

const useStyle = makeStyles({
  ppRoot: {
    padding: '1em'
  }
})
type compProps = {
  product: any
}

const PrdInfo:React.FC<compProps> = ({
  product
}) => {
  const cls = useStyle()
  return (
    <Paper className={cls.ppRoot}>
      <Typography variant="h6">
        {`Thông tin sản phẩm: `}
      </Typography>
      <Divider />
      <List>
        <ListItem>
          <ListItemText primary={product.product.name} secondary="Tên sản phẩm" />
          <ListItemText primary={product.product.code} secondary="Mã sản phẩm" />
          <ListItemText primary={product.product.unit} secondary="Đơn vị" />
          <ListItemText primary={product.product.category} secondary="Danh mục" />
          <ListItemText primary={product.available} secondary="Tồn kho" />
          <ListItemText primary={product.avgPrice} secondary="Giá trung bình gia quyền" />
        </ListItem>
      </List>
    </Paper>
  )
}
export default PrdInfo