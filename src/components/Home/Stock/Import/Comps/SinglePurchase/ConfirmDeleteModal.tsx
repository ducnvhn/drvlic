import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress
} from '@material-ui/core'

type CompProps = {
  open: boolean,
  onClose: () => void
  onConfirm: () => void
}
const ConfirmDelete: React.FC<CompProps> = ({
  open,
  onClose,
  onConfirm
}) => {
  const [loading, toggleLoading] = React.useState(false)
  const confirmAction = async () => {
    toggleLoading(true)
    await onConfirm()
    toggleLoading(false)
    onClose()
  }
  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>
        Hủy đơn nhập hàng này?
      </DialogTitle>
      <DialogContent>
        Hủy đơn nhập hàng sẽ xóa toàn bộ sản phẩm trong đơn. Bạn có muốn tiếp tục không?
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={onClose}>Bỏ qua</Button>
        <Button variant="outlined" color="secondary" onClick={() => confirmAction()}>
          {loading ? <CircularProgress size={15} /> : 'Đồng ý'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export default ConfirmDelete
