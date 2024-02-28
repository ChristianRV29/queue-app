const socket = io()

const currentTicketLabel = document.querySelector('#lblTicket1')

const lblTicket2 = document.querySelector('#lblTicket2')
const lblTicket3 = document.querySelector('#lblTicket3')
const lblTicket4 = document.querySelector('#lblTicket4')

const lblDesktop2 = document.querySelector('#lblEscritorio2')
const lblDesktop3 = document.querySelector('#lblEscritorio3')
const lblDesktop4 = document.querySelector('#lblEscritorio4')

// socket.on('last-ticket', ({ lastFour, lastTicket }) => {
//   currentTicketLabel.innerText = `Ticket ${lastTicket}`

//   const [second, third, fourth] = lastFour

//   lblTicket2.innerText = `Ticket ${second.number}`
//   lblDesktop2.innerText = second.desktop

//   lblTicket3.innerText = `Ticket ${third.number}`
//   lblDesktop3.innerText = third.desktop

//   lblTicket4.innerText = `Ticket ${fourth.number}`
//   lblDesktop4.innerText = fourth.desktop
// })
