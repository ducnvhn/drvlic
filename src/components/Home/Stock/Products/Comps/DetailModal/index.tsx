import React from 'react'
import {
  Dialog,
  DialogContent,
  Toolbar,
  DialogTitle,
  IconButton,
  Typography,
  Button,
  CircularProgress,
  Grid
} from '@material-ui/core'
import {
  makeStyles
} from '@material-ui/styles'
import { Close } from '@material-ui/icons'
import {
  gql,
  useLazyQuery
} from '@apollo/client'
import Loading from '../../../../../../Utils/Loading'
import PrdInfo from './PrdInfo'
import PurchaseHis from './ProductPurchaseHis'

const LOAD_STOCK_PRODUCT = gql`
  query productStockDetails($product: String!) {
    productStockDetails(product: $product) {
      product {
        name
        unit
        category
        code
      }
      available
      avgPrice
      refSellPrice
      createdBy
      purchases {
        _id
        invoice
        buyPrice
        note
        trace
        vendor
        quantity
        invoiceDate
      }
    }
  }
`

const useStyle = makeStyles({
  root: {
    background: '#ccc'
  },
  toolbar: {
    display: 'flex',
    '& .title': {
      flexGrow: 1
    }
  },
  history: {
    marginTop: '1em'
  }
})

type CompProps = {
  product: string | undefined
  open: boolean
  onClose: () => void
}

const ProductModal: React.FC<CompProps> = ({
  open,
  onClose,
  product
}) => {
  const cls = useStyle()
  const [loadPrd, { loading, data }] = useLazyQuery(LOAD_STOCK_PRODUCT, { fetchPolicy: 'network-only'})
  React.useEffect(() => {
    const load = async () => loadPrd({
      variables: {
        product
      }
    })
    if (product) {
      load()
    }
  }, [product, loadPrd])
  return (
    <Dialog
      className={cls.root}
      fullScreen
      open={open}
      onClose={onClose}
    >
      <DialogTitle>
        <Toolbar className={cls.toolbar}>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
          <Typography className="title">
            {(!data) ? <CircularProgress size={15} /> : `${data.productStockDetails.product.name}`}
          </Typography>
          <Button onClick={onClose} variant="outlined" color="primary">
            Đóng
          </Button>
        </Toolbar>
      </DialogTitle>
      <DialogContent>
        {loading &&
        (
          <Loading />
        )}
        {!loading && data && (
          <div>
            <PrdInfo product={data.productStockDetails} />
            <Grid spacing={1} container direction="row" className={cls.history}>
              <Grid item xs={12} md={6}>
                <PurchaseHis
                  purchases={data.productStockDetails.purchases}
                />
              </Grid>
              <Grid item xs={12} md={6}>export</Grid>
            </Grid>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
export default ProductModal
