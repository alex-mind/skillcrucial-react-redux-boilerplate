import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classnames from 'classnames'

import { addChannel } from '../../redux/reducers/channels'
import { setSelected } from '../../redux/reducers/selectedChannel'

const shortid = require('shortid')

const Channels = () => {
  const [value, setValue] = useState('')
  const userId = shortid.generate()
  const dispatch = useDispatch()
  const channels = useSelector((s) => s.channels)
  const selected = useSelector((s) => s.selectedChannel)

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const onClick = () => {
    if (value !== '') dispatch(addChannel(value, userId))
    setValue('')
  }

  return (
    <div className="mb-3">
      <div className="px-4 mb-2 font-sans">
        Channels
        <input className="text-black" type="text" value={value} onChange={onChange} />
        <button type="submit" onClick={onClick}>
          +
        </button>
      </div>
      {channels.map((channel) => {
        return (
          // add 'bg-teal-600' for selecting
          <div
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.target.focus()}
            key={channel.channelId}
            onClick={() => dispatch(setSelected(channel.channelId, channel.name))}
            className={classnames('mb-3 py-1 px-4 text-white font-semi-bold', {
              'bg-teal-600': selected.channelId === channel.channelId
            })}
          >
            <span className="pr-1 text-grey-light">#</span> {channel.name}
          </div>
        )
      })}
      {/* <div className="bg-teal-600 mb-6 py-1 px-4 text-white font-semi-bold ">
        <span className="pr-1 text-grey-light">#</span> general
      </div> */}
    </div>
  )
}

Channels.propTypes = {}

export default Channels
