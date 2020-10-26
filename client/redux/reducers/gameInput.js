const UPDATE_SIZE = 'UPDATE_SIZE'

const initialState = ''

export default function(state = initialState, action) {
  switch (action.type) {
    case (UPDATE_SIZE): {
      return action.size
    }
    default: {
      return state
    }
  }
}

export function updateSize(size) {
  return { type: UPDATE_SIZE, size }
}
