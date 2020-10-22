import express from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import sockjs from 'sockjs'
import { renderToStaticNodeStream } from 'react-dom/server'
import React from 'react'
import axios from 'axios'

import cookieParser from 'cookie-parser'
import config from './config'
import Html from '../client/html'

const shortid = require('shortid')

const Root = () => ''
const { writeFile, readFile, stat, unlink, readdir } = require('fs').promises

try {
  // eslint-disable-next-line import/no-unresolved
  // ;(async () => {
  //   const items = await import('../dist/assets/js/root.bundle')
  //   console.log(JSON.stringify(items))

  //   Root = (props) => <items.Root {...props} />
  //   console.log(JSON.stringify(items.Root))
  // })()
  console.log(Root)
} catch (ex) {
  console.log(' run yarn build:prod to enable ssr')
}

const writeUsersToFile = (text, file) => {
  writeFile(`${__dirname}/${file}`, text, { encoding: 'utf8' })
}

const readUsersFromFile = (file) => {
  return readFile(`${__dirname}/${file}`, { encoding: 'utf8' })
}

let connections = []

const port = process.env.PORT || 8090
const server = express()

const middleware = [
  cors(),
  express.static(path.resolve(__dirname, '../dist/assets')),
  bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  bodyParser.json({ limit: '50mb', extended: true }),
  cookieParser()
]

middleware.forEach((it) => server.use(it))

server.use((req, res, next) => {
  res.set('x-skillcrucial-user', 'f74f5c1b-b85f-4391-a411-40c557349987')
  res.set('Access-Control-Expose-Headers', 'X-SKILLCRUCIAL-USER')
  next()
})

server.get('/api/v1/users/', (req, res) => {
  const file = 'users.json'
  stat(`${__dirname}/${file}`)
    .then(() => {
      readUsersFromFile(file).then((users) => res.send(JSON.parse(users)))
    })
    .catch(async () => {
      const { data: users } = await axios('https://jsonplaceholder.typicode.com/users')
      writeUsersToFile(JSON.stringify(users), file)
      readUsersFromFile(file).then((text) => res.send(JSON.parse(text)))
    })
})

server.post('/api/v1/users/', (req, res) => {
  readUsersFromFile('users.json')
    .then((users) => {
      let usersParsed = JSON.parse(users)
      const lastId = usersParsed[usersParsed.length - 1].id
      req.body = { id: lastId + 1, ...req.body }
      usersParsed = [...usersParsed, req.body]
      writeUsersToFile(JSON.stringify(usersParsed), 'users.json')
      res.json({ status: 'success', id: req.body.id })
    })
    .catch(() => res.json({ status: 'failure' }))
})

server.patch('/api/v1/users/:userId', (req, res) => {
  readUsersFromFile('users.json')
    .then((users) => {
      const usersParsed = JSON.parse(users)
      const { userId } = req.params
      if (+userId > usersParsed.length && +userId < usersParsed.length) throw new Error('wrong id')
      let counter
      for (counter = 0; counter <= usersParsed.length; counter += 1) {
        if (usersParsed[counter].id === +userId) break
        if (usersParsed[counter].id > +userId) throw new Error('wrong id')
      }
      if (counter === usersParsed.length) throw new Error('wrong id')
      usersParsed[counter] = { ...usersParsed[counter], ...req.body }
      writeUsersToFile(JSON.stringify(usersParsed), 'users.json')
      res.json({ status: 'success', id: +userId })
    })
    .catch(() => res.json({ status: 'failure' }))
})

