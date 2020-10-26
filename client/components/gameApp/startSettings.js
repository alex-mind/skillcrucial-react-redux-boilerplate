import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateSize } from '../../redux/reducers/gameInput'
import { setSquare } from '../../redux/reducers/gameSettings'
import { history } from '../../redux'

const StartSettings = () => {
  const dispatch = useDispatch()
  const finalSize = useSelector((s) => +s.gameInput)

  const onChange = (e) => {
    const text = e.target.value
    const size = !Number.isNaN(+text) && +text < 11 ? text : ''
    e.target.value = size
    dispatch(updateSize(size))
  }

  const onClick = () => {
    const arr = new Array(finalSize * finalSize).fill(0).map((item, index) => index)
    dispatch(setSquare(arr))
    history.push(`/game/play`)
  }

  return (
    <div>
      Enter square size: <input type="text" className="border-2 border-black" onChange={onChange}/>
      <button type="submit" className="border-2 border-blue-500" onClick={onClick}>
        Start
      </button>
    </div>
  )
}

StartSettings.propTypes = {}

export default StartSettings