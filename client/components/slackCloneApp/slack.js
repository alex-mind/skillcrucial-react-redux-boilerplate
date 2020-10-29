import React from 'react'
import Sidebar from './sidebar'
import MainWindow from './mainWindow'

const Slack = () => {
  return (
    <div className="w-full border shadow bg-white">
      <div className="flex">
        <Sidebar />
        <MainWindow />
      </div>
    </div>
  )
}

Slack.propTypes = {}

export default Slack