server.delete('/api/v1/users/:userId', (req, res) => {
  readUsersFromFile('users.json')
    .then((users) => {
      let usersParsed = JSON.parse(users)
      const { userId } = req.params
      if (+userId > usersParsed.length && +userId < usersParsed.length) throw new Error('wrong id')
      let counter
      for (counter = 0; counter <= usersParsed.length; counter += 1) {
        if (usersParsed[counter].id === +userId) break
        if (usersParsed[counter].id > +userId) throw new Error('wrong id')
      }
      if (counter === usersParsed.length) throw new Error('wrong id')
      usersParsed = [...usersParsed.slice(0, counter), ...usersParsed.slice(counter + 1)]
      writeUsersToFile(JSON.stringify(usersParsed), 'users.json')
      res.json({ status: 'success', id: +userId })
    })
    .catch(() => res.json({ status: 'failure' }))
})

server.delete('/api/v1/users/', (req, res) => {
  const file = 'users.json'
  stat(`${__dirname}/${file}`)
    .then(() => {
      unlink(`${__dirname}/${file}`)
      res.json({ status: 'ok' })
    })
    .catch(async () => {
      res.json({ status: 'failure' })
    })
})

server.get('/api/v1/users/:number', async (req, res) => {
  const { number } = req.params
  const { data: users } = await axios('https://jsonplaceholder.typicode.com/users')
  res.json(users.slice(0, +number))
})

server.get('/api/v1/tasks/:category', (req, res) => {
  const { category } = req.params
  readFile(`${__dirname}/../tasks/${category}.json`)
    .then((tasks) => {
      const allTasks = JSON.parse(tasks).map((task) => {
        return Object.keys(task).reduce((acc, rec) => {
          /* eslint-disable no-underscore-dangle */
          if (rec.includes('_') && !task._isDeleted) return acc
          /* eslint-disable no-underscore-dangle */
          if (task._isDeleted) return { ...acc, [rec]: task[rec] }

          return { ...acc, [rec]: task[rec] }
        }, {})
      })
      res.json(allTasks)
    })
    .catch(() => {
      res.json({ status: `category not found` })
    })
})

const DAY_TIMESTAMP = 1000 * 60 * 60 * 24
const WEEK_TIMESTAMP = 7 * 1000 * 60 * 60 * 24
const MONTH_TIMESTAMP = 30 * 1000 * 60 * 60 * 24

server.get('/api/v1/tasks/:category/:timespan', (req, res) => {
  const { category } = req.params
  let { timespan } = req.params

  switch (timespan) {
    case 'day':
      timespan = DAY_TIMESTAMP
      break
    case 'week':
      timespan = WEEK_TIMESTAMP
      break
    case 'month':
      timespan = MONTH_TIMESTAMP
      break
    default:
      timespan = 0
  }

  readFile(`${__dirname}/../tasks/${category}.json`)
    .then((tasks) => {
      const allTasks = JSON.parse(tasks)
        .filter((task) => {
          /* eslint-disable no-underscore-dangle */
          return timespan + task._createdAt > +new Date()
        })
        .map((task) => {
          return Object.keys(task).reduce((acc, rec) => {
            /* eslint-disable no-underscore-dangle */
            if (rec.includes('_') && !task._isDeleted) return acc
            /* eslint-disable no-underscore-dangle */
            if (task._isDeleted) return { ...acc, [rec]: task[rec] }
            return { ...acc, [rec]: task[rec] }
          }, {})
        })
      res.json(allTasks)
    })
    .catch(() => {
      res.json({ status: `some problem occured` })
    })
})

server.post('/api/v1/tasks/:category', (req, res) => {
  const { category } = req.params

  readFile(`${__dirname}/../tasks/${category}.json`, { encoding: 'utf8' })
    .then((tasks) => {
      const addedTask = [
        ...JSON.parse(tasks),
        {
          taskId: shortid.generate(),
          title: req.body.title,
          status: 'new',
          _isDeleted: false,
          _createdAt: +new Date(),
          _deletedAt: null
        }
      ]
      writeFile(`${__dirname}/../tasks/${category}.json`, JSON.stringify(addedTask), {
        encoding: 'utf8'
      })
      res.json({ status: 'task is added' })
    })
    .catch(() => {
      const tasks = [
        {
          taskId: shortid.generate(),
          title: req.body.title,
          status: 'new',
          _isDeleted: false,
          _createdAt: +new Date(),
          _deletedAt: null
        }
      ]
      writeFile(`${__dirname}/../tasks/${category}.json`, JSON.stringify(tasks), {
        encoding: 'utf8'
      })
      res.json({ status: 'category created, task added' })
    })
})

