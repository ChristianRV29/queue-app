const fs = require('fs')
const path = require('path')

const dbPath = path.join(__dirname, '../db/tickets.json')

class Ticket {
  constructor(number, desktop) {
    this.number = number
    this.desktop = desktop
  }
}

class TicketsHandler {
  constructor() {
    this.lastTicketsAttended = []
    this.currentTicket = null
    this.tickets = []
    this.today = new Date().getDate()

    this.init()
  }

  init() {
    if (!fs.existsSync(dbPath)) {
      this.reset()
      return
    }

    const data = JSON.parse(fs.readFileSync(dbPath, { encoding: 'utf-8' }))

    if (data.today !== this.today) {
      this.reset()
    } else {
      this.lastTicketsAttended = data.lastTicketsAttended
      this.tickets = data.tickets
      this.today = data.today
      this.currentTicket = data.currentTicket

      this.saveData()
    }
  }

  saveData() {
    fs.writeFileSync(dbPath, JSON.stringify(this.data))
  }

  reset() {
    this.lastTicketsAttended = []
    this.currentTicket = null
    this.tickets = []
    this.today = new Date().getDate()

    this.saveData()
  }

  createTicket() {
    let number = 1

    if (this.lastTicket) {
      number = this.lastTicket.number + 1
    }

    const ticket = new Ticket(number, null)

    this.tickets.push(ticket)

    this.saveData()

    return ticket
  }

  attendTicket(desktop) {
    if (this.tickets.length === 0) {
      return null
    }

    this.currentTicket = this.tickets.shift()
    this.currentTicket.desktop = desktop

    if (this.lastTicketsAttended.length === 4) {
      this.lastTicketsAttended.shift()
    }

    this.lastTicketsAttended.push(this.currentTicket)

    this.saveData()

    return this.currentTicket
  }

  get data() {
    return {
      currentTicket: this.currentTicket,
      lastTicketsAttended: this.lastTicketsAttended,
      tickets: this.tickets,
      today: this.today
    }
  }

  get lastTicket() {
    if (this.tickets.length === 0) {
      return this.currentTicket
    }

    return this.tickets[this.tickets.length - 1]
  }
}

module.exports = TicketsHandler
