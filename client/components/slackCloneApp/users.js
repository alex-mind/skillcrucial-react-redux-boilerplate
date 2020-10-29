import React from 'react'

const Users = () => {
  return (
    <div>
      <div className="px-4 mb-3 font-sans">Direct Messages</div>

      <div className="flex items-center mb-3 px-4">
        <span className="bg-green-400 rounded-full block w-2 h-2 mr-2" />
        <span className="text-purple-100">
          Olivia Dunham <i className="text-gray-500 text-sm">(me)</i>
        </span>
      </div>

      <div className="flex items-center mb-3 px-4">
        <span className="bg-green-400 rounded-full block w-2 h-2 mr-2" />
        <span className="text-purple-100">Adam Bishop</span>
      </div>

      <div className="flex items-center px-4 mb-6">
        <span className="border rounded-full block w-2 h-2 mr-2" />
        <span className="text-purple-100">killgt</span>
      </div>
    </div>
  )
}

Users.propTypes = {}

export default Users