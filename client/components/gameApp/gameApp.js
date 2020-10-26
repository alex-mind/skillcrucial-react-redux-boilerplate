import React from 'react'
import { Route } from 'react-router-dom'
import StartSettings from './startSettings'
import Play from './play'
import FinalScreen from './finalScreen'

const Game = () => {
  return (
    <div>
      <Route exact path="/game" component={() => <StartSettings />} />
      <Route exact path="/game/play" component={() => <Play />} />
      <Route exact path="/game/play/result" component={() => <FinalScreen />} />
    </div>
  )
}

Game.propTypes = {}

export default Game