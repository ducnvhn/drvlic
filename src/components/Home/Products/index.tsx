import React from 'react'
import ProductsList from './comps/PrdsList'



export interface PFilter {
  items: {
    columnField: string
    id: string
    operatorValue: 'contains',
    value: string

  }[]
  linkOperator: 'and'
}


const initFilter: Record<string, any> = {
  name: undefined,
  code: undefined,
  unit: undefined,
  category: undefined
}
const Products = () => {
  const [filter, setFilter] = React.useState<Record<string, any>>(initFilter)
  return (
    <div>
      <ProductsList
        loadFilter={filter}
        setLoadFiter={setFilter}
      />
    </div>
  )
}
export default Products