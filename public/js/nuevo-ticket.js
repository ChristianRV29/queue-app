const socket = io()

const btnCreate = document.querySelector('button')
const lblNewTicket = document.querySelector('#lblNuevoTicket')

socket.on('connect', () => {
  btnCreate.disabled = false
})

socket.on('last-ticket', (payload) => {
  lblNewTicket.innerHTML = `Ticket: ${payload.number}`
})

socket.on('disconnect', () => {
  btnCreate.disabled = true
})

btnCreate.addEventListener('click', () => {
  socket.emit('ticket-created', null, (ticket) => {
    lblNewTicket.innerHTML = `Ticket: ${ticket.number}`
  })
})
