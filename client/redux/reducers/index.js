import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import products from './products'
import currency from './currency'
import cart from './cart'
import gameSettings from './gameSettings'
import gameInput from './gameInput'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    products,
    currency,
    cart,
    gameSettings,
    gameInput
  })

export default createRootReducer
