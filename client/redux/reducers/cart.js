const ADD_PRODUCT = 'ADD_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case (ADD_PRODUCT): {
      return {
        ...state,
        [action.product.id]: state[action.product.id] ? state[action.product.id] + 1 : 1
      }
    }
    case (DELETE_PRODUCT): {
      return {
        ...Object.keys(state).reduce((acc, rec) => {
          if (state[rec] > 1 && rec === action.product.id) {
            return { ...acc, [rec]: state[rec] - 1 }
          }
          if (state[rec] === 1 && rec === action.product.id) {
            return { ...acc }
          }
          return { ...acc, [rec]: state[rec] }
        }, {})
      }
    }
    default: {
      return state
    }
  }
}

export function addToCart(product) {
  return { type: ADD_PRODUCT, product}
}

export function deleteFromCart(product) {
  return { type: DELETE_PRODUCT, product }
}