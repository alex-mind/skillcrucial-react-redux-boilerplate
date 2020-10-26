import React from 'react'
import { useSelector } from 'react-redux'
import { history } from '../../redux'

const FinalScreen = () => {
  const state = useSelector((s) => s.gameSettings.won)
  return <div>
    {state ? <div>You won!</div> : <div>You lost!</div>}
    <button type="submit" onClick={() => history.push('/game')}>Play again</button>
  </div>
}

FinalScreen.propTypes = {}

export default FinalScreen