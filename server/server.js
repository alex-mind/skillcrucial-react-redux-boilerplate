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

const Root = () => ''
const { writeFile, readFile, stat, unlink } = require("fs").promises

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
  writeFile(`${__dirname}/${file}`, text, { encoding: "utf8" })
}

const readUsersFromFile = (file) => {
  return readFile(`${__dirname}/${file}`, { encoding: "utf8" })
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
  res.set('x-skillcrucial-user', 'f74f5c1b-b85f-4391-a411-40c557349987');  
  res.set('Access-Control-Expose-Headers', 'X-SKILLCRUCIAL-USER')
  next()
})

server.get('/api/v1/users/', (req, res) => { 
  const file = 'users.json' 
  stat(`${__dirname}/${file}`)
  .then(() => {
    readUsersFromFile(file)
    .then(users => res.send(JSON.parse(users)))
  })
  .catch(async () => {  
    const { data: users } = await axios('https://jsonplaceholder.typicode.com/users')
    writeUsersToFile(JSON.stringify(users), file)
    readUsersFromFile(file)
    .then(text => res.send(JSON.parse(text)))
  })
})

server.post('/api/v1/users/', (req, res) => {
  readUsersFromFile('users.json')
  .then(users => {
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
  .then(users => {
    const usersParsed = JSON.parse(users)
    const { userId } = req.params
    if (+userId > usersParsed.length && +userId < usersParsed.length) throw new Error('wrong id')
    let counter
    for (counter = 0; counter < usersParsed.length; counter += 1) {
      if (usersParsed[counter].id === +userId) break
    }
    usersParsed[counter] = { ...usersParsed[counter], ...req.body }
    writeUsersToFile(JSON.stringify(usersParsed), 'users.json')
    res.json({ status: 'success', id: +userId })
  })
  .catch(() => res.json({ status: 'failure' }))
})

server.delete('/api/v1/users/:userId', (req, res) => {
  readUsersFromFile('users.json')
  .then(users => {
    let usersParsed = JSON.parse(users)
    const { userId } = req.params
    if (+userId > usersParsed.length && +userId < usersParsed.length) throw new Error('wrong id')
    let counter
    for (counter = 0; counter < usersParsed.length; counter += 1) {
      if (usersParsed[counter].id === +userId) break
    }
    usersParsed =  [...usersParsed.slice(0, counter), ...usersParsed.slice(counter + 1)]
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
  res.json(users.slice(0, +number));
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
