import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import products from './products'
import currency from './currency'
import cart from './cart'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    products,
    currency,
    cart
  })

export default createRootReducer
