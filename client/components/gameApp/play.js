import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import classnames from 'classnames'

import { history } from '../../redux'
import {
  setTimeoutId,
  setSquareToClick,
  addClickedSquareLost,
  addClickedSquareWon,
  setLost,
  setWon,
  deleteTest
} from '../../redux/reducers/gameSettings'

const Play = () => {
  const dispatch = useDispatch()
  const arr = useSelector((s) => s.gameSettings.square)
  const notClickedSquares = useSelector((s) => s.gameSettings.notClickedSquares)
  const timeToClick = useSelector((s) => s.gameSettings.timeToTap)
  const timeoutId = useSelector((s) => s.gameSettings.timeoutId)
  const squareToClick = useSelector((s) => s.gameSettings.squareToClick)
  const wonSquares = useSelector((s) => s.gameSettings.wonSquares)
  const lostSquares = useSelector((s) => s.gameSettings.lostSquares)
  const notEndCheck = wonSquares.length > (arr.length / 2) || lostSquares.length > (arr.length / 2)

  const chooseSquareToClick = () => {
    const index = Math.floor(Math.random() * notClickedSquares.length)
    dispatch(setSquareToClick(notClickedSquares[index]))
    dispatch(deleteTest(index))
  }

  useEffect(() => {
    if (notEndCheck) {
      if (wonSquares.length > (arr.length / 2)) dispatch(setWon())
      else dispatch(setLost())
      history.push('/game/play/result')
    }
    if (!notEndCheck) {
      chooseSquareToClick()
      dispatch(setTimeoutId(setTimeout(() => {
        dispatch(addClickedSquareLost(squareToClick))
      }, timeToClick)))
    }
  }, [wonSquares.length, lostSquares.length])

  const onClick = (e) => {
    if (+e.target.value === squareToClick) {
      clearTimeout(timeoutId)
      dispatch(addClickedSquareWon(squareToClick))
    }
  }

  return (
    <div>
      <div className={`flex flex-wrap w-${20 * Math.sqrt(arr.length)}`}>
        {arr.map((item, index) => (
          <button
            type="submit"
            key={index}
            value={index}
            onClick={onClick}
            className={classnames("w-20 h-20 border-2 border-black m-1", { "bg-yellow-500": index === squareToClick, "bg-green-500": wonSquares.indexOf(index) !== -1, "bg-red-500": lostSquares.indexOf(index) !== -1 })}
          >
            {index}
          </button>
        ))}
      </div>
      <div className="flex flex-col">
        <div className="uppercase bold text-xl">Square to click: {squareToClick}</div>
        <div>Total size: {arr.length}</div>
        <div>Won squares: {wonSquares.length}</div>
        <div>Lost squares: {lostSquares.length}</div>
        <div>Time to click: {timeToClick}ms</div>
      </div>
    </div>
  )
}

Play.propTypes = {}

export default Play
