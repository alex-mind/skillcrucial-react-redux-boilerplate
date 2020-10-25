const UPDATE_CURRENCY = 'UPDATE_CURRENCY'

const initialState = 'EUR'

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CURRENCY: {
      return action.currency
    }
    default:
      return state
  }
}

export function updateCurrency(currency) {
  return { type: UPDATE_CURRENCY, currency }
}