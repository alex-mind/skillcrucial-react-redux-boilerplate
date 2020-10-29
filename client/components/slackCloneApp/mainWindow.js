import React from 'react'
import { useSelector } from 'react-redux'

import EntryMessage from './entryMessage'
import Chat from './chat'

const MainWindow = () => {
  const selectedName = useSelector((s) => s.selectedChannel.name)
  return (
    <div className="w-full flex flex-col">
      <div className="border-b flex px-6 py-2 items-center">
        <div className="flex flex-col">
        <h3 className="text-gray-900 text-md mb-1 font-extrabold">#{selectedName}</h3>
          <div className="text-gray-500 font-thin text-sm">
            Chit-chatting about ugly HTML and mixing of concerns.
          </div>
        </div>
        <div className="ml-auto hidden md:block">
          <input type="search" placeholder="Search" className="border border-gray-400 rounded-lg p-2" />
        </div>
      </div>

      <Chat />

      <EntryMessage />
    </div>
  )
}

MainWindow.propTypes = {}

export default MainWindow