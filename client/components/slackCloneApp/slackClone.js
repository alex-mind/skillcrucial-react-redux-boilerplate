import React from 'react'
import { Route } from 'react-router-dom'
import Slack from './slack'

const SlackClone = () => {
  return (
    <div>
      <Route exact path="/slack" component={() => <Slack />} />
    </div>
  )
}

SlackClone.propTypes = {}

export default SlackClone