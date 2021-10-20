import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button
} from '@material-ui/core'
import {
  Alert
} from '@material-ui/lab'

type TProps = {
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

function ConfirmDialog (props: TProps) {
  const {
    open,
    onClose,
    onConfirm
  } = props
  return (
    <Dialog
      open={open}
      maxWidth="xs"
    >
      <DialogTitle>
        <Alert severity="error">Xóa sản phẩm?</Alert>
      </DialogTitle>
      <DialogContent>
        Sản phẩm sẽ bị xóa khỏi cơ sở dữ liệu và không thể phục hồi lại.
        Tất cả dữ liệu liên quan (bán hàng, kiểm kê, nhập hàng) cũng sẽ bị xóa theo.
        Bạn có chắc muốn xóa không ?
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Hủy</Button>
        <Button onClick={onConfirm} color="secondary" variant="text">Xóa</Button>
      </DialogActions>
    </Dialog>
  )
}
export default ConfirmDialog