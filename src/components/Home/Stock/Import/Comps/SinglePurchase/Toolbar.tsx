import React from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Popover,
  List,
  ListItem,
  ListItemText,
  Chip
  // Zoom
} from '@material-ui/core'
import NumberFormat from 'react-number-format'
import {
  Close,
  BorderColorRounded,
  MonetizationOn
} from '@material-ui/icons'
import {
  makeStyles
} from '@material-ui/styles'
// import ConfirmDialog from './ConfirmDeleteModal'
import ConfirmDelete from './ConfirmDeleteModal'

const useStyle = makeStyles({
  appBar: {
    position: 'relative'
  },
  title: {
    flex: 1
  },
  topBtn: {
    marginLeft: '1em'
  },
  popOver: {
    padding: 0
  },
  popPaper: {
    padding: '1em'
  }
})

type CompType = {
  purchase: Record<string,any>
  onClose: () => void
  openModal: () => void
  deletePurchase: (purchase: string) => void
}

const PurchaseToolbar: React.FC<CompType> = ({
  purchase,
  onClose,
  openModal,
  deletePurchase
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)
  const [deleteModal, toggleDeleteModal] = React.useState(false)
  const cls = useStyle()

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  }

  const onDeltePurchse = async () => {
    await deletePurchase(purchase._id)
    onClose()
  }

  let total = 0
  purchase.products.map((prd: any) => {
    total += Number(prd.quantity) * Number(prd.buyPrice)
    return null
  })

  const open = Boolean(anchorEl)
  return (
    <AppBar color="default" elevation={0} className={cls.appBar}>
      <Toolbar>
        <IconButton onClick={() => onClose()}>
          <Close />
        </IconButton>
        <Typography variant="h5" className={cls.title}>
          {`Đơn nhập - ${purchase.vendor}`}
          
          <Popover
            id="mouse-over-popover"
            className={cls.popOver}
            classes={{
              paper: cls.popPaper,
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            onClose={() => setAnchorEl(null)}
            disableRestoreFocus
          >
            <List>
              <ListItem>
                <ListItemText>Nhà CC: {purchase.vendor}</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>Số hóa đơn: {purchase.invoice}</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>Số chứng từ: {purchase.trace}</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>Số sản phẩm: {purchase.products.length || 0}</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>Tổng số tiền: {total}</ListItemText>
              </ListItem>
            </List>
          </Popover>
          <Chip
            aria-owns={open ? 'mouse-over-popover' : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            avatar={(
              <MonetizationOn />
              )}
              label={(
                <NumberFormat
                style={{ marginLeft: '2em', fontSize: '14px'}}
                value={total}
                thousandSeparator=","
                displayType="text"
                disabled
                isNumericString
                prefix="VNĐ "
                />
                )}
                />
          <IconButton
            // aria-owns={open ? 'mouse-over-popover' : undefined}
            // aria-haspopup="true"
            onClick={() => openModal()}
            color="secondary"
          >
            <BorderColorRounded />
          </IconButton>
        </Typography>
        <Button onClick={() => toggleDeleteModal(true)} className={cls.topBtn} variant="outlined" disableElevation color="secondary">Hủy đơn</Button>
        <Button className={cls.topBtn} variant="outlined" disableElevation color="primary" onClick={() => onClose()}>Đóng</Button>
      </Toolbar>
      <ConfirmDelete
        open={deleteModal}
        onClose={() => toggleDeleteModal(false)}
        onConfirm={() => onDeltePurchse()}
      />
    </AppBar>
  )
}

export default PurchaseToolbar
