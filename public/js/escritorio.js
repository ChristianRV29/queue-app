const params = new URLSearchParams(window.location.search)

if (!params.has('escritorio')) {
  window.location = 'index.html'

  throw new Error('The desktop is mandatory')
}

const desktop = params.get('escritorio')

const attendButton = document.querySelector('button')
const desktopTitle = document.querySelector('#desktop-title')
const emptyTickets = document.querySelector('#empty-tickets')
const remainingTicketsLabel = document.querySelector('#lblPendientes')
const ticketLabel = document.querySelector('#current-ticket')

const socket = io()

socket.on('connect', () => {
  desktopTitle.innerHTML = `Desktop ${desktop}`
  attendButton.disabled = false
})

socket.on('disconnect', () => {
  attendButton.disabled = true
})

socket.on('tickets-data', (data) => {
  const { tickets } = data

  if (tickets.length === 0) {
    attendButton.disabled = true
    emptyTickets.classList.remove('hidden')
    remainingTicketsLabel.classList.add('hidden')
  } else {
    remainingTicketsLabel.innerHTML = tickets.length
    attendButton.disabled = false
    emptyTickets.classList.add('hidden')
    remainingTicketsLabel.classList.remove('hidden')
  }
})

attendButton.addEventListener('click', () => {
  socket.emit('attend-ticket', { desktop }, (payload) => {
    const { success, remaining, ticket } = payload

    if (success) {
      ticketLabel.innerHTML = `Ticket ${ticket.number}`

      if (remaining === 0) {
        attendButton.disabled = true
        emptyTickets.classList.remove('hidden')
        remainingTicketsLabel.classList.add('hidden')
      } else {
        remainingTicketsLabel.innerHTML = remaining
        remainingTicketsLabel.classList.remove('hidden')
      }
    }
  })
})
