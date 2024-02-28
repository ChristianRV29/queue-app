const btnCreate = document.querySelector('button')
const lblNewTicket = document.querySelector('#lblNuevoTicket')

const socket = io()

socket.on('connect', () => {
  btnCreate.disabled = false
})

socket.on('disconnect', () => {
  btnCreate.disabled = true
})

socket.on('last-ticket', (lastTicket) => {
  if (lastTicket) {
    lblNewTicket.innerHTML = `Ticket: ${lastTicket}`
  }
})

btnCreate.addEventListener('click', () => {
  socket.emit('next-ticket', null, (ticket) => {
    lblNewTicket.innerHTML = `Ticket: ${ticket.number}`
  })
})
