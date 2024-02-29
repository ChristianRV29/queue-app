const socket = io()

const currentTicketLabel = document.querySelector('#lblTicket1')
const currentDesktopLabel = document.querySelector('#lblEscritorio1')

const lblTicket2 = document.querySelector('#lblTicket2')
const lblTicket3 = document.querySelector('#lblTicket3')
const lblTicket4 = document.querySelector('#lblTicket4')

const lblDesktop2 = document.querySelector('#lblEscritorio2')
const lblDesktop3 = document.querySelector('#lblEscritorio3')
const lblDesktop4 = document.querySelector('#lblEscritorio4')

socket.on('tickets-data', (payload) => {
  const { currentTicket, lastTicketsAttended } = payload

  const [ticket2, ticket3, ticket4] = lastTicketsAttended

  currentTicketLabel.innerHTML = `Ticket: ${currentTicket.number}`
  currentDesktopLabel.innerHTML = `Escritorio: ${currentTicket.desktop}`

  lblTicket2.innerHTML = `Ticket: ${ticket2.number}`
  lblDesktop2.innerHTML = `Escritorio: ${ticket2.desktop}`

  lblTicket3.innerHTML = `Ticket: ${ticket3.number}`
  lblDesktop3.innerHTML = `Escritorio: ${ticket3.desktop}`

  lblTicket4.innerHTML = `Ticket: ${ticket4.number}`
  lblDesktop4.innerHTML = `Escritorio: ${ticket4.desktop}`
})
