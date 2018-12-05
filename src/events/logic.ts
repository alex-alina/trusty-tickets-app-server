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



export const calculateRisk = (ticket: Ticket) => {

  let risk = 5

  if (numOfUserTickets(ticket) === 1) {
    risk += 10
  }

  if(compareTicketPriceWithAvg(ticket) > 25) {
    risk += 10
  }

  if(compareTicketPriceWithAvg(ticket) < -15) {
    risk -= 5
  }
  return risk 
}