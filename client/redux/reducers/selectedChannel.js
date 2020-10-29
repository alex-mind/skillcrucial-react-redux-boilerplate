const SET_SELECTED = 'SET_SELECTED'

const initialState = {
  channelId: '',
  name: ''
}

export default function(state = initialState, action) {
  switch (action.type) {
    case (SET_SELECTED): {
      return {
        channelId: action.id,
        name: action.name
      }
    }
    default: {
      return state
    }
  }
}

export function setSelected(id, name) {
  return { type: SET_SELECTED, id, name }
}