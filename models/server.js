const { Server: SocketServer } = require('socket.io')
const cors = require('cors')
const express = require('express')
const http = require('http')

const { socketHandler } = require('../sockets/controller')

class Server {
  constructor() {
    this.app = express()
    this.paths = {}
    this.port = process.env.PORT || 8080
    this.server = http.createServer(this.app)
    this.io = new SocketServer(this.server)

    this.middlewares()
    this.sockets()
    this.routes()
  }

  middlewares() {
    this.app.use(cors())
    this.app.use(express.static('public'))
  }

  sockets() {
    this.io.on('connection', socketHandler)
  }

  routes() {}

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`)
    })
  }
}

module.exports = Server
