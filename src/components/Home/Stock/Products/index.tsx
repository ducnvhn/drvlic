import React from 'react'
import {
  gql,
  useLazyQuery
} from '@apollo/client'
import Loading from '../../../../Utils/Loading'
import StockProductToolbar from './Comps/PToolbar'
import ProductsList from './Comps/ProductsList'

const LOAD_STOCK = gql`
  query loadStockProducts($page: Int, $limit: Int, $filter: StockProductFilter) {
    loadStockProducts(page: $page, limit: $limit, filter: $filter) {
      products {
        product {
          _id
          name
          unit
          category
        }
        available
        avgPrice
        refSellPrice
      }
      rowCount
    }
  }
`
const initFilter:Record<string,any> = {
  name: undefined,
  unit: undefined,
  category: undefined
}
const StockProducts = () => {
  const [page, setPage] = React.useState(0)
  const [filter, setFilter] = React.useState(initFilter)
  const limit = 100
  const [loadPrds, { loading, data }] = useLazyQuery(LOAD_STOCK)
  
  React.useEffect(() => {
    const load = async () => loadPrds({
      variables: {
        page,
        limit,
        filter
      }
    })
    load()
  }, [loadPrds, page, limit, filter])

  if (loading) {
    return <Loading />
  }
  if (!loading && data) {
    return (
      <div>
        <StockProductToolbar />
        <ProductsList
          setFilter={setFilter}
          page={page}
          setPage={setPage}
          filter={filter}
          stockInfo={data.loadStockProducts}
        />
      </div>
    )
  }
  return null
}
export default StockProducts
