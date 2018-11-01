const path = require('path')
const express = require('express')
const app = express()
const { createServer } = require('http')
const { json, urlencoded } = require('body-parser')

require('dotenv').config()

app.use(json()) // support json encoded bodies
app.use(urlencoded({ extended: true })) // support encoded bodies
app.use(express.static(__dirname + '/public'))
app.set('port', process.env.PORT || 8080)

// Add headers
app.use((_, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
    'Access-Control-Allow-Credentials': true,
  })
  next()
})

app.get('/liveagent', (_, response) => {
  response
    .status(200)
    .sendFile(path.resolve(__dirname, 'public/liveAgent.html'))
})

const server = createServer(app).listen(app.get('port'), () => {
  console.log(`> Server started on ${server.address().port}`)
})
