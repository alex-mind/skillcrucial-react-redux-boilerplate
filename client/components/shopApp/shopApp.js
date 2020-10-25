import React from 'react'
import { Route } from 'react-router-dom'
import Shopping from './shopping'
import Basket from './basket'
import Logs from './logs'

const ShopApp = () => {
  return (
    <div>
      <Route exact path="/shop" component={() => <Shopping />} />
      <Route exact path="/shop/basket" component={() => <Basket />} />
      <Route exact path="/shop/logs" component={() => <Logs />} />
    </div>
  )
}

ShopApp.propTypes = {}

export default ShopApp