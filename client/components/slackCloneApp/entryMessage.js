import React from 'react'

const EntryMessage = () => {
  return (
    <div className="flex m-6 rounded-lg border-2 border-gray-400 overflow-hidden">
      <span className="text-3xl text-gray-400 px-3 border-r-2 border-gray-400">+</span>
      <input type="text" className="w-full px-4" placeholder="Message to #general" />
    </div>
  )
}

EntryMessage.propTypes = {}

export default EntryMessage