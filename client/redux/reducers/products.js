import axios from 'axios'

const DOWNLOAD_PRODUCTS = 'DOWNLOAD_PRODUCTS'
const SORT_BY_PRICE = 'SORT_BY_PRICE'
const SORT_BY_NAME = 'SORT_BY_NAME'
const UPDATE_PRICES = 'UPDATE_PRICES'

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case DOWNLOAD_PRODUCTS: {
      return [...action.products]
    }
    case SORT_BY_PRICE: {
      return [...state.sort((a, b) => a.price - b.price)]
    }
    case SORT_BY_NAME: {
      return [...state.sort((a, b) => a.title.localeCompare(b.title))]
    }
    case UPDATE_PRICES: {
      return [...state.map((product) => ({ ...product, price: [(product.price * action.multiplier).toFixed(2)] }))]
    }
    default:
      return state
  }
}

export function downloadProducts() {
  return (dispatch) => {
    axios('api/v1/shop/products')
      .then(({ data: products }) => {
        dispatch({ type: DOWNLOAD_PRODUCTS, products })
      })
  }
}

export function sortByPrice() {
  return { type: SORT_BY_PRICE }
}

export function sortByName() {
  return { type: SORT_BY_NAME }
}

export function updatePrices(multiplier) {
  return { type: UPDATE_PRICES, multiplier }
}