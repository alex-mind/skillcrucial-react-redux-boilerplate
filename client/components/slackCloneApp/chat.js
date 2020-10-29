import React from 'react'
import { useSelector } from 'react-redux'

const Chat = () => {
  const selected = useSelector((s) => s.selectedChannel)
  const channel = useSelector((s) =>
    s.channels.reduce((acc, rec) => {
      if (rec.channelId === selected.channelId) return { ...rec }
      return acc
    }, {})
  )

  return (
    <div className="px-6 py-4 flex-1 overflow-scroll-x">
      {/* <div className="flex items-start mb-4">
        <img
          src="https://avatars2.githubusercontent.com/u/343407?s=460&v=4"
          alt="something here"
          className="w-10 h-10 rounded mr-3"
        />
        <div className="flex flex-col">
          <div className="flex items-end">
            <span className="font-bold text-md mr-2 font-sans">killgt</span>
            <span className="text-gray-400 text-xs font-light">11:46</span>
          </div>
          <p className="font-light text-md text-gray-900 pt-1">
            The slack from the other side.
          </p>
        </div>
      </div>

      <div className="flex items-start mb-4">
        <img
          src="https://i.imgur.com/8Km9tLL.jpg"
          alt="something here"
          className="w-10 h-10 rounded mr-3"
        />
        <div className="flex flex-col">
          <div className="flex items-end">
            <span className="font-bold text-md mr-2 font-sans">Olivia Dunham</span>
            <span className="text-gray-400 text-xs font-light">12:45</span>
          </div>
          <p className="font-light text-md text-gray-900 pt-1">
            How are we supposed to control the marquee space without an utility for it? I propose
            this:
          </p>
          <div className="bg-gray-200 border border-gray-300 font-mono rounded p-3 mt-2 whitespace-pre">
            <p>{'.marquee-lightspeed { -webkit-marquee-speed: fast; }'}</p>
            <p>{'.marquee-lightspeeder { -webkit-marquee-speed: faster;}'}</p>
          </div>
        </div>
      </div>

      <div className="flex items-start">
        <img
          src="https://i.imgur.com/qACoKgY.jpg"
          alt="something here"
          className="w-10 h-10 rounded mr-3"
        />
        <div className="flex flex-col">
          <div className="flex items-end">
            <span className="font-bold text-md mr-2 font-sans">Adam Bishop</span>
            <span className="text-gray-400 text-xs font-light">12:46</span>
          </div>
          <p className="font-light text-md text-gray-900 pt-1">
            <a href="#" className="text-blue-400">
              @Olivia Dunham
            </a>{' '}
            the size of the generated CSS is creating a singularity in space/time, we must stop
            adding more utilities before it is too late!
          </p>
        </div>
      </div> */}
      {channel.messageIdsList
        ? channel.messageIdsList.map((message) => {
            return (
              <div key={message.idMessage} className="flex items-start">
                <img
                  src="https://i.imgur.com/qACoKgY.jpg"
                  alt="something here"
                  className="w-10 h-10 rounded mr-3"
                />
                <div className="flex flex-col">
                  <div className="flex items-end">
                    <span className="font-bold text-md mr-2 font-sans">{message.idUser}</span>
                    <span className="text-gray-400 text-xs font-light">{message.time}</span>
                  </div>
                  <p className="font-light text-md text-gray-900 pt-1">
                    <a href="#" className="text-blue-400">
                      @Olivia Dunham
                    </a>{' '}
                    {message.text}
                  </p>
                </div>
              </div>
            )
          })
        : ''}

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  )
}

Chat.propTypes = {}

export default Chat