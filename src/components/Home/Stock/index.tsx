import React from 'react'
import {
  Route,
  // Link
} from 'react-router-dom'
import Purchase from './Import'
import StockProducts from './Products'
import Transfer from './Transfer'

const Stock = () => {
  return (
    <div>
      <Route path="/stock" exact component={StockProducts} />
      <Route path="/stock/purchases" exact component={Purchase} />
      <Route path="/stock/transfer" exact component={Transfer} />
    </div>
  )
}
export default Stock