const SET_SQUARE = 'SET_SQUARE'
const SET_TIMEOUT = 'SET_TIMEOUT'
const SET_SQUARE_TO_CLICK = 'SET_SQUARE_TO_CLICK'
const SET_LOST = 'SET_LOST'
const SET_WON = 'SET_WON'
const ADD_CLICKED_SQUARE_WON = 'ADD_CLICKED_SQUARE_WON'
const ADD_CLICKED_SQUARE_LOST = 'ADD_CLICKED_SQUARE_LOST'
const DELETE_TEST = 'DELETE_TEST'

const initialState = {
  square: [],
  timeToTap: 1000,
  timeoutId: 0,
  notClickedSquares: [],
  lostSquares: [],
  wonSquares: [],
  squareToClick: -1,
  lost: false,
  won: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case (SET_SQUARE): {
      return {
        ...initialState, square: action.arr, notClickedSquares: action.arr
      }
    }
    case (SET_TIMEOUT): {
      return {
        ...state, timeoutId: action.id
      }
    }
    case (SET_SQUARE_TO_CLICK): {
      return {
        ...state,
        squareToClick: action.index
      }
    }
    case (DELETE_TEST): {
      return {
        ...state,
        notClickedSquares: [
          ...state.notClickedSquares.slice(0, action.index),
          ...state.notClickedSquares.slice(action.index + 1)
        ]
      }
    }
    case (SET_LOST): {
      return {
        ...state, lost: true
      }
    }
    case (SET_WON): {
      return {
        ...state, won: true
      }
    }
    case (ADD_CLICKED_SQUARE_WON): {
      return {
        ...state,
        wonSquares: [...state.wonSquares, state.square[action.index]]
      }
    }
    case (ADD_CLICKED_SQUARE_LOST): {
      return {
        ...state,
        lostSquares: [...state.lostSquares, state.square[action.index]]
      }
    }
    default: {
      return state
    }
  }
}

export function setSquare(arr) {
  return { type: SET_SQUARE, arr }
}

export function setTimeoutId(id) {
  return { type: SET_TIMEOUT, id }
}

export function addClickedSquareWon(index) {
  return { type: ADD_CLICKED_SQUARE_WON, index }
}

export function addClickedSquareLost(index) {
  return { type: ADD_CLICKED_SQUARE_LOST, index }
}

export function setSquareToClick(index) {
  return { type: SET_SQUARE_TO_CLICK, index }
}

export function setLost() {
  return { type: SET_LOST }
}

export function setWon() {
  return { type: SET_WON }
}

export function deleteTest(index) {
  return { type: DELETE_TEST, index }
}