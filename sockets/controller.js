const TicketsHandler = require('../models/tickets')

const ticketsHandler = new TicketsHandler()

const socketHandler = (socket) => {
  socket.emit('tickets-data', ticketsHandler.data)

  socket.on('ticket-created', (_, callback) => {
    const newTicket = ticketsHandler.createTicket()

    callback(newTicket)

    socket.broadcast.emit('last-ticket', newTicket)
  })

  socket.on('attend-ticket', ({ desktop }, callback) => {
    const ticketAttended = ticketsHandler.attendTicket(desktop)

    const payload = {
      remaining: ticketsHandler.tickets.length,
      success: false,
      ticket: null
    }

    if (ticketAttended) {
      payload.success = true
      payload.ticket = ticketAttended
    }

    callback(payload)

    socket.broadcast.emit('tickets-data', ticketsHandler.data)
  })
}

module.exports = {
  socketHandler
}