server.patch('/api/v1/tasks/:category/:id', (req, res) => {
  const { category, id } = req.params

  readFile(`${__dirname}/../tasks/${category}.json`, { encoding: 'utf8' })
    .then((tasks) => {
      const updatedTasks = JSON.parse(tasks)
      let i = 0
      for (i = 0; i <= updatedTasks.length; i += 1) {
        if (updatedTasks[i].taskId === id) {
          updatedTasks[i] = { ...updatedTasks[i], title: req.body.title, status: req.body.status }
          break
        }
      }
      if (i === updatedTasks.length) throw new Error('wrong id')
      writeFile(`${__dirname}/../tasks/${category}.json`, JSON.stringify(updatedTasks), {
        encoding: 'utf8'
      })
      res.json({ status: 'OK' })
    })
    .catch(() => {
      res.json({ status: 'error', message: 'incorrect status' })
    })
})

server.delete('/api/v1/tasks/:category/:id', (req, res) => {
  const { category, id } = req.params

  readFile(`${__dirname}/../tasks/${category}.json`, { encoding: 'utf8' })
    .then((tasks) => {
      const updatedTasks = JSON.parse(tasks)
      let i = 0
      for (i = 0; i <= updatedTasks.length; i += 1) {
        if (updatedTasks[i].taskId === id) {
          updatedTasks[i] = { ...updatedTasks[i], _isDeleted: true, _deletedAt: +new Date() }
          break
        }
      }
      if (i === updatedTasks.length) throw new Error('wrong id')
      writeFile(`${__dirname}/../tasks/${category}.json`, JSON.stringify(updatedTasks), {
        encoding: 'utf8'
      })
      res.json({ status: 'OK' })
    })
    .catch(() => {
      res.json({ status: 'error', message: 'incorrect status' })
    })
})

server.get('/api/v1/categories', (req, res) => {
  readdir(`${__dirname}/../tasks`).then((files) => {
    const filesArr = Object.values(files).map((file) => file.match(/\S{1,}(?=\.json)/))
    res.json(filesArr)
  })
})

server.post('/api/v1/:category', (req, res) => {
  const { category } = req.params

  readFile(`${__dirname}/../tasks/${category}.json`, { encoding: 'utf8' })
    .then(() => {
      res.json({ status: 'category exists' })
    })
    .catch(() => {
      writeFile(`${__dirname}/../tasks/${category}.json`, JSON.stringify([]), { encoding: 'utf8' })
      res.json({ status: 'category created' })
    })
})

server.delete('/api/v1/:category', (req, res) => {
  const { category } = req.params

  readFile(`${__dirname}/../tasks/${category}.json`, { encoding: 'utf8' })
    .then(() => {
      unlink(`${__dirname}/../tasks/${category}.json`)
      res.json({ status: 'category deleted' })
    })
    .catch(() => {
      res.json({ status: 'category not found' })
    })
})

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

const [htmlStart, htmlEnd] = Html({
  body: 'separator',
  title: 'Skillcrucial - Become an IT HERO'
}).split('separator')

server.get('/', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

server.get('/*', (req, res) => {
  const initialState = {
    location: req.url
  }

  return res.send(
    Html({
      body: '',
      initialState
    })
  )
})

const app = server.listen(port)

if (config.isSocketsEnabled) {
  const echo = sockjs.createServer()
  echo.on('connection', (conn) => {
    connections.push(conn)
    conn.on('data', async () => {})

    conn.on('close', () => {
      connections = connections.filter((c) => c.readyState !== 3)
    })
  })
  echo.installHandlers(app, { prefix: '/ws' })
}
console.log(`Serving at http://localhost:${port}`)
