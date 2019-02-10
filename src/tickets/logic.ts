import Ticket from './entity';

const numOfUserTickets = (ticket: Ticket) => {
  return ticket.user.tickets.length
}

const compareTicketPriceWithAvg = (ticket: Ticket) => {
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

const hourOfTickedCreation = (ticket: Ticket) => {
  const time = ticket.createdAt
  const splitTime = time.toString().split(':')
  const hour = splitTime[0]
  return parseInt(hour)
}

const numberOfComments = (ticket: Ticket) => {
  return ticket.comments.length
}

export const calculateRisk = (ticket: Ticket) => {

  let risk = 5

  if (numOfUserTickets(ticket) === 1) {
    risk += 10
  }

  const ticketPriceVsAvg = compareTicketPriceWithAvg(ticket)
  // ticket is cheaper than average => add to risk
  if (ticketPriceVsAvg > 0) {
    risk += ticketPriceVsAvg
  }
  //ticket is more expensive than average => subtract from risk (add because ticketPriveVsAvg is negative)
  if (ticketPriceVsAvg < 0 && ticketPriceVsAvg >= -10) {
    risk += ticketPriceVsAvg
  }
  //ticket is more expensive than average, but you can't subtract more than 10% from the risc 
  if (ticketPriceVsAvg < -10) {
    risk -= 10
  }

  const ticketCreatedAt = hourOfTickedCreation(ticket)
  if (ticketCreatedAt >= 9 && ticketCreatedAt < 17) {
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