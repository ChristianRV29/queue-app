const TicketsHandler = require('../models/tickets')

const ticketsHandler = new TicketsHandler()

const socketHandler = (socket) => {
  socket.emit('last-ticket', ticketsHandler.lastTicket)

  socket.on('next-ticket', (_, callback) => {
    const newTicket = ticketsHandler.nextTicket()

    callback(newTicket)
  })

  socket.on('attend-ticket', ({ desktop }, callback) => {
    ticketsHandler.reset()

    const ticket = ticketsHandler.attendTicket(desktop)

    let answer = {
      ticket: null,
      success: false,
      remaining: ticketsHandler.tickets.length
    }

    if (ticket) {
      answer = { ...answer, ticket, success: true }
    }

    callback(answer)

    socket.broadcast.emit('last-ticket', ticketsHandler.lastTicket)
  })
}

module.exports = {
  socketHandler
}
