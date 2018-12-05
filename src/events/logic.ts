import { Ticket } from './entities';

export const numOfUserTickets = (ticket: Ticket) => {
  return ticket.user.tickets.length
}

export const compareTicketPriceWithAvg = (ticket: Ticket) => {
  const sumTickets = ticket.socialEvent.tickets.reduce((sum, ticket) => {
    return sum + ticket.price
  }, 0)
  const avgPrice = sumTickets / ticket.socialEvent.tickets.length
  const ticketPrice = ticket.price
  const grossDifference = avgPrice - ticketPrice
  const OnePercentFromAvg = avgPrice / 100
  const compareTicketWthAvg = grossDifference / OnePercentFromAvg
  return compareTicketWthAvg
}

export const hourOfTickedCreation = (ticket: Ticket) => {
  const time = ticket.createdAt
  const splitTime = time.toString().split(':')
  const hour = splitTime[0]
  return parseInt(hour)
}

export const numberOfComments = (ticket: Ticket) => {
  return ticket.myComments.length
}

export const calculateRisk = (ticket: Ticket) => {

  let risk = 5

  if (numOfUserTickets(ticket) === 1) {
    risk += 10
  }

  if (compareTicketPriceWithAvg(ticket) > 0) {
    risk += compareTicketPriceWithAvg(ticket)
  }

  if (compareTicketPriceWithAvg(ticket) < 0 && compareTicketPriceWithAvg(ticket) >= -10) {
    risk += compareTicketPriceWithAvg(ticket)
  }

  if (compareTicketPriceWithAvg(ticket) < -10) {
    risk -= 10
  }

  if (hourOfTickedCreation(ticket) >= 9 && hourOfTickedCreation(ticket) < 17) {
    risk -= 10
  } else {
    risk += 10
  }

  if (numberOfComments(ticket) > 3) {
    risk += 5
  }

  if (risk < 5) {
    risk = 5
  }

  if (risk > 95) {
    risk = 95
  }

  return risk
}