import React from 'react'
import {
  Dialog,
} from '@material-ui/core'
// import {
//   BorderColorRounded,
//   Close,
// } from '@material-ui/icons'
import PurchaseDetailModal from './PurchaseDetailModal'
import AddProductForm from './SinglePurchase/AddPrdForm'
import Products from './SinglePurchase/Products'
import PurchaseToolbar from './SinglePurchase/Toolbar'


type DialogProps = {
  open: boolean
  onClose: () => void
  purchase: any
  updatePurchase: (purchase: string, data: any) => void
  addProduct: (purchase: string, product: string, quantity: number, buyPrice: number) => void
  removeProduct: (purchase: string, product: string, quantity: number, buyPrice: number) => void
  deletePurchase: (purchase: string) => void
}
const SinglePurchaseModal: React.FC<DialogProps> = ({
  open,
  onClose,
  purchase,
  updatePurchase,
  addProduct,
  removeProduct,
  deletePurchase
}) => {
  const [detailModal, toggleDetailModal] = React.useState(false)
  return (
    <Dialog
      open={open}
      fullScreen
    >
      <PurchaseToolbar
        purchase={purchase}
        onClose={() => onClose()}
        openModal={() => toggleDetailModal(true)}
        deletePurchase={deletePurchase}
      />
      <div>
        <AddProductForm
          addProduct={addProduct}
          purchase={purchase._id}
        />
        <Products
          purchase={purchase._id}
          products={purchase.products}
          removeProduct={removeProduct}
        />
      </div>
      <PurchaseDetailModal
        updatePurchase={updatePurchase}
        open={detailModal}
        onClose={() => toggleDetailModal(false)}
        purchase={purchase}
      />
    </Dialog>
  )
}
export default SinglePurchaseModal
