const shortid = require('shortid')

const ADD_CHANNEL = 'ADD_CHANNEL'

const initialState = [
  {
    channelId: '123mkd231',
    name: 'freaks',
    userIdsList: ['23d2as'],
    messageIdsList: [
      {
        idUser: '23d2as',
        idMessage: '1d23dw1',
        text: 'Hi there guys!',
        time: '15:27',
        meta: {}
      }
    ]
  }
]

// Список каналов

//    Канал
//      Название канала
//        Список айдишников пользователей на канале
//        Список сообщений по айдишникам
//          Сообщение
//            Айди Пользователя
//            Айди Сообщения
//            Текст Сообщения
//            Время сообщения
//            Мета - служебный объект, по умолчанию пустой

export default function(state = initialState, action) {
  switch (action.type) {
    case (ADD_CHANNEL): {
      return [...state, {
        channelId: shortid.generate(),
        name: action.name,
        userIdsList: [action.userId],
        messageIdsList: []
      }]
    }
    default: {
      return [...state]
    }
  }
}

export function addChannel(name, userId) {
  return { type: ADD_CHANNEL, name, userId }
}
