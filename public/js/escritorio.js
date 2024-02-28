const attendButton = document.querySelector('button')
const desktopTitle = document.querySelector('#desktop-title')
const emptyTickets = document.querySelector('#empty-tickets')
const remainingTicketsLabel = document.querySelector('#lblPendientes')
const ticketLabel = document.querySelector('#current-ticket')

const params = new URLSearchParams(window.location.search)

if (!params.has('escritorio')) {
  window.location = 'index.html'

  throw new Error('The desktop is mandatory')
}

const desktop = params.get('escritorio')

desktopTitle.innerHTML = `Desktop ${desktop}`

const socket = io()

socket.on('connect', () => {
  attendButton.disabled = false
})

socket.on('disconnect', () => {
  attendButton.disabled = true
})

attendButton.addEventListener('click', () => {
  socket.emit('attend-ticket', { desktop }, (payload) => {
    const { success, ticket, remaining } = payload

    if (success) {
      ticketLabel.innerHTML = `Ticket ${ticket.number}`
      remainingTicketsLabel.innerHTML = remaining
    }

    if (remaining === 0) {
      attendButton.disabled = true
      remainingTicketsLabel.classList.add('hidden')
      emptyTickets.classList.remove('hidden')
    } else {
      attendButton.disabled = false
      emptyTickets.classList.add('hidden')
      remainingTicketsLabel.classList.remove('hidden')
    }
  })
})
