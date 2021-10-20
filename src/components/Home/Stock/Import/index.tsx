import React from 'react'
import StockToolbar from './Comps/StockToolbar'
import {
  gql,
  useLazyQuery,
  useMutation,
} from '@apollo/client'
// self made components
import SinglePurchaseModal from './Comps/SinglePurchaseModal'
// import TabPanel from './Comps/TabPanel'
import PurchaseList from './Comps/PurchaseList'
// import { CircularProgress } from '@material-ui/core'
import Loading from '../../../../Utils/Loading'
import moment from 'moment'
import CreatePurchaseModal from './Comps/CreatePurchaseModal'

const CREATE_PURCHASE = gql`
  mutation createPurchase ($purchase: CreatePurchaseInput) {
    createPurchase (purchase: $purchase) {
      _id
      products {
        product
        quantity
        buyPrice
      }
      createdBy
      invoice
      trace
      vendor
      note
      created
      invoiceDate
    }
  }
`
export const LOAD_PURCHASES = gql`
  query loadPurchases($filter: PurchaseFilter, $pagination: Pagination) {
    loadPurchases (filter: $filter, pagination: $pagination) {
      rowCount
      purchases {
        _id
        products {
          product
          quantity
          buyPrice
        }
        createdBy
        invoice
        note
        trace
        created
        vendor
        invoiceDate
      }
    }
  }
`
export const LOAD_SINGLE_PURCHASE = gql`
  query loadSinglePurchase ($purchase: String!) {
    loadSinglePurchase (purchase: $purchase) {
      _id
      products {
        product {
          _id
          name
          unit
          category
        }
        quantity
        buyPrice
      }
      createdBy
      invoice
      trace
      vendor
      note
      created
      invoiceDate
    }
  }
`
const UPDATE_PURCHASE = gql`
  mutation updatePurchaseInfo($purchase: String, $update: CreatePurchaseInput) {
    updatePurchaseInfo(purchase: $purchase, update: $update) {
      _id
      createdBy
      invoice
      trace
      vendor
      note
      created
      invoiceDate
    }
  }
`
const REMOVE_PRODUCT_FROM_PURCHASE = gql`
  mutation removePrdFromPurchase($purchase: String!, $product: String!, $quantity: Int!, $buyPrice: Float) {
    removePrdFromPurchase(purchase: $purchase, product: $product, quantity: $quantity, buyPrice: $buyPrice) {
      _id
      products {
        product {
          _id
          name
          unit
          category
        }
        quantity
        buyPrice
      }
      createdBy
      invoice
      trace
      vendor
      note
      created
      invoiceDate
    }
  }
`
const ADD_PRODUCT_TO_PURCHASE = gql`
  mutation addProductToPurchase($purchase: String!, $product: String!, $quantity: Int!, $buyPrice: Float) {
    addProductToPurchase(purchase: $purchase, product: $product, quantity: $quantity, buyPrice: $buyPrice) {
      _id
      products {
        product {
          _id
          name
          unit
          category
        }
        quantity
        buyPrice
      }
      createdBy
      invoice
      trace
      vendor
      note
      created
      invoiceDate
    }
  }
`
const defaultFilter: Record<string,any> = {
  vendor: undefined,
  note: undefined,
  invoice: undefined,
  trace: undefined,
  start: moment().startOf('month').toDate(),
  end: moment().toDate()
}
const DELETE_PURCHASE = gql`
  mutation deletePurchase($purchase: String!) {
    deletePurchase(purchase: $purchase)
  }
`
export type PurchaseInput = {
  invoice?: string
  trace?: string
  note?: string
  vendor?: string
  invoiceDate?: string
}
const Stock = () => {
  const limit = 100
  // grapql queries and mutations
  const [createPurchase, { loading: creating }] = useMutation(CREATE_PURCHASE)
  const [addPrd] = useMutation(ADD_PRODUCT_TO_PURCHASE)
  const [removePrd] = useMutation(REMOVE_PRODUCT_FROM_PURCHASE)
  const [loadPurchases, {
    loading: loadingPurchase,
    data: purchasesData,
    // refetch
  }] = useLazyQuery(LOAD_PURCHASES)
  const [loadSinglePurchase, { loading: loadingSinglePC, data: singlePCData }] = useLazyQuery(LOAD_SINGLE_PURCHASE)
  const [deletePurchase] = useMutation(DELETE_PURCHASE)
  const [updateSinglePurchase] = useMutation(UPDATE_PURCHASE)
  // state values
  const [currentPC, setCurrentPC] = React.useState<string | undefined>()
  const [purchaseModal, togglePurchaseModal] = React.useState(false)
  const [filter, setFilter] = React.useState(defaultFilter)
  const [ppage, setPpage] = React.useState(0)
  const [createPCModal, toggleCreatePDModal] = React.useState(false)
  // all function
  // console.log(filter)

  React.useEffect(() => {
    const loadP = async () => await loadPurchases({
      variables: {
        filter,
        pagination: {
          page: ppage,
          limit
        }
      }
    })
    loadP()
  }, [ppage, limit, loadPurchases, filter])

  const onDateChange = (key: string, value: any) => {
    const newFilter = { ...filter }
    newFilter[key] = value
    setFilter(newFilter)
  }

  const createPC = async (purchase: PurchaseInput) => {
    await createPurchase({
      variables: {
        purchase
      },
      update: (cache: any, { data }: any) => {
        const oldData = cache.readQuery({
          query: LOAD_PURCHASES,
          variables: {
            filter: filter,
            pagination: {
              page: ppage,
              limit
            }
          }
        })
        cache.writeQuery({
          query: LOAD_PURCHASES,
          variables: {
            filter: filter,
            pagination: {
              page: ppage,
              limit
            }
          },
          data: {
            ...oldData,
            loadPurchases: {
              ...oldData.loadPurchases,
              purchases: [data.createPurchase, ...oldData.loadPurchases.purchases]
            }
          }
        })
        console.log(data.createPurchase._id)
        openPurchaseScreen(data.createPurchase._id)
      }
    })
    // refetch!()
    // console.log(purchase)
  }

  const openPurchaseScreen = async (purchase: string) => {
    setCurrentPC(purchase)
    togglePurchaseModal(true)
    loadSinglePurchase({
      variables: {
        purchase
      }
    })
  }

  const updatePurchase = async (purchase: string, update: any) => {
    await updateSinglePurchase({
      variables: {
        purchase,
        update: update
      },
      update: (cache, { data }) => {
        const oldData:any = cache.readQuery({
          query: LOAD_SINGLE_PURCHASE,
          variables: {
            purchase
          }
        })

        cache.writeQuery({
          query: LOAD_SINGLE_PURCHASE,
          variables: {
            purchase
          },
          data: {
            ...oldData,
            loadSinglePurchase: {
              ...oldData.loadSinglePurchase,
              ...data.updatePurchaseInfo
            }
          }
        })
        const oldPurchases:any = cache.readQuery({
          query: LOAD_PURCHASES,
          variables: {
            filter,
            pagination: {
              page: ppage,
              limit
            }
          }
        })
        console.log(oldPurchases)
        cache.writeQuery({
          query: LOAD_PURCHASES,
          variables: {
            filter,
            pagination: {
              page: ppage,
              limit
            }
          },
          data: {
            ...oldPurchases,
            loadPurchases: {
              ...oldPurchases.loadPurchases,
              purchases: oldPurchases.loadPurchases.purchases.map((p:any) => {
                if (p._id === data.updatePurchaseInfo._id) {
                  return data.updatePurchaseInfo
                }
                return p
              })
            }
          }
        })
      }
    })
  }

  const addProduct = async (purchase: string, product: string, quantity: number, buyPrice: number) => {
    await addPrd({
      variables: {
        purchase,
        product,
        quantity,
        buyPrice
      },
      update: (cache, { data }) => {
        const oldData: any = cache.readQuery({
          query: LOAD_SINGLE_PURCHASE,
          variables: { purchase }
        })
        cache.writeQuery({
          query: LOAD_SINGLE_PURCHASE,
          variables: { purchase },
          data: {
            ...oldData,
            loadSinglePurchase: data.addProductToPurchase
          }
        })
        const { products } = data.addProductToPurchase
        const updatedPrd = products.map((p: any) => ({
          product: p.product._id,
          buyPrice: p.buyPrice,
          quantity: p.quantity,
          __typename: "ProductsOfPurchase"
        }))
        const oldPurchases: any = cache.readQuery({
          query: LOAD_PURCHASES,
          variables: {
            filter,
            pagination: {
              page: ppage,
              limit
            }
          }
        })
        cache.writeQuery({
          query: LOAD_PURCHASES,
          variables: {
            filter,
            pagination: {
              page: ppage,
              limit
            }
          },
          data: {
            ...oldPurchases,
            loadPurchases: {
              ...oldPurchases.loadPurchases,
              purchases: oldPurchases.loadPurchases.purchases.map((p: any) => {
                if (p._id === purchase) {
                  return {
                    ...p,
                    products: updatedPrd
                  }
                }
                return p
              })
            }
          }
        })
      }
    })
    // refetch!()
  }

  const removeProduct = async (purchase: string, product: string, quantity: number, buyPrice: number) => {
    await removePrd({
      variables: {
        purchase,
        product,
        quantity,
        buyPrice
      },
      update: (cache, { data }) => {
        const oldData: any = cache.readQuery({
          query: LOAD_SINGLE_PURCHASE,
          variables: { purchase }
        })
        cache.writeQuery({
          query: LOAD_SINGLE_PURCHASE,
          variables: { purchase },
          data: {
            ...oldData,
            loadSinglePurchase: data.removePrdFromPurchase
          }
        })
        const { products } = data.removePrdFromPurchase
        const updatedPrd = products.map((p: any) => ({
          product: p.product._id,
          buyPrice: p.buyPrice,
          quantity: p.quantity,
          __typename: "ProductsOfPurchase"
        }))
        const oldPurchases: any = cache.readQuery({
          query: LOAD_PURCHASES,
          variables: {
            filter,
            pagination: {
              page: ppage,
              limit
            }
          }
        })
        cache.writeQuery({
          query: LOAD_PURCHASES,
          variables: {
            filter,
            pagination: {
              page: ppage,
              limit
            }
          },
          data: {
            ...oldPurchases,
            loadPurchases: {
              ...oldPurchases.loadPurchases,
              purchases: oldPurchases.loadPurchases.purchases.map((p: any) => {
                if (p._id === purchase) {
                  return {
                    ...p,
                    products: updatedPrd
                  }
                }
                return p
              })
            }
          }
        })
      }
    })
  }

  const delPurchase = async (purchase: string) =>{
    await deletePurchase({
      variables: {
        purchase
      },
      update: (cache, { data }) => {
        const oldData: any = cache.readQuery({
          query: LOAD_PURCHASES,
          variables: {
            filter,
            pagination: {
              page: ppage,
              limit
            }
          }
        })
        cache.writeQuery({
          query: LOAD_PURCHASES,
          variables: {
            filter,
            pagination: {
              page: ppage,
              limit
            }
          },
          data: {
            ...oldData,
            loadPurchases: {
              ...oldData.loadPurchases,
              purchases: oldData.loadPurchases.purchases.filter((p: any) => p._id !== data.deletePurchase)
            }
          }
        })
      }
    })
  }

  if (loadingPurchase) {
    return <Loading />
  }
  if (purchasesData) {
    return (
      <div>
        <StockToolbar
          // createPurchase={createPC}
          // creating={creating}
          buttonLabel="Nhập hàng"
          onDateChange={onDateChange}
          filter={filter}
          action={() => toggleCreatePDModal(true)}
          />
        <div>
          <PurchaseList
            loadingSingle={loadingSinglePC}
            currentPurchase={currentPC}
            loadPurchase={openPurchaseScreen}
            page={ppage}
            setPage={setPpage}
            filter={filter}
            setFilter={setFilter}
            purchases={purchasesData.loadPurchases}
            rows={purchasesData.loadPurchases.rowCount}
            loading={loadingPurchase}
          />
        </div>
        {(singlePCData!==undefined) && (
          <SinglePurchaseModal
            deletePurchase={delPurchase}
            updatePurchase={updatePurchase}
            purchase={singlePCData.loadSinglePurchase!}
            open={purchaseModal}
            onClose={async () => {
              // console.log('need to close modal now and reload data')
              setCurrentPC(undefined)
              togglePurchaseModal(false)
              // await loadPurchases({
              //   variables: {
              //     filter,
              //     pagination: {
              //       page: ppage,
              //       limit: 101
              //     }
              //   }
              // })
            }}
            addProduct={addProduct}
            removeProduct={removeProduct}
          />
        )}
        <CreatePurchaseModal
          createPurchase={createPC}
          creating={creating}
          open={createPCModal}
          onClose={() => toggleCreatePDModal(false)}
          onCreate={() => toggleCreatePDModal(false)}
        />
      </div>
    )
  }
  return null
}
export default Stock