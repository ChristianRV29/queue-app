const fs = require('fs')
const path = require('path')

class Ticket {
  constructor(number, desktop) {
    this.number = number
    this.desktop = desktop
  }
}

class TicketsHandler {
  constructor() {
    this.lastFour = []
    this.lastTicket = null
    this.tickets = []
    this.today = new Date().getDate()

    this.init()
  }

  get toJSON() {
    return {
      lastFour: this.lastFour,
      lastTicket: this.lastTicket,
      tickets: this.tickets,
      today: this.today
    }
  }

  init() {
    const data = require('../db/tickets.json')

    if (data && data.today === this.today) {
      this.lastFour = data.lastFour
      this.lastTicket = data.lastTicket
      this.tickets = data.tickets
    } else {
      this.saveData()
    }
  }

  saveData() {
    const dbPath = path.join(__dirname, '../db/tickets.json')

    fs.writeFileSync(dbPath, JSON.stringify(this.toJSON))
  }

  nextTicket() {
    this.lastTicket += 1

    const ticket = new Ticket(this.lastTicket, null)
    this.tickets.push(ticket)

    this.saveData()

    return ticket
  }

  reset() {
    this.lastFour = []
    this.lastTicket = 0
    this.tickets = []

    this.saveData()
  }

  attendTicket(desktop) {
    if (this.tickets.length === 0) {
      return null
    }

    const ticket = this.tickets.shift()
    ticket.desktop = desktop

    this.lastFour.unshift(ticket)

    if (this.lastFour.length > 4) {
      this.lastFour.splice(-1, 1)
    }

    this.saveData()

    return ticket
  }
}

module.exports = TicketsHandler
